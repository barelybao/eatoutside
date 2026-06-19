import { createHash } from 'node:crypto'
import { supabase } from '@/supabase'
import type { H3Event } from 'h3'

// Generate fingerprint for user identification
function generateFingerprint(event: H3Event): string {
  const headers = event.node.req.headers
  const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || event.node.req.socket.remoteAddress || 'unknown'
  const userAgent = headers['user-agent'] || 'unknown'

  // Create hash from IP + User-Agent for basic duplicate prevention
  const hash = createHash('sha256')
    .update(`${ip}-${userAgent}`)
    .digest('hex')

  return hash
}

// Logger utility for consistent error handling
const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error)
}

// Upsert user record
async function upsertUser(fingerprint: string): Promise<void> {
  const { error: userError } = await supabase
    .from('users')
    .upsert({
      id: fingerprint,
      last_seen: new Date().toISOString()
    }, {
      onConflict: 'id',
      ignoreDuplicates: false
    })

  if (userError) {
    logError('USER_UPSERT', userError)
    throw createError({ statusCode: 500, message: 'Failed to upsert user' })
  }
}

// Check if user already recorded this meal today
async function checkExistingRecord(slug: string, fingerprint: string, startOfDay: string, endOfDay: string) {
  const { data: existing, error: checkError } = await supabase
    .from('meal_records')
    .select('id')
    .eq('meal_id', slug)
    .eq('user_id', fingerprint)
    .gte('created_at', startOfDay)
    .lt('created_at', endOfDay)
    .limit(1)

  if (checkError) {
    logError('CHECK_EXISTING', checkError)
    throw createError({ statusCode: 500, message: 'Database error' })
  }

  return existing && existing.length > 0
}

// Get current record count for a meal today
async function getRecordCount(slug: string, startOfDay: string, endOfDay: string): Promise<number> {
  const { count, error: countError } = await supabase
    .from('meal_records')
    .select('*', { count: 'exact', head: true })
    .eq('meal_id', slug)
    .gte('created_at', startOfDay)
    .lt('created_at', endOfDay)

  if (countError) {
    logError('GET_COUNT', countError)
    throw createError({ statusCode: 500, message: 'Database error' })
  }

  return count || 0
}

// Insert new meal record
async function insertMealRecord(slug: string, fingerprint: string): Promise<void> {
  const { error: insertError } = await supabase
    .from('meal_records')
    .insert({
      meal_id: slug,
      user_id: fingerprint
    })

  if (insertError) {
    logError('INSERT_RECORD', insertError)
    throw createError({ statusCode: 500, message: 'Failed to save record' })
  }
}

// Increment user's total record count
async function incrementUserRecordCount(fingerprint: string): Promise<void> {
  const { error: incrementError } = await supabase.rpc('increment_user_record_count', {
    user_id: fingerprint
  })

  if (incrementError) {
    logError('INCREMENT_COUNT', incrementError)
    // Non-fatal error, log but continue
  }
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  // Validate slug format to prevent injection attacks
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, message: 'Invalid slug format' })
  }

  // Generate fingerprint for user identification using utility function
  const fingerprint = generateFingerprint(event)

  // Get Singapore date range (start and end of day in SGT timezone)
  const singaporeDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' })
  const startOfDay = new Date(`${singaporeDate}T00:00:00+08:00`).toISOString()
  const endOfDay = new Date(`${singaporeDate}T23:59:59+08:00`).toISOString()

  try {
    // Step 1: Upsert user (create if not exists, update last_seen if exists)
    await upsertUser(fingerprint)

    // Step 2: Check if already recorded today
    const alreadyRecorded = await checkExistingRecord(slug, fingerprint, startOfDay, endOfDay)

    if (alreadyRecorded) {
      // Already recorded - return current count
      const count = await getRecordCount(slug, startOfDay, endOfDay)
      return {
        count,
        date: singaporeDate,
        alreadyRecorded: true
      }
    }

    // Step 3: Insert new meal record
    await insertMealRecord(slug, fingerprint)

    // Step 4: Increment user record count
    await incrementUserRecordCount(fingerprint)

    // Step 5: Get updated count
    const count = await getRecordCount(slug, startOfDay, endOfDay)

    return {
      count: count || 1,
      date: singaporeDate,
      alreadyRecorded: false
    }
  } catch (err) {
    logError('RECORD_MEAL', err)
    if (err instanceof Error && 'statusCode' in err) {
      throw err
    }
    throw createError({ statusCode: 500, message: 'Failed to record meal' })
  }
})

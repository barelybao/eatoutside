import { createHash } from 'node:crypto'
import { supabase } from '@/supabase'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  // Generate fingerprint for user identification
  const headers = event.node.req.headers
  const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || event.node.req.socket.remoteAddress || 'unknown'
  const userAgent = headers['user-agent'] || 'unknown'

  const fingerprint = createHash('sha256')
    .update(`${ip}-${userAgent}`)
    .digest('hex')

  // Get Singapore date range (start and end of day in SGT timezone)
  const singaporeDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' })
  const startOfDay = new Date(`${singaporeDate}T00:00:00+08:00`).toISOString()
  const endOfDay = new Date(`${singaporeDate}T23:59:59+08:00`).toISOString()

  try {
    // Step 1: Upsert user (create if not exists, update last_seen if exists)
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
      console.error('Supabase user upsert error:', userError)
      throw createError({ statusCode: 500, message: 'Failed to upsert user' })
    }

    // Step 2: Check if already recorded today
    const { data: existing, error: checkError } = await supabase
      .from('meal_records')
      .select('id')
      .eq('meal_id', slug)  // Use slug directly
      .eq('user_id', fingerprint)  // Use user_id instead of user_fingerprint
      .gte('created_at', startOfDay)
      .lt('created_at', endOfDay)
      .limit(1)

    if (checkError) {
      console.error('Supabase check error:', checkError)
      throw createError({ statusCode: 500, message: 'Database error' })
    }

    if (existing && existing.length > 0) {
      // Already recorded - return current count
      const { count, error: countError } = await supabase
        .from('meal_records')
        .select('*', { count: 'exact', head: true })
        .eq('meal_id', slug)
        .gte('created_at', startOfDay)
        .lt('created_at', endOfDay)

      if (countError) {
        console.error('Supabase count error:', countError)
        throw createError({ statusCode: 500, message: 'Database error' })
      }

      return {
        count: count || 0,
        date: singaporeDate,
        alreadyRecorded: true
      }
    }

    // Step 3: Insert new meal record
    const { error: insertError } = await supabase
      .from('meal_records')
      .insert({
        meal_id: slug,  // Use slug directly
        user_id: fingerprint  // Use user_id instead of user_fingerprint
      })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      throw createError({ statusCode: 500, message: 'Failed to save record' })
    }

    // Step 4: Increment user record count
    const { error: incrementError } = await supabase.rpc('increment_user_record_count', {
      user_id: fingerprint
    })

    if (incrementError) {
      console.error('Supabase increment error:', incrementError)
      // Non-fatal error, log but continue
    }

    // Step 5: Get updated count
    const { count, error: finalCountError } = await supabase
      .from('meal_records')
      .select('*', { count: 'exact', head: true })
      .eq('meal_id', slug)
      .gte('created_at', startOfDay)
      .lt('created_at', endOfDay)

    if (finalCountError) {
      console.error('Supabase final count error:', finalCountError)
      throw createError({ statusCode: 500, message: 'Database error' })
    }

    return {
      count: count || 1,
      date: singaporeDate,
      alreadyRecorded: false
    }
  } catch (err) {
    console.error('Error recording meal:', err)
    if (err instanceof Error && 'statusCode' in err) {
      throw err
    }
    throw createError({ statusCode: 500, message: 'Failed to record meal' })
  }
})

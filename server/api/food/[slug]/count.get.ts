import { supabase } from '@/supabase'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  // Get Singapore date range (start and end of day in SGT timezone)
  const singaporeDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' })
  const startOfDay = new Date(`${singaporeDate}T00:00:00+08:00`).toISOString()
  const endOfDay = new Date(`${singaporeDate}T23:59:59+08:00`).toISOString()

  try {
    // Query Supabase for count using timestamp range
    const { count, error } = await supabase
      .from('meal_records')
      .select('*', { count: 'exact', head: true })
      .eq('meal_id', slug)  // Use slug directly
      .gte('created_at', startOfDay)
      .lt('created_at', endOfDay)

    if (error) {
      console.error('Supabase error:', error)
      throw createError({ statusCode: 500, message: 'Database error' })
    }

    return {
      count: count || 0,
      date: singaporeDate
    }
  } catch (err) {
    console.error('Error fetching count:', err)
    throw createError({ statusCode: 500, message: 'Failed to fetch count' })
  }
})

import { supabase } from '@/supabase'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  // Validate slug format to prevent injection attacks
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, message: 'Invalid slug format' })
  }

  try {
    // Query Supabase for count
    const { count, error } = await supabase
      .from('meal_records')
      .select('*', { count: 'exact', head: true })
      .eq('meal_id', slug)

    if (error) {
      console.error('Supabase error:', error)
      throw createError({ statusCode: 500, message: 'Database error' })
    }

    return {
      count: count || 0
    }
  } catch (err) {
    console.error('Error fetching count:', err)
    throw createError({ statusCode: 500, message: 'Failed to fetch count' })
  }
})

// Real API utility - connects to Supabase backend

export interface CounterResponse {
  count: number;
  date: string;
  alreadyRecorded?: boolean;
}

// Get current count for a food item
export async function getFoodCount(foodSlug: string): Promise<CounterResponse> {
  try {
    const response = await $fetch<CounterResponse>(`/api/food/${foodSlug}/count`)
    return response
  } catch (error) {
    console.error('Failed to fetch food count:', error)
    return {
      count: 0,
      date: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' })
    }
  }
}

// Record a meal
export async function recordMeal(foodSlug: string): Promise<CounterResponse> {
  try {
    const response = await $fetch<CounterResponse>(`/api/food/${foodSlug}/record`, {
      method: 'POST'
    })
    return response
  } catch (error) {
    console.error('Failed to record meal:', error)
    throw error
  }
}

// Legacy function for backwards compatibility
export async function incrementFoodCount(foodSlug: string): Promise<CounterResponse> {
  // This function is deprecated - use recordMeal instead
  console.warn('incrementFoodCount is deprecated. Use recordMeal instead.')
  return recordMeal(foodSlug)
}

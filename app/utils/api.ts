// Real API utility - connects to Supabase backend

export interface CounterResponse {
  count: number;
  date: string;
  alreadyRecorded?: boolean;
}

// Get current count for a food item
export async function getFoodCount(foodSlug: string): Promise<CounterResponse> {
  const response = await $fetch<CounterResponse>(`/api/food/${foodSlug}/count`)
  return response
}

// Record a meal
export async function recordMeal(foodSlug: string): Promise<CounterResponse> {
  const response = await $fetch<CounterResponse>(`/api/food/${foodSlug}/record`, {
    method: 'POST'
  })
  return response
}

export interface MealRecord {
  id: string
  meal_id: string
  user_id: string
  created_at: string
}

export interface FoodCountResponse {
  count: number
  date: string
  alreadyRecorded?: boolean
}

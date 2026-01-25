// Fake API utility - will be replaced with real API calls later
interface CounterResponse {
  count: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get current count for a food item
export async function getFoodCount(_foodSlug: string): Promise<CounterResponse> {
  await delay(300); // Simulate network delay

  // Return 0 by default (will come from database later)
  const count = 0;
  return { count };
}

// Increment count for a food item
export async function incrementFoodCount(_foodSlug: string): Promise<CounterResponse> {
  await delay(500); // Simulate network delay

  // Return incremented count (will update database later)
  const newCount = 1; // Mock response - user is the first
  return { count: newCount };
}

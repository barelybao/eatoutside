import { createClient } from '@supabase/supabase-js'

const supabaseUrl = useRuntimeConfig().public.supabaseUrl
const supabaseKey = useRuntimeConfig().public.supabaseAnonKey

export const supabase = createClient(supabaseUrl as string, supabaseKey as string)

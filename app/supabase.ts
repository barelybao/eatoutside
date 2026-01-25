import { createClient } from '@supabase/supabase-js'

const supabaseUrl = useRuntimeConfig().public.supabaseUrl
const supabaseAnonKey = useRuntimeConfig().public.supabaseAnonKey

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = useRuntimeConfig().supabaseUrl
const supabaseKey = useRuntimeConfig().supabaseAnonKey

export const supabase = createClient(supabaseUrl as string, supabaseKey as string)

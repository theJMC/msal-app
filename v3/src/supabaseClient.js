import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('supabaseURL', 'supabaseKey')

// any values stored in git history have been rolled.


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rdtsxmqldueujlxwnyez.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdHN4bXFsZHVldWpseHdueWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MjMyMjgsImV4cCI6MjA1Njk5OTIyOH0.DenCw4m9Ubsrn3_IqJpRql7k3gZt3p9MqAcoRlwxzgo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const FALLBACK_URL = 'https://jvediwtxbeitdlozoefg.supabase.co'
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2ZWRpd3R4YmVpdGRsb3pvZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDQyOTQsImV4cCI6MjA5NjkyMDI5NH0.UwRKIgZa-USpYtsJAOdghTLAjfn3MbztJROsFaGJ3JE'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

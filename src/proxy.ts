import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const FALLBACK_URL = 'https://jvediwtxbeitdlozoefg.supabase.co'
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2ZWRpd3R4YmVpdGRsb3pvZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDQyOTQsImV4cCI6MjA5NjkyMDI5NH0.UwRKIgZa-USpYtsJAOdghTLAjfn3MbztJROsFaGJ3JE'

export async function proxy(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, {
              ...options,
              sameSite: 'lax',
              path: '/',
            })
          })
        },
      },
    }
  )

  // IMPORTANT: refresh session if it exists
  const { data: { user } } = await supabase.auth.getUser()

  const { nextUrl } = request
  const isProtectedPage = nextUrl.pathname.startsWith('/dashboard') || 
                         nextUrl.pathname.startsWith('/onboarding') || 
                         nextUrl.pathname.startsWith('/choose-role')

  if (isProtectedPage && !user) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Handle dashboard sub-route checks if user is logged in
  if (user && nextUrl.pathname.startsWith('/dashboard')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    const role = profile?.role
    
    if (nextUrl.pathname.startsWith('/dashboard/user') && role !== 'user') {
      return NextResponse.redirect(new URL('/dashboard/founder', request.url))
    }
    
    if (nextUrl.pathname.startsWith('/dashboard/founder') && role !== 'founder') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

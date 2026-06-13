import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  // Update session
  const supabaseResponse = await updateSession(request)
  
  const { nextUrl } = request
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard')
  
  if (isDashboardRoute) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return Response.redirect(new URL('/sign-in', request.url))
    }
    
    // Fetch user role from profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    const role = profile?.role
    
    if (nextUrl.pathname.startsWith('/dashboard/user') && role !== 'user') {
      return Response.redirect(new URL('/dashboard/founder', request.url))
    }
    
    if (nextUrl.pathname.startsWith('/dashboard/founder') && role !== 'founder') {
      return Response.redirect(new URL('/dashboard/user', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

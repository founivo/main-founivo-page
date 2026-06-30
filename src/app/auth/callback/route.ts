import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/choose-role'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const baseUrl = siteUrl || origin
      return NextResponse.redirect(new URL(next, baseUrl))
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/sign-in?error=' + encodeURIComponent('Email and password are required'))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/sign-in?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/choose-role')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  if (!email || !password || !fullName) {
    redirect('/sign-up?error=' + encodeURIComponent('All fields are required'))
  }

  const supabase = await createClient()
  const siteUrl = getSiteUrl()
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: siteUrl ? `${siteUrl}/auth/callback` : undefined,
    },
  })

  if (error) {
    redirect('/sign-up?error=' + encodeURIComponent(error.message))
  }

  if (data.user) {
    revalidatePath('/', 'layout')
    redirect('/choose-role')
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const siteUrl = getSiteUrl()
  const redirectTo = siteUrl ? `${siteUrl}/auth/callback` : undefined

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })

  if (error) {
    redirect('/sign-in?error=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signInWithLinkedIn() {
  const supabase = await createClient()
  const siteUrl = getSiteUrl()
  const redirectTo = siteUrl ? `${siteUrl}/auth/callback` : undefined

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: { redirectTo },
  })

  if (error) {
    redirect('/sign-in?error=' + encodeURIComponent(error.message))
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: 'user' | 'founder'
  onboarding_completed: boolean
  created_at: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      setLoading(true)

      let { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          user = session.user
        }
      }

      if (!user) {
        const sbCookie = document.cookie
          .split('; ')
          .find(c => c.startsWith('sb-') && c.includes('-auth-token'))
        if (sbCookie) {
          try {
            const raw = sbCookie.split('=').slice(1).join('=')
            const b64url = raw.startsWith('base64-') ? raw.slice(7) : raw
            const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
            const parsed = JSON.parse(atob(b64))
            if (parsed.access_token) {
              await supabase.auth.setSession({
                access_token: parsed.access_token,
                refresh_token: parsed.refresh_token || '',
              })
              const { data: { user: recovered } } = await supabase.auth.getUser()
              user = recovered ?? null
            }
          } catch {}
        }
      }

      if (!mounted) return
      setUser(user)

      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (mounted) setProfile(profileData as Profile)
      } else {
        if (mounted) setProfile(null)
      }

      if (mounted) setLoading(false)
    }

    fetchData()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single()
          setProfile(profileData as Profile)
        } else {
          setProfile(null)
        }

        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  return { user, profile, loading }
}

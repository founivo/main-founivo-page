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
  user_onboarding_completed?: boolean
  founder_onboarding_completed?: boolean
  avatar_url?: string | null
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

      console.log('[useUser] getUser() call...')
      let { data: { user } } = await supabase.auth.getUser()
      console.log('[useUser] getUser() result:', user?.email)

      if (!user) {
        console.log('[useUser] getUser() null, trying getSession()...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('[useUser] getSession() result:', session ? 'found' : 'null')
        if (session) {
          user = session.user
        }
      }

      if (!user) {
        console.log('[useUser] Trying manual cookie recovery...')
        const sbCookie = document.cookie
          .split('; ')
          .find(c => c.startsWith('sb-') && c.includes('-auth-token'))
        console.log('[useUser] sbCookie found:', !!sbCookie)
        if (sbCookie) {
          try {
            const raw = sbCookie.split('=').slice(1).join('=')
            const b64url = raw.startsWith('base64-') ? raw.slice(7) : raw
            const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
            const parsed = JSON.parse(atob(b64))
            console.log('[useUser] Cookie decoded, access_token present:', !!parsed.access_token)
            if (parsed.access_token) {
              await supabase.auth.setSession({
                access_token: parsed.access_token,
                refresh_token: parsed.refresh_token || '',
              })
              const { data: { user: recovered } } = await supabase.auth.getUser()
              console.log('[useUser] After setSession getUser():', recovered?.email)
              user = recovered ?? null
            }
          } catch (e) {
            console.log('[useUser] Manual recovery error:', e)
          }
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

        const { data: userPref } = await supabase
          .from('user_preferences')
          .select('id, purpose')
          .eq('id', user.id)
          .maybeSingle()

        const { data: founderProf } = await supabase
          .from('founder_profiles')
          .select('id, bio')
          .eq('id', user.id)
          .maybeSingle()

        let avatarUrl: string | null = null;
        if (founderProf?.bio) {
          const marker = "\n\n---METADATA---\n";
          const idx = founderProf.bio.indexOf(marker);
          if (idx !== -1) {
            try {
              const meta = JSON.parse(founderProf.bio.substring(idx + marker.length));
              if (meta.personal_photo) {
                avatarUrl = meta.personal_photo;
              }
            } catch (e) {
              console.error("Error parsing founder profile metadata:", e);
            }
          }
        }
        if (!avatarUrl && userPref?.purpose) {
          const marker = "\n\n---METADATA---\n";
          const idx = userPref.purpose.indexOf(marker);
          if (idx !== -1) {
            try {
              const meta = JSON.parse(userPref.purpose.substring(idx + marker.length));
              if (meta.avatar) {
                avatarUrl = meta.avatar;
              }
            } catch (e) {
              console.error("Error parsing user preferences metadata:", e);
            }
          }
        }

        const updatedProfile = profileData ? {
          ...profileData,
          user_onboarding_completed: !!userPref,
          founder_onboarding_completed: !!founderProf,
          avatar_url: avatarUrl,
        } : null;

        if (mounted) setProfile(updatedProfile as Profile)
      } else {
        if (mounted) setProfile(null)
      }

      if (mounted) setLoading(false)
    }

    fetchData()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('[useUser] onAuthStateChange event:', event, 'user:', session?.user?.email)
        if (!mounted) return
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single()

          const { data: userPref } = await supabase
            .from('user_preferences')
            .select('id, purpose')
            .eq('id', currentUser.id)
            .maybeSingle()

          const { data: founderProf } = await supabase
            .from('founder_profiles')
            .select('id, bio')
            .eq('id', currentUser.id)
            .maybeSingle()

          let avatarUrl: string | null = null;
          if (founderProf?.bio) {
            const marker = "\n\n---METADATA---\n";
            const idx = founderProf.bio.indexOf(marker);
            if (idx !== -1) {
              try {
                const meta = JSON.parse(founderProf.bio.substring(idx + marker.length));
                if (meta.personal_photo) {
                  avatarUrl = meta.personal_photo;
                }
              } catch (e) {
                console.error("Error parsing founder profile metadata:", e);
              }
            }
          }
          if (!avatarUrl && userPref?.purpose) {
            const marker = "\n\n---METADATA---\n";
            const idx = userPref.purpose.indexOf(marker);
            if (idx !== -1) {
              try {
                const meta = JSON.parse(userPref.purpose.substring(idx + marker.length));
                if (meta.avatar) {
                  avatarUrl = meta.avatar;
                }
              } catch (e) {
                console.error("Error parsing user preferences metadata:", e);
              }
            }
          }

          const updatedProfile = profileData ? {
            ...profileData,
            user_onboarding_completed: !!userPref,
            founder_onboarding_completed: !!founderProf,
            avatar_url: avatarUrl,
          } : null;

          setProfile(updatedProfile as Profile)
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

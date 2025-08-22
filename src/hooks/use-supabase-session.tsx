import {useState, useEffect} from 'react'
import {createClient} from '@/lib/supabase/client'
import {Session} from '@supabase/supabase-js'

export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<
    'loading' | 'authenticated' | 'unauthenticated'
  >('loading')

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session)
      setStatus(session ? 'authenticated' : 'unauthenticated')
    })

    const {data: listener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setStatus(session ? 'authenticated' : 'unauthenticated')
      }
    )

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  return {session, status}
}

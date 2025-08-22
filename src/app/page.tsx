'use client'

import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {useSupabaseSession} from '@/lib/supabase/use-supabase-session'

export default function Home() {
  const {session, status} = useSupabaseSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

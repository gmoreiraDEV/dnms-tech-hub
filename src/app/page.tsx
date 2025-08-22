'use client'

import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {useSupabaseSession} from '@/hooks/use-supabase-session'
import FeedPage from '@/components/feed/home'
import {AppSidebar} from '@/components/app-sidebar'
import {HeaderNavigation} from '@/components/header'

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
    <div className='flex flex-col w-full'>
      <HeaderNavigation />
      <div className='flex w-full h-full'>
        <AppSidebar />
        <FeedPage />
      </div>
    </div>
  )
}

'use client'
import {useSession, signOut} from 'next-auth/react'
import LoginPage from '@/components/pages/login-page'

export default function Home() {
  const {data: session} = useSession()

  return session ? (
    <button onClick={() => signOut()} className='px-3 py-1 border rounded'>
      Sign out
    </button>
  ) : (
    <LoginPage />
  )
}

'use client'

import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useApiToken } from '@/hooks/useApiToken'
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const { token, loading } = useApiToken()
  const [data, setData] = useState<any>(null)

  const callApi = async () => {
    const res = await fetch("/api/protected-example", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    setData(data)
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div className='flex gap-4 justify-center items-center w-full'>
          {session ? (
            <button
              onClick={() => signOut()}
              className='px-3 py-1 border rounded'
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className='px-3 py-1 border rounded'
            >
              Sign in
            </button>
          )}
          <p>{session?.user?.email}</p>
          <button onClick={callApi} disabled={loading}>Call API</button>
          {loading && <p>Loading...</p>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
        <Image
          src='/dnms-tech-hub.png'
          alt='Dunamis Tech Hub logo'
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  )
}

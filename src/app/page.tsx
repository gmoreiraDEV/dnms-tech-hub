'use client'

import Image from 'next/image'
import {useSession, signIn, signOut} from 'next-auth/react'

export default function Home() {
  const {data: session} = useSession()

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
              onClick={() => signIn('auth0')}
              className='px-3 py-1 border rounded'
            >
              Sign in
            </button>
          )}
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

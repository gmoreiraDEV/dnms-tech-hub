import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {Toaster} from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DNMS Tech | Hub Platform',
  description: 'Connecting purpose, faith and technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning={true}
      data-lt-installed={true}
      className='size-full'
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased size-full`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}

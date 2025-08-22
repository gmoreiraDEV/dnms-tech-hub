'use client'

import React from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Search, Bell, Plus} from 'lucide-react'
import {Input} from '@/components/ui/input'
import DNMSTechHubLogo from './dnms-tech-hub-logo'

export function HeaderNavigation() {
  return (
    <header className='sticky top-0 z-40 border-b bg-background/80 backdrop-blur'>
      <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-4'>
        <Link href='/' className='font-bold text-lg tracking-tight'>
          <DNMSTechHubLogo className='size-10' />
        </Link>

        <div className='relative hidden sm:block'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60' />
          <Input placeholder='Pesquisar' className='pl-9 w-[220px]' />
        </div>

        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost' className='relative'>
            <Bell className='h-5 w-5' />
            <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-primary' />
          </Button>

          <Button
            size='sm'
            className='gap-2 hidden text-black bg-primary sm:inline-flex'
          >
            <Plus className='h-4 w-4' />
            Criar projeto
          </Button>
        </div>
      </div>
    </header>
  )
}

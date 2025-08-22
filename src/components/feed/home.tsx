'use client'

import React from 'react'
import Link from 'next/link'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Input} from '@/components/ui/input'
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'
import {Textarea} from '@/components/ui/textarea'
import {Skeleton} from '@/components/ui/skeleton'
import {
  Heart,
  MessageSquareText,
  Share2,
  MoreHorizontal,
  Filter,
  Plus,
  Bookmark,
  Search,
  Clock,
  Globe2,
} from 'lucide-react'

// -----------------------------------------------------------------------------
// FeedPage — drop this in app/(main)/page.tsx or app/page.tsx
// Requires shadcn/ui set up and Tailwind (https://ui.shadcn.com)
// -----------------------------------------------------------------------------
export default function FeedPage() {
  const [isPosting, setIsPosting] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [sort, setSort] = React.useState<'top' | 'new'>('new')
  const [activeTab, setActiveTab] = React.useState<'for-you' | 'following'>(
    'for-you'
  )

  const posts = React.useMemo(
    () =>
      MOCK_POSTS.filter(
        (p) =>
          (activeTab === 'for-you' || p.isFollowingAuthor) &&
          (query.trim().length === 0 ||
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.join(' ').toLowerCase().includes(query.toLowerCase()) ||
            p.author.name.toLowerCase().includes(query.toLowerCase()))
      ).sort((a, b) =>
        sort === 'new'
          ? b.createdAt.getTime() - a.createdAt.getTime()
          : b.likes - a.likes
      ),
    [activeTab, query, sort]
  )

  return (
    <main className='mx-auto max-w-5xl px-4 py-6 lg:py-8'>
      {/* Top bar */}
      <div className='mb-6 flex items-center gap-3'>
        <Link
          href='/'
          className='font-semibold tracking-tight text-xl leading-none'
        >
          DNMS Tech Hub
        </Link>
        <Badge variant='secondary' className='ml-1'>
          Beta
        </Badge>
        <div className='ml-auto flex items-center gap-2'>
          <div className='relative hidden sm:block'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60' />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Pesquisar ideias, soluções, pessoas...'
              className='pl-9 w-[280px]'
            />
          </div>
          <SortMenu value={sort} onChange={setSort} />
          <Button className='gap-2' onClick={() => setIsPosting((v) => !v)}>
            <Plus className='h-4 w-4' />
            Publicar
          </Button>
        </div>
      </div>

      {/* Composer */}
      {isPosting && (
        <Card className='mb-6'>
          <CardHeader className='pb-2'>
            <div className='flex items-center gap-3'>
              <Avatar className='h-9 w-9'>
                <AvatarImage alt='Você' />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className='text-sm text-muted-foreground'>
                Compartilhe uma ideia, dúvida, ou progresso.
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Input placeholder='Título (opcional)' />
            <Textarea
              placeholder='Escreva algo que ajude a comunidade...'
              rows={4}
            />
            <div className='flex flex-wrap items-center gap-2'>
              <Badge variant='secondary'>#nextjs</Badge>
              <Badge variant='secondary'>#automations</Badge>
              <Badge variant='secondary'>#ia</Badge>
              <Button size='sm' className='ml-auto'>
                Publicar agora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) =>
          setActiveTab(v as unknown as 'for-you' | 'following')
        }
        className=''
      >
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='for-you'>Para você</TabsTrigger>
            <TabsTrigger value='following'>Seguindo</TabsTrigger>
          </TabsList>
          <div className='sm:hidden w-full max-w-sm'>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Pesquisar no feed'
            />
          </div>
        </div>

        <TabsContent value='for-you' className='mt-4 space-y-4'>
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          )}
        </TabsContent>
        <TabsContent value='following' className='mt-4 space-y-4'>
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------
function SortMenu({
  value,
  onChange,
}: {
  value: 'top' | 'new'
  onChange: (v: 'top' | 'new') => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' className='gap-2'>
          <Filter className='h-4 w-4' /> Ordenar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onChange('new')}
          className={value === 'new' ? 'font-semibold' : ''}
        >
          <Clock className='mr-2 h-4 w-4' /> Mais recentes
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange('top')}
          className={value === 'top' ? 'font-semibold' : ''}
        >
          <Heart className='mr-2 h-4 w-4' /> Mais curtidos
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PostCard({post}: {post: Post}) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='pb-3'>
        <div className='flex items-start gap-3'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{initials(post.author.name)}</AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2'>
              <Link
                href={`/@${post.author.handle}`}
                className='font-medium hover:underline truncate'
              >
                {post.author.name}
              </Link>
              <span className='text-muted-foreground text-xs truncate'>
                @{post.author.handle} • {timeAgo(post.createdAt)}
              </span>
              {post.visibility === 'public' && (
                <Globe2 className='h-3.5 w-3.5 opacity-60' />
              )}
            </div>
            <h3 className='text-base font-semibold leading-snug line-clamp-2'>
              {post.title}
            </h3>
            <div className='mt-1 flex flex-wrap gap-1.5'>
              {post.tags.map((t) => (
                <Badge key={t} variant='secondary'>
                  #{t}
                </Badge>
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='ghost'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <Bookmark className='mr-2 h-4 w-4' />
                Salvar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive'>
                Denunciar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {post.cover && (
        <div
          className='aspect-video w-full bg-muted/40'
          style={{
            backgroundImage: `url(${post.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <CardContent className='pt-3'>
        <p className='text-sm text-muted-foreground line-clamp-3'>
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <Button variant='ghost' size='sm' className='gap-2'>
          <Heart className='h-4 w-4' />
          {formatCount(post.likes)}
        </Button>
        <Button variant='ghost' size='sm' className='gap-2'>
          <MessageSquareText className='h-4 w-4' />
          {formatCount(post.comments)}
        </Button>
        <Button variant='ghost' size='sm' className='gap-2'>
          <Share2 className='h-4 w-4' />
          Compartilhar
        </Button>
        <div className='ml-auto text-xs text-muted-foreground'>
          {post.readTime} min de leitura
        </div>
      </CardFooter>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card className='border-dashed'>
      <CardContent className='py-10 text-center'>
        <div className='mx-auto mb-2 h-10 w-10'>
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>
        <h3 className='text-base font-semibold'>Nenhum post por aqui… ainda</h3>
        <p className='text-sm text-muted-foreground'>
          Comece publicando algo ou ajuste seus filtros.
        </p>
        <div className='mt-4 flex items-center justify-center gap-2'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Novo post
          </Button>
          <Button variant='secondary'>
            <Filter className='mr-2 h-4 w-4' />
            Ajustar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// -----------------------------------------------------------------------------
// Mock data (swap with real API later)
// -----------------------------------------------------------------------------
export type Post = {
  id: string
  title: string
  excerpt: string
  cover?: string
  tags: string[]
  likes: number
  comments: number
  readTime: number
  createdAt: Date
  visibility: 'public' | 'members'
  isFollowingAuthor: boolean
  author: {name: string; handle: string; avatarUrl?: string}
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Boilerplate Next.js + Shadcn pronto para produção',
    excerpt:
      'Compartilhei um template que uso para apps com autenticação, tema, i18n e deploy com Docker.',
    tags: ['nextjs', 'shadcn', 'devops'],
    likes: 124,
    comments: 18,
    readTime: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    visibility: 'public',
    isFollowingAuthor: true,
    author: {
      name: 'Kelvin Cleto',
      handle: 'kelvin',
      avatarUrl: '/avatars/kelvin.png',
    },
    cover:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Automação n8n: reprocessando waitlist no Supabase',
    excerpt:
      'Mostro a função SQL e o fluxo que reatribui vagas quando há cancelamento ou no-show.',
    tags: ['n8n', 'supabase', 'sql'],
    likes: 86,
    comments: 9,
    readTime: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    visibility: 'public',
    isFollowingAuthor: false,
    author: {name: 'Guilherme Moreira', handle: 'gmoreira'},
  },
  {
    id: '3',
    title: 'Guia prático: métricas do funil para SDR com IA',
    excerpt:
      'Checklist de métricas para implementar um SDR semi-autônomo focado em recuperação de vendas.',
    tags: ['ia', 'sdr', 'growth'],
    likes: 203,
    comments: 41,
    readTime: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    visibility: 'public',
    isFollowingAuthor: true,
    author: {name: 'Basix Digital', handle: 'basix'},
    cover:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
  },
]

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------
function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function timeAgo(date: Date) {
  const diff = Math.max(0, Date.now() - date.getTime())
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'agora'
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  const d = Math.floor(h / 24)
  return `${d}d`
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

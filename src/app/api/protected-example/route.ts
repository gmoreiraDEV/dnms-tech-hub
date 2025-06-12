import {getApiUser} from '@/lib/auth/getApiUser'
import {prisma} from '@/lib/prisma'
import {requireRole} from '@/lib/auth/requireRole'
import {NextResponse} from 'next/server'

export async function GET(req: Request) {
  const payload = getApiUser(req)

  if (!payload) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const user = await prisma.user.findUnique({where: {id: payload.userId}})

  if (!user || !requireRole(user, ['ADMIN'])) {
    return NextResponse.json({error: 'Forbidden'}, {status: 403})
  }

  return NextResponse.json({message: 'Admin access granted.'})
}

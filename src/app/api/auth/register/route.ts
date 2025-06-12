import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {hashPassword} from '@/lib/auth/password'
import {signUpSchema} from '@/lib/validations/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validated = signUpSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: {email: validated.email},
    })

    if (existingUser) {
      return NextResponse.json({error: 'Email já cadastrado'}, {status: 400})
    }

    const hashedPassword = await hashPassword(validated.password)

    const user = await prisma.user.create({
      data: {
        email: validated.email,
        password: hashedPassword,
        role: 'USER',
      },
    })

    return NextResponse.json({message: 'Conta criada com sucesso', user})
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof Error)
      return NextResponse.json(
        {error: error?.message || 'Erro interno'},
        {status: 500}
      )
  }
}

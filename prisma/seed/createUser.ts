import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth/password'

async function main() {
    const hashed = await hashPassword("123456")

    await prisma.user.create({
        data: {
            email: "test@example.com",
            password: hashed,
            name: "Usuário Teste",
        },
    })

    console.log("Usuário criado com sucesso.")
}

main().then(() => process.exit())

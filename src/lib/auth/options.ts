import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from '@/lib/prisma'
import {comparePassword} from '@/lib/auth/password'
import {Account, Session, User} from 'next-auth'
import {JWT} from 'next-auth/jwt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {strategy: 'jwt'},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {id: profile.sub, email: profile.email, name: profile.name}
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name ?? profile.login,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: {email: credentials.email},
        })
        if (!user || !user.password) return null
        const isValid = await comparePassword(
          credentials.password,
          user.password
        )
        if (!isValid) return null
        return {id: user.id, email: user.email, name: user.name}
      },
    }),
  ],
  pages: {signIn: '/login'},
  events: {
    async createUser({user}: {user: {id: string}}) {
      await prisma.profile.create({
        data: {userId: user.id, image: null},
      })
    },
  },
  callbacks: {
    async signIn({user, account}: {user: User; account: Account}) {
      if (account?.provider && account.provider !== 'credentials') {
        const existingUser = await prisma.user.findUnique({
          where: {email: user.email!},
        })

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          })

          return true
        }
      }

      return true
    },
    async session({
      session,
      token,
    }: {
      session: Session & {user: {id: string}}
      token: JWT
    }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({token, user}: {token: JWT; user: User}) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
}

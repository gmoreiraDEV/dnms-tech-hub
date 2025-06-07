import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_AUTH0_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH0_CLIENT_SECRET!,
      issuer: process.env.NEXT_AUTH0_ISSUER_BASE_URL!,
    }),
  ],
})

export {handler as GET, handler as POST}

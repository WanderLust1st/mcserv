import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { type NextAuthOptions } from "next-auth"
import Discord from "next-auth/providers/discord"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.discordId = user.discordId
      }
      return token
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
        session.user.discordId = token.discordId as string | null
      }
      return session
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      if (!nextUrl.pathname.startsWith("/admin")) {
        return true
      }
      const discordId = auth?.user?.discordId
      const adminIds = process.env.ADMIN_DISCORD_IDS?.split(",").filter(Boolean)

      if (!discordId) {
        return false
      }

      if (adminIds.length === 0) {
        return true
      }

      return adminIds.includes(discordId)
    },
  },
  events: {
    async signIn(user, account) {
      console.log(`[Auth] User signed in: ${user?.email || user?.name}`)
    },
    async signOut() {
      console.log("[Auth] User signed out")
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
}

export const handlers = NextAuth(authOptions)

export default handlers

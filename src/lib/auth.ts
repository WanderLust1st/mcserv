import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { type NextAuthOptions } from "next-auth"
import Discord from "next-auth/providers/discord"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  // Enable debug mode in development (disabled for security)
  debug: false,

  // Adapter for database integration
  adapter: PrismaAdapter(prisma),

  // Discord OAuth provider configuration
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

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Pages configuration
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Callbacks for custom logic
  callbacks: {
    // JWT callback - add discordId to token
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.discordId = user.discordId
      }
      return token
    },

    // Session callback - populate session with user data
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
        session.user.discordId = token.discordId as string | null
      }
      return session
    },

    // Check admin access
    authorized: async ({ auth, request: { nextUrl } }) => {
      // Allow public access to non-admin routes
      if (!nextUrl.pathname.startsWith("/admin")) {
        return true
      }

      // Check if user is authenticated and in admin whitelist
      const discordId = auth?.user?.discordId
      const adminIds = process.env.ADMIN_DISCORD_IDS?.split(",").filter(Boolean)

      if (!discordId) {
        return false // Not authenticated
      }

      if (adminIds.length === 0) {
        // No whitelist - allow all authenticated users
        return true
      }

      return adminIds.includes(discordId)
    },
  },

  // Events for logging
  events: {
    // Log sign in events
    async signIn(user, account, profile) {
      console.log(`[Auth] User signed in: ${profile?.email || profile?.name} (${profile?.discordId})`)
    },
    async signOut() {
      console.log("[Auth] User signed out")
    },
    // Log failed login attempts for security monitoring
    async createUser(user) {
      console.log(`[Auth] New user created: ${user?.email || user?.name}`)
    },
  },

  // Enable experimental features
  experimental: {
    enableWebAuthn: true,
  },
}

export const handlers = NextAuth(authOptions)

export default handlers

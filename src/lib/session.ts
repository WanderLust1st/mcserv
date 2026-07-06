import auth from "next-auth"
import { authOptions } from "./auth"

/**
 * Check if the current user is authenticated
 */
export async function isAuthenticated() {
  const session = await auth(authOptions)
  return !!session
}

/**
 * Get the current user's Discord ID
 */
export async function getDiscordId() {
  const session = await auth(authOptions)
  return session?.user?.discordId || null
}

/**
 * Check if user has admin access
 */
export async function isAdmin(): Promise<boolean> {
  const discordId = await getDiscordId()

  if (!discordId) {
    return false
  }

  const adminIds = process.env.ADMIN_DISCORD_IDS?.split(",").filter(Boolean)

  if (adminIds.length === 0) {
    return true // No whitelist - allow all authenticated users
  }

  return adminIds.includes(discordId)
}

/**
 * Get the current session
 */
export async function getSession() {
  return await auth(authOptions)
}

import { NextResponse } from "next/server"
import auth from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth(authOptions)

    if (!session) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`)
    }

    // Redirect to Discord OAuth authorization URL
    const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.DISCORD_REDIRECT_URI || "http://localhost:3000/api/auth/callback/discord"
    )}&scope=identify&prompt=none`

    return NextResponse.redirect(discordUrl)
  } catch (error) {
    console.error("OAuth error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

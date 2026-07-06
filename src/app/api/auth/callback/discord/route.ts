import { NextResponse } from "next/server"
import auth from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Redirect to home page after successful Discord OAuth callback
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`)
  } catch (error) {
    console.error("OAuth callback error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

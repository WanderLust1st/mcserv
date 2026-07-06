"use client"

import React from "react"
import { useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { isAdmin } from "@/lib/session"

interface AdminGuardProps {
  children: React.ReactNode
  session: any
}

export default function AdminGuard({ children, session }: AdminGuardProps) {
  const { data: authSession, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (authSession?.user?.discordId) {
      isAdmin().then((isAdmin) => {
        if (!isAdmin) {
          router.push("/admin/403")
        }
      })
    } else if (session) {
      // Fallback for server-side session check
      const adminIds = process.env.ADMIN_DISCORD_IDS?.split(",").filter(Boolean)

      if (adminIds.length === 0) {
        // No whitelist - allow all authenticated users
      } else if (!adminIds.includes(session.user.discordId)) {
        router.push("/admin/403")
      }
    }
  }, [status, authSession, session, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    )
  }

  return <>{children}</>
}

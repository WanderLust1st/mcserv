import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import auth from "next-auth"
import { authOptions } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Minecraft Server - Join the Adventure!",
  description: "Connect to our private Minecraft server and join an amazing community. Features custom mods, exciting gameplay, and active player events.",
  keywords: ["minecraft", "server", "gaming", "multiplayer"],
  viewport: "width=device-width, initial-scale=1",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

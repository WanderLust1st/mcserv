"use client"

import React from "react"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Disc, LogOut, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  // Check if user is authenticated on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      // This would typically use a session check
      // For now, we'll assume the user needs to sign in
      // In production, you'd check the session from NextAuth
    }
    checkAuth()
  }, [])

  const handleDiscordSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("discord", { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signIn("discord", { callbackUrl: "/login" })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass backdrop-blur-xl border-white/20 bg-gradient-to-br from-white/10 to-white/5">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl glass bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                <Disc className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <CardTitle className="text-2xl text-white">Welcome Back!</CardTitle>
            <CardDescription className="text-white/60">
              Sign in with Discord to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isAuthenticated ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={handleDiscordSignIn}
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/90 hover:to-neon-blue/90 btn-press rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Disc className="w-5 h-5 mr-2" />
                        Sign in with Discord
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-sm text-white/50"
                >
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t border-white/10"
                >
                  <p className="text-center text-sm text-white/60 mb-3">
                    Or continue without an account
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = "/"}
                    className="w-full border-neon-purple/50 text-white hover:bg-neon-purple/20 hover:border-neon-purple/70 transition-all"
                  >
                    Visit Server Page
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-green-500/10 border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-400">You are signed in</span>
                </div>

                <Button
                  onClick={handleSignOut}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500/70 transition-all btn-press"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>

                <a
                  href="/"
                  className="inline-block text-neon-blue hover:text-neon-purple transition-colors text-sm"
                >
                  Return to server page →
                </a>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

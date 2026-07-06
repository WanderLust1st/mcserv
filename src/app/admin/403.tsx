"use client"

import { motion } from "framer-motion"
import { Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass backdrop-blur-xl border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/5">
          <CardContent className="pt-6 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto rounded-full glass bg-red-500/10 flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-red-400" />
              </div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">403</h1>
              <CardTitle className="text-xl text-white">Access Forbidden</CardTitle>
              <CardDescription className="text-white/70">
                You don&apos;t have permission to access this page.
              </CardDescription>
            </div>

            <div className="p-4 rounded-lg glass-dark bg-red-500/10 border border-red-500/20 text-left">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p className="font-medium mb-1">Admin Access Required</p>
                  <p>
                    This page is only accessible to users with admin privileges.
                    Your Discord ID is not in the whitelist.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => window.location.href = "/"}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/90 hover:to-neon-blue/90 btn-press rounded-xl"
            >
              Return to Server Page
            </Button>

            <p className="text-center text-sm text-white/50">
              If you believe this is an error, please contact the server administrator.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

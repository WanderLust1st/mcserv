"use client"

import React from "react"
import { motion } from "framer-motion"
import { ServerStatusWidget } from "@/components/ServerStatusWidget"
import { ConnectionGuide } from "@/components/ConnectionGuide"
import { ParticleBackground } from "@/components/ParticleBackground"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Copy, Check, Server, Users, Gamepad2 } from "lucide-react"

export default function Home() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText("play.yourserver.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-medium text-white/90">
              Premium Minecraft Experience
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Welcome to</span>{" "}
            <span className="text-white">Our Server</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Join our thriving Minecraft community and experience a world of adventure,
            custom gameplay, and friendly players.
          </p>
        </motion.div>

        {/* Server Status Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ServerStatusWidget />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-purple/90 hover:to-neon-blue/90 btn-press rounded-full"
          >
            Join Discord Community
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-gradient">Why Play With Us?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass card-hover bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <Gamepad2 className="w-12 h-12 text-neon-purple mb-4" />
                  <CardTitle className="text-xl text-white">Custom Gameplay</CardTitle>
                  <CardDescription className="text-white/60">
                    Experience unique mods and plugins that enhance your Minecraft adventure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Our server features carefully selected mods that add new dimensions,
                    creatures, and gameplay mechanics without breaking the vanilla experience.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="glass card-hover bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <Users className="w-12 h-12 text-neon-blue mb-4" />
                  <CardTitle className="text-xl text-white">Active Community</CardTitle>
                  <CardDescription className="text-white/60">
                    Connect with players from around the world in our friendly community.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Join our Discord server to meet players, find teammates, and stay updated
                    on server events and announcements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="glass card-hover bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <Server className="w-12 h-12 text-neon-cyan mb-4" />
                  <CardTitle className="text-xl text-white">High Performance</CardTitle>
                  <CardDescription className="text-white/60">
                    Optimized server hardware ensures smooth gameplay for everyone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Our dedicated servers run on powerful hardware with 24/7 monitoring
                    to ensure minimal lag and maximum performance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connection Guide Section */}
      <section className="relative z-10 py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient">How to Join</span>
          </h2>
          <p className="text-center text-white/60 mb-12">
            Follow these simple steps to connect to our server
          </p>

          <ConnectionGuide />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/50 text-sm">
            © 2024 Minecraft Server. Not affiliated with Mojang AB.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="#"
              className="text-white/50 hover:text-neon-purple transition-colors text-sm"
            >
              Discord
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-neon-blue transition-colors text-sm"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-neon-cyan transition-colors text-sm"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

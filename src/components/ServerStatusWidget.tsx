"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Server, Copy, Check, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServerStatusProps {
  ip?: string
  port?: number
}

export function ServerStatusWidget({ ip = "play.yourserver.com", port = 25565 }: ServerStatusProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [playerCount, setPlayerCount] = useState(42)
  const [maxPlayers] = useState(100)
  const [copied, setCopied] = useState(false)

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(true)
      setPlayerCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(0, Math.min(maxPlayers, prev + change))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [maxPlayers])

  const handleCopy = async () => {
    const address = `${ip}:${port}`
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = () => {
    if (isOnline) {
      return playerCount >= maxPlayers * 0.9 ? "text-red-500" :
             playerCount >= maxPlayers * 0.7 ? "text-yellow-500" :
             "text-green-500"
    }
    return "text-red-500"
  }

  const getStatusIcon = () => {
    if (isOnline) {
      return <Activity className="w-5 h-5 animate-pulse" />
    }
    return <Server className="w-5 h-5" />
  }

  return (
    <Card className="glass backdrop-blur-xl border-white/20 bg-gradient-to-br from-white/10 to-white/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <motion.div
              animate={{
                scale: isOnline ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getStatusIcon()}
            </motion.div>
            Server Status
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* IP Address */}
        <div className="flex items-center justify-between p-4 rounded-lg glass-dark bg-white/5">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-neon-purple" />
            <span className="text-white font-mono text-lg">
              {ip}:{port}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-white/10 rounded-full"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Check className="w-5 h-5 text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Copy className="w-5 h-5 text-white/70" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Player Count */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Players Online</span>
            <span className={getStatusColor()}>
              {playerCount}/{maxPlayers}
            </span>
          </div>
          <div className="h-3 rounded-full bg-black/40 overflow-hidden relative">
            <motion.div
              className={`absolute top-0 left-0 h-full ${
                playerCount >= maxPlayers * 0.9
                  ? "bg-red-500"
                  : playerCount >= maxPlayers * 0.7
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(playerCount / maxPlayers) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {isOnline && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-green-400 text-sm">
                ✓ Server is online and accepting connections
              </p>
            </motion.div>
          )}
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-red-400 text-sm">
                ⚠ Server is currently offline
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Connect Button */}
        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full border-neon-purple/50 text-white hover:bg-neon-purple/20 hover:border-neon-purple/70 transition-all"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy IP Address
        </Button>
      </CardContent>
    </Card>
  )
}

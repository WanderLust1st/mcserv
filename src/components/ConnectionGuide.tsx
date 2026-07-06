"use client"

import React from "react"
import { motion } from "framer-motion"
import { Gamepad2, Download, Copy, Check, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Step {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  version?: string
}

const steps: Step[] = [
  {
    number: 1,
    title: "Select Minecraft Version",
    description: "Choose the correct Minecraft version for our server",
    icon: <Gamepad2 className="w-8 h-8" />,
    version: "1.20.x",
  },
  {
    number: 2,
    title: "Download Required Mods",
    description: "Install the Forge modpack if required",
    icon: <Download className="w-8 h-8" />,
  },
  {
    number: 3,
    title: "Connect to Server",
    description: "Copy our server IP and join the game",
    icon: <Terminal className="w-8 h-8" />,
  },
]

export function ConnectionGuide() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText("play.yourserver.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Version Selector */}
      <Card className="glass backdrop-blur-xl border-white/20 bg-gradient-to-br from-white/10 to-white/5">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Gamepad2 className="w-6 h-6 text-neon-purple" />
            Server Configuration
          </CardTitle>
          <CardDescription className="text-white/60">
            Select your preferred Minecraft version
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue="1.20">
            <SelectTrigger className="w-full bg-black/40 border-white/20 text-white hover:border-neon-purple/50 transition-colors">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/20">
              <SelectItem value="1.20">Minecraft 1.20.x (Recommended)</SelectItem>
              <SelectItem value="1.19">Minecraft 1.19.x</SelectItem>
              <SelectItem value="1.18">Minecraft 1.18.x</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass backdrop-blur-xl border-white/20 bg-gradient-to-br from-white/5 to-white/8 hover:border-neon-purple/50 transition-all card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4 mb-2">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-lg glass bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className="text-neon-purple"
                      initial={{ rotate: -10 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white/20">
                      {step.number}
                    </span>
                    <CardTitle className="text-lg text-white">{step.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-white/70">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step.version && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-neon-cyan mb-4"
                  >
                    Recommended: {step.version}
                  </motion.p>
                )}

                {/* Step 3 - Copy IP */}
                {step.number === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg glass-dark bg-white/5"
                  >
                    <span className="text-white font-mono">play.yourserver.com</span>
                    <Button
                      variant="ghost"
                      size="sm"
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
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                          >
                            <Copy className="w-4 h-4 text-white/70" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                )}

                {/* Mod download link placeholder */}
                {step.number === 2 && (
                  <motion.a
                    href="#"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Forge Modpack
                    <span className="text-xs text-white/50 ml-1">(Optional)</span>
                  </motion.a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded-lg glass-dark bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-white/10"
      >
        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-neon-cyan" />
          Quick Tips
        </h4>
        <ul className="space-y-1 text-sm text-white/70">
          <li>• Make sure you're running the correct Minecraft version</li>
          <li>• If you experience lag, try lowering your graphics settings</li>
          <li>• Join our Discord for support and community events</li>
        </ul>
      </motion.div>
    </div>
  )
}

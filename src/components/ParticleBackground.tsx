"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ParticleProps {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Generate random particles
    const newParticles: Array<{ x: number; y: number; size: number; delay: number }> = []
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="particles">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4 + particle.size,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          left: "10%",
          top: "10%",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          right: "10%",
          bottom: "-10%",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion } from "framer-motion"

type GlowEffectProps = {
  children: ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  glowOpacity?: number
}

export default function GlowEffect({
  children,
  className = "",
  glowColor = "rgba(80, 230, 180, 0.5)",
  glowSize = 300,
  glowOpacity = 0.15,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            x: position.x - glowSize / 2,
            y: position.y - glowSize / 2,
            opacity: glowOpacity,
            scale: 1,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            x: { duration: 0 },
            y: { duration: 0 },
          }}
          style={{
            width: glowSize,
            height: glowSize,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

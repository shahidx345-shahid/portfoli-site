"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

type Card3DProps = {
  children: ReactNode
  className?: string
  glareColor?: string
  rotationIntensity?: number
  glareIntensity?: number
  borderRadius?: number
}

export default function Card3D({
  children,
  className = "",
  glareColor = "rgba(120, 255, 215, 0.4)",
  rotationIntensity = 15,
  glareIntensity = 0.2,
  borderRadius = 16,
}: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for rotation and glare
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smoother movement
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]), springConfig)

  // Glare position
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], ["-20%", "120%"]), springConfig)
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], ["-20%", "120%"]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate normalized values (-0.5 to 0.5)
    const normalizedX = mouseX / width - 0.5
    const normalizedY = mouseY / height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}

        {/* Glare effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 20%, ${glareColor} 40%, transparent 60%)`,
              opacity: glareIntensity,
              top: glareY,
              left: glareX,
              width: "100%",
              height: "100%",
              borderRadius,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

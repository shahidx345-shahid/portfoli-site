"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

type LiquidButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  color?: string
}

export default function LiquidButton({
  children,
  className = "",
  onClick,
  href,
  color = "emerald",
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const colorMap = {
    emerald: {
      bg: "bg-emerald-500",
      hover: "hover:bg-emerald-600",
      liquid: "rgba(16, 185, 129, 0.7)",
    },
    cyan: {
      bg: "bg-cyan-500",
      hover: "hover:bg-cyan-600",
      liquid: "rgba(6, 182, 212, 0.7)",
    },
    purple: {
      bg: "bg-purple-500",
      hover: "hover:bg-purple-600",
      liquid: "rgba(139, 92, 246, 0.7)",
    },
  }

  const selectedColor = colorMap[color as keyof typeof colorMap] || colorMap.emerald

  const liquidVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      borderRadius: "100%",
    },
    hover: {
      scale: 1.8,
      opacity: 1,
      borderRadius: "40%",
    },
    pressed: {
      scale: 2.2,
      opacity: 0.8,
      borderRadius: "30%",
    },
  }

  const ContentWrapper = href ? "a" : "button"
  const contentProps = href ? { href } : { onClick }

  return (
    <motion.div
      ref={buttonRef}
      className={`relative overflow-hidden rounded-md ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Liquid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={liquidVariants}
        initial="initial"
        animate={isPressed ? "pressed" : isHovered ? "hover" : "initial"}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          background: selectedColor.liquid,
          zIndex: 0,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Button content */}
      <ContentWrapper
        {...contentProps}
        className={`relative z-10 block px-6 py-3 ${selectedColor.bg} ${selectedColor.hover} text-white font-medium transition-colors rounded-md shadow-sm`}
      >
        {children}
      </ContentWrapper>
    </motion.div>
  )
}

"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

type TextShimmerProps = {
  children: ReactNode
  className?: string
  delay?: number
  gradient?: string
}

export default function TextShimmer({
  children,
  className = "",
  delay = 0,
  gradient = "from-emerald-400 via-cyan-400 to-emerald-400",
}: TextShimmerProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={textRef}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} bg-[length:200%_100%] bg-clip-text text-transparent`}
        initial={{ backgroundPosition: "0% center" }}
        animate={isInView ? { backgroundPosition: "200% center" } : { backgroundPosition: "0% center" }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
          delay: delay + 0.5,
        }}
      >
        {children}
      </motion.div>
      <div className="text-transparent">{children}</div>
    </motion.div>
  )
}

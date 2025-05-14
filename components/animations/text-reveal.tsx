"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type TextRevealProps = {
  text: string
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  staggerChildren?: number
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  once = true,
  staggerChildren = 0.03,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

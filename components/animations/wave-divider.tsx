"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type WaveDividerProps = {
  className?: string
  flip?: boolean
  color?: string
  height?: number
}

export default function WaveDivider({
  className = "",
  flip = false,
  color = "currentColor",
  height = 120,
}: WaveDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  }

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden ${className}`}
      style={{ height, transform: flip ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill={color}
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </svg>
    </div>
  )
}

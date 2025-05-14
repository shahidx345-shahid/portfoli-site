"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type FloatingElement = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

type FloatingElementsProps = {
  count?: number
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
  className?: string
}

export default function FloatingElements({
  count = 15,
  minSize = 5,
  maxSize = 20,
  minDuration = 15,
  maxDuration = 40,
  className = "",
}: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = []

    for (let i = 0; i < count; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * (maxDuration - minDuration) + minDuration,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    setElements(newElements)
  }, [count, minSize, maxSize, minDuration, maxDuration])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-emerald-400 dark:bg-emerald-400"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
            opacity: element.opacity,
          }}
          animate={{
            y: ["0%", "100%", "0%"],
            x: [`${element.x}%`, `${element.x + (Math.random() * 10 - 5)}%`, `${element.x}%`],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

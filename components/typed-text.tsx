"use client"

import { useEffect, useState, useRef } from "react"

export default function TypedText() {
  const [isMounted, setIsMounted] = useState(false)
  const roles = ["FRONTEND DEVELOPER", "BACKEND DEVELOPER", "FULL STACK DEVELOPER"]
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        // Finished typing, wait before deleting
        const timer = setTimeout(() => {
          if (isMounted) setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timer)
      } else if (isDeleting && text === "") {
        // Finished deleting, move to next role
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, roles, typingSpeed])

  // Blinking cursor effect
  useEffect(() => {
    const cursorElement = cursorRef.current
    if (!cursorElement) return

    const blinkInterval = setInterval(() => {
      cursorElement.style.opacity = cursorElement.style.opacity === "0" ? "1" : "0"
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  if (!isMounted) {
    return <span className="h-6 inline-block"></span> // Reserve space while loading
  }

  return (
    <span className="relative">
      {text}
      <span
        ref={cursorRef}
        className="ml-0.5 inline-block h-6 w-0.5 bg-emerald-400 animate-pulse"
      />
    </span>
  )
}

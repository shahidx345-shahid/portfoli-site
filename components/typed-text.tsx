"use client"

import { useEffect, useState, useRef } from "react"

export default function TypedText() {
  const roles = ["FRONTEND DEVELOPER", "BACKEND DEVELOPER", "FULL STACK DEVELOPER"]
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        // Finished typing, wait before deleting
        setTimeout(() => setIsDeleting(true), 2000)
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

  return (
    <>
      {text}
      <span ref={cursorRef} className="inline-block w-1 h-8 bg-emerald-400 ml-1 align-middle">
        &nbsp;
      </span>
    </>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    setMounted(true)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Create particles
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 50) // Reduced particle count
      particlesRef.current = []

      const getColor = () => {
        const colors =
          theme === "dark" ? ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6"] : ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.3, // Slower movement
          speedY: (Math.random() - 0.5) * 0.3, // Slower movement
          color: getColor(),
          opacity: Math.random() * 0.4 + 0.1, // Lower opacity
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Mouse interaction
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120, // Smaller interaction radius
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop with throttling
    let lastTime = 0
    const fps = 30 // Lower FPS for better performance
    const fpsInterval = 1000 / fps

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastTime

      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i]
          p.x += p.speedX
          p.y += p.speedY

          // Boundary check
          if (p.x > canvas.width) p.x = 0
          else if (p.x < 0) p.x = canvas.width
          if (p.y > canvas.height) p.y = 0
          else if (p.y < 0) p.y = canvas.height

          // Mouse interaction
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouse.radius) {
              const angle = Math.atan2(dy, dx)
              const force = (mouse.radius - distance) / mouse.radius

              p.x -= Math.cos(angle) * force * 1.5
              p.y -= Math.sin(angle) * force * 1.5
            }
          }

          // Draw particle
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.opacity
          ctx.fill()
        }

        // Draw connections (only for nearby particles to improve performance)
        ctx.globalAlpha = 0.1 // Lower opacity for connections
        ctx.strokeStyle = theme === "dark" ? "#ffffff" : "#000000"
        ctx.lineWidth = 0.3 // Thinner lines

        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x
            const dy = particlesRef.current[i].y - particlesRef.current[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              // Shorter connection distance
              ctx.beginPath()
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
              ctx.stroke()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30" />
}

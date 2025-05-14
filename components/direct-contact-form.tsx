"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import LiquidButton from "@/components/animations/liquid-button"
import Card3D from "@/components/animations/3d-card"

export default function DirectContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Get form data
      const formData = new FormData(formRef.current as HTMLFormElement)
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const message = formData.get("message") as string

      // Simple validation
      if (!name || !email || !message) {
        throw new Error("Please fill out all fields")
      }

      // Create a mailto link as fallback
      const mailtoLink = `mailto:shahidx345@gmail.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`

      // Try to open the email client
      window.location.href = mailtoLink

      // Show success message
      setIsSubmitted(true)

      // Reset form
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card3D className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 w-full max-w-md mx-auto">
      {isSubmitted ? (
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-3">
            <svg
              className="w-6 h-6 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            Thank you for reaching out. I'll get back to you soon.
          </p>
          <LiquidButton onClick={() => setIsSubmitted(false)}>Send Another</LiquidButton>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-500 text-sm">{error}</div>
          )}

          <div className="space-y-1">
            <label htmlFor="name" className="block text-xs font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-xs font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors flex items-center justify-center text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Or email me directly at{" "}
            <a href="mailto:shahidx345@gmail.com" className="text-emerald-400 hover:underline">
              shahidx345@gmail.com
            </a>
          </p>
        </form>
      )}

      {/* Hidden iframe for form target */}
      <iframe name="hidden-iframe" ref={iframeRef} style={{ display: "none" }} title="Form submission"></iframe>
    </Card3D>
  )
}

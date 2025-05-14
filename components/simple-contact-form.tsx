"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import LiquidButton from "@/components/animations/liquid-button"
import Card3D from "@/components/animations/3d-card"

export default function SimpleContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simple validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill out all fields")
      }

      // Create a hidden form and submit it directly (avoids CORS issues)
      const form = document.createElement("form")
      form.method = "POST"
      form.action = "https://formsubmit.co/shahidx345@gmail.com"
      form.target = "_blank" // Opens in new tab to avoid navigation away

      // Add form fields
      const nameField = document.createElement("input")
      nameField.type = "text"
      nameField.name = "name"
      nameField.value = formData.name
      form.appendChild(nameField)

      const emailField = document.createElement("input")
      emailField.type = "email"
      emailField.name = "email"
      emailField.value = formData.email
      form.appendChild(emailField)

      const messageField = document.createElement("textarea")
      messageField.name = "message"
      messageField.value = formData.message
      form.appendChild(messageField)

      // Add subject field
      const subjectField = document.createElement("input")
      subjectField.type = "hidden"
      subjectField.name = "_subject"
      subjectField.value = `New Contact Form Submission from ${formData.name}`
      form.appendChild(subjectField)

      // Add honeypot field to prevent spam
      const honeypotField = document.createElement("input")
      honeypotField.type = "text"
      honeypotField.name = "_honey"
      honeypotField.style.display = "none"
      form.appendChild(honeypotField)

      // Disable captcha
      const captchaField = document.createElement("input")
      captchaField.type = "hidden"
      captchaField.name = "_captcha"
      captchaField.value = "false"
      form.appendChild(captchaField)

      // Add redirect field
      const redirectField = document.createElement("input")
      redirectField.type = "hidden"
      redirectField.name = "_next"
      redirectField.value = window.location.href
      form.appendChild(redirectField)

      // Append form to body, submit it, and remove it
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      // Mark as submitted and reset form
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card3D className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 w-full max-w-md">
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-4">
            <svg
              className="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
          <LiquidButton onClick={() => setIsSubmitted(false)}>Send Another Message</LiquidButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-500 text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              required
            ></textarea>
          </div>

          <LiquidButton className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </LiquidButton>
        </form>
      )}
    </Card3D>
  )
}

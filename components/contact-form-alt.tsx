"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import LiquidButton from "@/components/animations/liquid-button"
import Card3D from "@/components/animations/3d-card"

export default function ContactFormAlt() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

    try {
      const response = await fetch('https://formsubmit.co/ajax/shahidx345@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        console.error('Form submission failed:', result)
        alert('Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
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
        <form 
        action="https://formsubmit.co/shahidx345@gmail.com" 
        method="POST"
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <input type="hidden" name="_next" value={`${window.location.origin}/thank-you`} />
        <input type="hidden" name="_captcha" value="false" />
          <div className="space-y-1">
            <label htmlFor="name" className="block text-xs font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
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
    </Card3D>
  )
}

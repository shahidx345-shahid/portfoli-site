"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { submitContactForm } from "@/app/actions/contact"
import { Loader2 } from "lucide-react"
import LiquidButton from "@/components/animations/liquid-button"
import Card3D from "@/components/animations/3d-card"

type FormErrors = {
  name?: string[]
  email?: string[]
  message?: string[]
  form?: string[]
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <LiquidButton className="w-full" disabled={pending}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending...
        </span>
      ) : (
        "Send Message"
      )}
    </LiquidButton>
  )
}

export default function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitted(true)
        setErrors({})
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setErrors(result.errors || {})
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({
        form: ["An unexpected error occurred. Please try again later."],
      })
    }
  }

  return (
    <Card3D className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 w-full max-w-md">
      {submitted ? (
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
          <LiquidButton onClick={() => setSubmitted(false)}>Send Another Message</LiquidButton>
        </div>
      ) : (
        <form id="contact-form" action={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-500 text-sm">
              {errors.form.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.name ? "border-red-500" : "border-white/10"
              } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/10"
              } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={`w-full px-4 py-3 bg-white/10 border ${
                errors.message ? "border-red-500" : "border-white/10"
              } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>}
          </div>

          <SubmitButton />
        </form>
      )}
    </Card3D>
  )
}

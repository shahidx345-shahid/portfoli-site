"use server"

import { z } from "zod"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate form data
    const result = contactFormSchema.safeParse({ name, email, message })

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      }
    }

    // Send the data to our API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API response error:", errorData)
      throw new Error(errorData.error || "Failed to send message")
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending contact form:", error)
    return {
      success: false,
      errors: { form: ["Failed to send message. Please try again later."] },
    }
  }
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the email content
    const emailContent = `
      New contact form submission:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `

    // Use a simple email forwarding service - Web3Forms (free)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Replace with your Web3Forms access key
        subject: `New Contact Form Submission from ${name}`,
        from_name: name,
        from_email: email,
        message: message,
        to_email: "shahidx345@gmail.com",
      }),
    })

    const responseData = await response.json()

    if (responseData.success) {
      return NextResponse.json({ success: true })
    } else {
      console.error("Email service error:", responseData)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in contact API:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

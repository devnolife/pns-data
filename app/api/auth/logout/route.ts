import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, you might invalidate the token on the server
    // For this mock, we'll just return a success response

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in logout API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

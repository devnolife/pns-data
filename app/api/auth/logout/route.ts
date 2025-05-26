import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json({ success: true })

    // Clear the auth cookies
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })

    response.cookies.set("user-role", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error in logout API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

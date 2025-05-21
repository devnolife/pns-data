import { NextResponse } from "next/server"

// Mock user data
const mockUsers = [
  {
    id: "1",
    username: "user",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
  {
    id: "2",
    username: "admin",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
]

export async function GET(request: Request) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // In a real app, you would verify the JWT token here
    // For this mock, we'll extract the user ID from the token
    const userIdMatch = token.match(/mock-jwt-token-(\d+)-\d+/)

    if (!userIdMatch) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = userIdMatch[1]

    // Find the user
    const user = mockUsers.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error in me API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

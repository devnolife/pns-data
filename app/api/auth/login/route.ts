import { NextResponse } from "next/server"

// Mock user data
const mockUsers = [
  {
    id: "1",
    username: "user",
    password: "password", // In a real app, this would be hashed
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
  {
    id: "2",
    username: "admin",
    password: "admin123", // In a real app, this would be hashed
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
]

export async function POST(request: Request) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Parse the request body
    const body = await request.json()
    const { username, password } = body

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Find the user
    const user = mockUsers.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = user

    // In a real app, you would create a JWT token here
    const token = `mock-jwt-token-${user.id}-${Date.now()}`

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Error in login API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

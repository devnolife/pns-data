import { NextResponse } from "next/server"

// Mock user data (shared with login route)
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
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Parse the request body
    const body = await request.json()
    const { username, password, name, email } = body

    // Validate required fields
    if (!username || !password || !name || !email) {
      return NextResponse.json({ error: "Username, password, name, and email are required" }, { status: 400 })
    }

    // Check if username or email already exists
    if (mockUsers.some((u) => u.username === username)) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 })
    }

    if (mockUsers.some((u) => u.email === email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    // Create a new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      username,
      password, // In a real app, this would be hashed
      name,
      email,
      role: "user", // Default role for new registrations
    }

    // Add to mock data
    mockUsers.push(newUser)

    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = newUser

    // In a real app, you would create a JWT token here
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in register API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

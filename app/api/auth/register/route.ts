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
    training: "PKP",
    class: "Class A",
    phone: "1234567890",
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
    const { username, password, name, email, training, class: userClass, phone } = body

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
      training,
      class: userClass,
      phone,
    }

    // Add to mock data
    mockUsers.push(newUser)

    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = newUser

    // Create a simple token (in a real app, this would be a JWT)
    const token = `mock-token-${newUser.id}-${Date.now()}`

    // Set cookies for middleware
    const response = NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    response.cookies.set("user-role", newUser.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error in register API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

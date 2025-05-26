import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

// Mock user data (shared with login and register routes)
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

// JWT secret key (in a real app, this would be in an environment variable)
const JWT_SECRET = "your-secret-key-for-jwt-signing"

export async function GET(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    // Verify the token
    const decoded = verify(token, JWT_SECRET) as { id: string; username: string; role: string }

    // Find the user
    const user = mockUsers.find((u) => u.id === decoded.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Error in me API:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

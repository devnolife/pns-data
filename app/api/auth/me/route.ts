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
    // Get the token from cookies
    const cookieHeader = request.headers.get("cookie")
    let authToken = null
    
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => c.trim())
      const authCookie = cookies.find(c => c.startsWith('auth-token='))
      if (authCookie) {
        authToken = authCookie.split('=')[1]
      }
    }

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // For mock token, extract user ID
    const tokenParts = authToken.split('-')
    if (tokenParts.length < 3 || tokenParts[0] !== 'mock' || tokenParts[1] !== 'token') {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = tokenParts[2]

    // Find the user
    const user = mockUsers.find((u) => u.id === userId)

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

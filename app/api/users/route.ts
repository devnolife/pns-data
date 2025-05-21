import { NextResponse } from "next/server"

// Mock users database
let users = [
  {
    id: "1",
    name: "Admin User",
    username: "adminpusjar",
    email: "admin@example.com",
    role: "admin",
    training: "N/A",
    status: "active",
    lastLogin: "2024-05-19T10:30:00",
  },
  {
    id: "2",
    name: "John Doe",
    username: "pesertapka01",
    email: "john@example.com",
    role: "user",
    training: "PKA",
    class: "PKA-01",
    status: "active",
    lastLogin: "2024-05-18T14:45:00",
  },
  {
    id: "3",
    name: "Jane Smith",
    username: "pesertapkp01",
    email: "jane@example.com",
    role: "user",
    training: "PKP",
    class: "PKP-01",
    status: "active",
    lastLogin: "2024-05-17T09:15:00",
  },
  {
    id: "4",
    name: "Robert Johnson",
    username: "pesertapkn01",
    email: "robert@example.com",
    role: "user",
    training: "PKN",
    class: "PKN-01",
    status: "inactive",
    lastLogin: "2024-05-10T11:20:00",
  },
  {
    id: "5",
    name: "Sarah Williams",
    username: "cpns2024",
    email: "sarah@example.com",
    role: "user",
    training: "CPNS Latsar",
    class: "CPNS-01",
    status: "active",
    lastLogin: "2024-05-19T08:05:00",
  },
  {
    id: "6",
    name: "Michael Brown",
    username: "michael123",
    email: "michael@example.com",
    role: "user",
    training: "PKP",
    class: "PKP-02",
    status: "active",
    lastLogin: "2024-05-16T16:30:00",
  },
  {
    id: "7",
    name: "Emily Davis",
    username: "emily456",
    email: "emily@example.com",
    role: "user",
    training: "PKA",
    class: "PKA-02",
    status: "inactive",
    lastLogin: "2024-05-05T13:45:00",
  },
  {
    id: "8",
    name: "David Wilson",
    username: "david789",
    email: "david@example.com",
    role: "user",
    training: "CPNS Latsar",
    class: "CPNS-02",
    status: "active",
    lastLogin: "2024-05-18T10:10:00",
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  // Filter users
  let filteredUsers = [...users]

  if (role && role !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === role)
  }

  if (status && status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower),
    )
  }

  // Remove sensitive information
  const sanitizedUsers = filteredUsers.map(({ password, ...user }) => user)

  return NextResponse.json({
    users: sanitizedUsers,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, username, email, role, training, class: className } = body

    // Validate required fields
    if (!name || !username || !email || !role) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    // Check if username or email already exists
    const existingUser = users.find((user) => user.username === username || user.email === email)

    if (existingUser) {
      return NextResponse.json({ message: "Username or email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: `user-${Math.random().toString(36).substring(2)}`,
      name,
      username,
      email,
      role,
      training: training || "N/A",
      class: className || "N/A",
      status: "active",
      lastLogin: null,
    }

    // Add to users
    users.push(newUser)

    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while creating the user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Find user
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: users[userIndex],
    })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while updating the user" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Find user
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Remove user
    const deletedUser = users[userIndex]
    users = users.filter((user) => user.id !== id)

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while deleting the user" }, { status: 500 })
  }
}

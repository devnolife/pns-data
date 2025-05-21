import { NextResponse } from "next/server"

// Simulated network delay
const NETWORK_DELAY = 1500

// Mock data for uploaded reports
let mockReports = [
  {
    id: "1",
    title: "Monthly Progress Report",
    type: "Progress Report",
    description: "Monthly progress report for July 2023",
    status: "pending",
    userId: "1",
    userName: "Regular User",
    fileUrl: "/mock-files/report1.pdf",
    fileSize: "1.2 MB",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Training Completion Report",
    type: "Completion Report",
    description: "Report on completion of leadership training program",
    status: "verified",
    userId: "1",
    userName: "Regular User",
    fileUrl: "/mock-files/report2.pdf",
    fileSize: "2.5 MB",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    verifiedAt: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    verifiedBy: "Admin User",
  },
]

// Helper function to verify authorization
function verifyAuth(headersList: Headers) {
  const authorization = headersList.get("authorization")

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return false
  }

  const token = authorization.split(" ")[1]

  // In a real app, you would verify the JWT token here
  // For mock purposes, we'll just check if it starts with "mock-token-"
  if (!token || !token.startsWith("mock-token-")) {
    return false
  }

  return true
}

export async function POST(request: Request) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Parse the form data
    const formData = await request.formData()
    const title = formData.get("title") as string
    const type = formData.get("type") as string
    const description = formData.get("description") as string
    const file = formData.get("file") as File

    // Validate required fields
    if (!title || !type || !file) {
      return NextResponse.json({ error: "Title, type, and file are required" }, { status: 400 })
    }

    // Create a new report
    const newReport = {
      id: (mockReports.length + 1).toString(),
      title,
      type,
      description: description || "",
      status: "pending",
      userId: "1", // In a real app, this would come from the authenticated user
      userName: "Regular User", // In a real app, this would come from the authenticated user
      fileUrl: `/mock-files/report${mockReports.length + 1}.pdf`, // In a real app, this would be the actual file URL
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      createdAt: new Date().toISOString(),
    }

    // Add to mock data
    mockReports = [newReport, ...mockReports]

    return NextResponse.json(newReport, { status: 201 })
  } catch (error) {
    console.error("Error in report upload API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

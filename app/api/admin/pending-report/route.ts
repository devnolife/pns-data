import { NextResponse } from "next/server"

// Mock data for pending reports
const mockPendingReports = [
  {
    id: "1",
    title: "Monthly Progress Report",
    type: "Progress Report",
    description: "Monthly progress report for July 2023",
    status: "pending",
    userId: "1",
    userName: "Regular User",
    userEmail: "user@example.com",
    fileUrl: "/mock-files/report1.pdf",
    fileSize: "1.2 MB",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Final Project Report",
    type: "Project Report",
    description: "Final report for the digital transformation project",
    status: "pending",
    userId: "1",
    userName: "Regular User",
    userEmail: "user@example.com",
    fileUrl: "/mock-files/report3.pdf",
    fileSize: "3.7 MB",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: "4",
    title: "Training Needs Assessment",
    type: "Assessment Report",
    description: "Assessment of training needs for the department",
    status: "pending",
    userId: "1",
    userName: "Regular User",
    userEmail: "user@example.com",
    fileUrl: "/mock-files/report4.pdf",
    fileSize: "1.8 MB",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
]

export async function GET(request: Request) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const reportType = searchParams.get("reportType")
    const search = searchParams.get("search")

    // Apply filters if provided
    let filteredReports = [...mockPendingReports]

    if (status) {
      filteredReports = filteredReports.filter((r) => r.status === status)
    }

    if (reportType) {
      filteredReports = filteredReports.filter((r) => r.type === reportType)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredReports = filteredReports.filter(
        (r) =>
          r.title.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower) ||
          r.userName.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json(filteredReports)
  } catch (error) {
    console.error("Error in pending-report API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

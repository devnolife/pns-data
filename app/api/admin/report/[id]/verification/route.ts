import { NextResponse } from "next/server"

// Mock data for reports (shared with other routes)
const mockReports = [
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
    id: "2",
    title: "Training Completion Report",
    type: "Completion Report",
    description: "Report on completion of leadership training program",
    status: "verified",
    userId: "1",
    userName: "Regular User",
    userEmail: "user@example.com",
    fileUrl: "/mock-files/report2.pdf",
    fileSize: "2.5 MB",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    verifiedAt: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString(),
    verifiedBy: "Admin User",
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

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Parse the request body
    const body = await request.json()
    const { action, rejectionReason, adminName } = body

    // Validate required fields
    if (!action || !["verify", "reject"].includes(action)) {
      return NextResponse.json({ error: "Action must be either 'verify' or 'reject'" }, { status: 400 })
    }

    if (action === "reject" && !rejectionReason) {
      return NextResponse.json({ error: "Rejection reason is required when rejecting a report" }, { status: 400 })
    }

    // Find the report
    const reportIndex = mockReports.findIndex((r) => r.id === params.id)

    if (reportIndex === -1) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    // Update the report
    const updatedReport = {
      ...mockReports[reportIndex],
      status: action === "verify" ? "verified" : "rejected",
      ...(action === "verify" && {
        verifiedAt: new Date().toISOString(),
        verifiedBy: adminName || "Admin User",
      }),
      ...(action === "reject" && {
        rejectedAt: new Date().toISOString(),
        rejectedBy: adminName || "Admin User",
        rejectionReason,
      }),
    }

    mockReports[reportIndex] = updatedReport

    return NextResponse.json(updatedReport)
  } catch (error) {
    console.error("Error in report verification API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

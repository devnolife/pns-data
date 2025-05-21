import { NextResponse } from "next/server"

// Mock reports database
const reports: any[] = [
  {
    id: "1",
    title: "Weekly Progress Report - Week 1",
    description: "Summary of activities and progress for the first week of training.",
    category: "CPNS",
    userId: "5",
    userName: "CPNS Latsar Participant",
    files: [
      {
        name: "progress-report-week1.pdf",
        size: "1.2 MB",
        type: "PDF",
      },
    ],
    createdAt: "2024-05-15T10:30:00",
  },
  {
    id: "2",
    title: "PKA Final Project",
    description: "Final project submission for PKA training program.",
    category: "PKA",
    userId: "2",
    userName: "PKA Participant",
    files: [
      {
        name: "pka-final-project.docx",
        size: "3.5 MB",
        type: "DOCX",
      },
      {
        name: "pka-presentation.pptx",
        size: "2.8 MB",
        type: "PPTX",
      },
    ],
    createdAt: "2024-05-10T14:45:00",
  },
  {
    id: "3",
    title: "PKP Module 3 Assignment",
    description: "Completed assignment for PKP Module 3: Leadership Principles.",
    category: "PKP",
    userId: "3",
    userName: "PKP Participant",
    files: [
      {
        name: "pkp-module3-assignment.pdf",
        size: "0.9 MB",
        type: "PDF",
      },
    ],
    createdAt: "2024-05-05T09:15:00",
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const category = searchParams.get("category")

  // Filter reports
  let filteredReports = [...reports]

  if (userId) {
    filteredReports = filteredReports.filter((report) => report.userId === userId)
  }

  if (category && category !== "all") {
    filteredReports = filteredReports.filter((report) => report.category === category)
  }

  return NextResponse.json({
    reports: filteredReports,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, category, userId, userName, files } = body

    // Validate required fields
    if (!title || !category || !userId || !files || files.length === 0) {
      return NextResponse.json({ message: "Required fields are missing" }, { status: 400 })
    }

    // Create new report
    const newReport = {
      id: `report-${Math.random().toString(36).substring(2)}`,
      title,
      description,
      category,
      userId,
      userName,
      files,
      createdAt: new Date().toISOString(),
    }

    // Add to reports
    reports.push(newReport)

    return NextResponse.json({
      message: "Report uploaded successfully",
      report: newReport,
    })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while uploading the report" }, { status: 500 })
  }
}

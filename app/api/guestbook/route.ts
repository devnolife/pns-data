import { NextResponse } from "next/server"

// Simulated network delay
const NETWORK_DELAY = 500

// Mock data for guestbook entries
let mockGuestbookEntries = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    institution: "Ministry of Education",
    message: "Great resource for CPNS preparation!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    institution: "Department of Public Works",
    message: "The digital collections are very helpful for my training.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    institution: "Ministry of Finance",
    message: "I appreciate the well-organized materials and easy access.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
]

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

    return NextResponse.json({
      success: true,
      entries: mockGuestbookEntries,
    })
  } catch (error) {
    console.error("Error in guestbook API:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching guestbook entries" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

    // Parse the request body
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, message: "Name, email, and message are required" }, { status: 400 })
    }

    // Create a new entry
    const newEntry = {
      id: (mockGuestbookEntries.length + 1).toString(),
      name: body.name,
      email: body.email,
      institution: body.institution || "Not specified",
      message: body.message,
      createdAt: new Date().toISOString(),
    }

    // Add to mock data
    mockGuestbookEntries = [newEntry, ...mockGuestbookEntries]

    return NextResponse.json(
      {
        success: true,
        message: "Guestbook entry submitted successfully",
        entry: newEntry,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in guestbook API:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while submitting guestbook entry" },
      { status: 500 },
    )
  }
}

import { NextResponse } from "next/server"

// Simulated network delay
const NETWORK_DELAY = 800

// Mock data for folders
let mockFolders = [
  {
    id: "1",
    name: "CPNS Materials",
    description: "Materials related to CPNS preparation and exams",
    reportType: "CPNS",
    year: "2023",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  },
  {
    id: "2",
    name: "PKA Materials",
    description: "Materials for PKA training program",
    reportType: "PKA",
    year: "2023",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  },
  {
    id: "3",
    name: "PKP Materials",
    description: "Materials for PKP training program",
    reportType: "PKP",
    year: "2023",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  },
  {
    id: "4",
    name: "PKN Materials",
    description: "Materials for PKN training program",
    reportType: "PKN",
    year: "2023",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  },
  {
    id: "5",
    name: "General Materials",
    description: "General training materials",
    reportType: "General",
    year: "2023",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
  },
  {
    id: "6",
    name: "CPNS Materials 2022",
    description: "Materials related to CPNS preparation and exams for 2022",
    reportType: "CPNS",
    year: "2022",
    isActive: false,
    createdAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    updatedAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    expiryDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
  },
]

export async function GET(request: Request) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const reportType = searchParams.get("reportType")
    const year = searchParams.get("year")
    const search = searchParams.get("search")
    const expired = searchParams.get("expired")

    // Apply filters if provided
    let filteredFolders = [...mockFolders]

    if (reportType) {
      filteredFolders = filteredFolders.filter((f) => f.reportType === reportType)
    }

    if (year) {
      filteredFolders = filteredFolders.filter((f) => f.year === year)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredFolders = filteredFolders.filter(
        (f) => f.name.toLowerCase().includes(searchLower) || f.description.toLowerCase().includes(searchLower),
      )
    }

    if (expired !== null) {
      const isExpired = expired === "true"
      const now = new Date().toISOString()
      filteredFolders = filteredFolders.filter((f) => (isExpired ? f.expiryDate < now : f.expiryDate >= now))
    }

    return NextResponse.json(filteredFolders)
  } catch (error) {
    console.error("Error in folder API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
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

    // Parse the request body
    const body = await request.json()
    const { name, description, reportType, year, expiryDate } = body

    // Validate required fields
    if (!name || !reportType || !year) {
      return NextResponse.json({ error: "Name, report type, and year are required" }, { status: 400 })
    }

    // Create a new folder
    const newFolder = {
      id: (mockFolders.length + 1).toString(),
      name,
      description: description || "",
      reportType,
      year,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiryDate: expiryDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    }

    // Add to mock data
    mockFolders = [...mockFolders, newFolder]

    return NextResponse.json(newFolder, { status: 201 })
  } catch (error) {
    console.error("Error in folder API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

// Mock data for folders (shared with folder route)
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Find the folder
    const folder = mockFolders.find((f) => f.id === params.id)

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 })
    }

    return NextResponse.json(folder)
  } catch (error) {
    console.error("Error in folder/[id] API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Parse the request body
    const body = await request.json()
    const { name, description, reportType, year, isActive, expiryDate } = body

    // Find the folder
    const folderIndex = mockFolders.findIndex((f) => f.id === params.id)

    if (folderIndex === -1) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 })
    }

    // Update the folder
    const updatedFolder = {
      ...mockFolders[folderIndex],
      name: name || mockFolders[folderIndex].name,
      description: description !== undefined ? description : mockFolders[folderIndex].description,
      reportType: reportType || mockFolders[folderIndex].reportType,
      year: year || mockFolders[folderIndex].year,
      isActive: isActive !== undefined ? isActive : mockFolders[folderIndex].isActive,
      updatedAt: new Date().toISOString(),
      expiryDate: expiryDate || mockFolders[folderIndex].expiryDate,
    }

    mockFolders[folderIndex] = updatedFolder

    return NextResponse.json(updatedFolder)
  } catch (error) {
    console.error("Error in folder/[id] API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
    }

    // Find the folder
    const folderIndex = mockFolders.findIndex((f) => f.id === params.id)

    if (folderIndex === -1) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 })
    }

    // Remove the folder
    const deletedFolder = mockFolders[folderIndex]
    mockFolders = mockFolders.filter((f) => f.id !== params.id)

    return NextResponse.json({ success: true, deletedFolder })
  } catch (error) {
    console.error("Error in folder/[id] API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

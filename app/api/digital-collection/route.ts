import { NextResponse } from "next/server"

// Mock data for digital collections
const mockDigitalCollections = [
  {
    id: "1",
    title: "CPNS Exam Preparation Guide",
    category: "CPNS",
    type: "PDF",
    description: "Comprehensive guide for preparing for the CPNS examination.",
    folder: "CPNS Materials",
    batch: "2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Leadership Training Module",
    category: "PKA",
    type: "PDF",
    description: "Advanced leadership training materials for PKA participants.",
    folder: "PKA Materials",
    batch: "2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Public Policy Analysis",
    category: "PKP",
    type: "PDF",
    description: "In-depth analysis of public policy development and implementation.",
    folder: "PKP Materials",
    batch: "2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Strategic Management in Public Service",
    category: "PKN",
    type: "PDF",
    description: "Strategic management principles applied to public service contexts.",
    folder: "PKN Materials",
    batch: "2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Ethics in Public Administration",
    category: "General",
    type: "PDF",
    description: "Ethical considerations and case studies in public administration.",
    folder: "General Materials",
    batch: "2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Digital Transformation in Government",
    category: "General",
    type: "PDF",
    description: "Guide to implementing digital transformation in government agencies.",
    folder: "General Materials",
    batch: "2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Project Management for Public Sector",
    category: "PKP",
    type: "PDF",
    description: "Project management methodologies adapted for public sector projects.",
    folder: "PKP Materials",
    batch: "2022",
    createdAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    updatedAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  },
  {
    id: "8",
    title: "Budget Planning and Management",
    category: "PKN",
    type: "PDF",
    description: "Comprehensive guide to budget planning and management in government.",
    folder: "PKN Materials",
    batch: "2022",
    createdAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    updatedAt: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
  },
]

export async function GET(request: Request) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const year = searchParams.get("year")
    const batch = searchParams.get("batch")
    const folder = searchParams.get("folder")
    const search = searchParams.get("search")

    // Apply filters if provided
    let filteredCollections = [...mockDigitalCollections]

    if (category) {
      filteredCollections = filteredCollections.filter((c) => c.category === category)
    }

    if (year) {
      const yearStart = new Date(`${year}-01-01`).toISOString()
      const yearEnd = new Date(`${Number.parseInt(year) + 1}-01-01`).toISOString()
      filteredCollections = filteredCollections.filter((c) => c.createdAt >= yearStart && c.createdAt < yearEnd)
    }

    if (batch) {
      filteredCollections = filteredCollections.filter((c) => c.batch === batch)
    }

    if (folder) {
      filteredCollections = filteredCollections.filter((c) => c.folder === folder)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCollections = filteredCollections.filter(
        (c) => c.title.toLowerCase().includes(searchLower) || c.description.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json(filteredCollections)
  } catch (error) {
    console.error("Error in digital-collection API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

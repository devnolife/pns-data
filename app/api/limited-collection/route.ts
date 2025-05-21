import { NextResponse } from "next/server"

// Mock data for limited collections
const mockLimitedCollections = [
  {
    id: "1",
    title: "CPNS Overview Guide",
    category: "CPNS",
    type: "PDF",
    description: "A general overview of the CPNS program and requirements.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Training Programs Brochure",
    category: "General",
    type: "PDF",
    description: "Information about available training programs.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Public Service Introduction",
    category: "General",
    type: "PDF",
    description: "An introduction to public service careers and opportunities.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "PKA Program Overview",
    category: "PKA",
    type: "PDF",
    description: "General information about the PKA training program.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "PKP Introduction Materials",
    category: "PKP",
    type: "PDF",
    description: "Introductory materials for the PKP program.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "PKN Program Structure",
    category: "PKN",
    type: "PDF",
    description: "Overview of the PKN program structure and modules.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: Request) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const category = searchParams.get("category")
    const year = searchParams.get("year")
    const search = searchParams.get("search")

    // If ID is provided, return a specific collection
    if (id) {
      const collection = mockLimitedCollections.find((c) => c.id === id)
      if (!collection) {
        return NextResponse.json({ error: "Collection not found" }, { status: 404 })
      }
      return NextResponse.json(collection)
    }

    // Apply filters if provided
    let filteredCollections = [...mockLimitedCollections]

    if (category) {
      filteredCollections = filteredCollections.filter((c) => c.category === category)
    }

    if (year) {
      const yearStart = new Date(`${year}-01-01`).toISOString()
      const yearEnd = new Date(`${Number.parseInt(year) + 1}-01-01`).toISOString()
      filteredCollections = filteredCollections.filter((c) => c.createdAt >= yearStart && c.createdAt < yearEnd)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCollections = filteredCollections.filter(
        (c) => c.title.toLowerCase().includes(searchLower) || c.description.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json(filteredCollections)
  } catch (error) {
    console.error("Error in limited-collection API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

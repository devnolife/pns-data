import { NextResponse } from "next/server"

// Mock data for a specific digital collection
const mockDigitalCollection = {
  id: "1",
  title: "CPNS Exam Preparation Guide",
  category: "CPNS",
  type: "PDF",
  description: "Comprehensive guide for preparing for the CPNS examination.",
  content: "This is a detailed guide that covers all aspects of the CPNS examination process...",
  folder: "CPNS Materials",
  batch: "2023",
  fileSize: "2.4 MB",
  downloadCount: 156,
  author: "Training Department",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  relatedCollections: [
    {
      id: "2",
      title: "CPNS Interview Techniques",
    },
    {
      id: "3",
      title: "CPNS Application Process",
    },
  ],
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real application, you would fetch the collection from a database
    // For now, we'll just return the mock data if the ID matches
    if (params.id === "1") {
      return NextResponse.json(mockDigitalCollection)
    }

    // If the ID doesn't match our mock data, return a 404
    return NextResponse.json({ error: "Collection not found" }, { status: 404 })
  } catch (error) {
    console.error("Error in digital-collection/[id] API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

// Mock collections database
const collections = [
  {
    id: "1",
    title: "CPNS Training Guidelines 2024",
    category: "CPNS",
    type: "PDF",
    date: "2024-05-10",
    size: "2.4 MB",
    downloads: 156,
    public: false,
  },
  {
    id: "2",
    title: "PKP Module 3: Leadership Principles",
    category: "PKP",
    type: "PDF",
    date: "2024-04-22",
    size: "5.1 MB",
    downloads: 89,
    public: false,
  },
  {
    id: "3",
    title: "PKA Presentation Templates",
    category: "PKA",
    type: "PPTX",
    date: "2024-03-15",
    size: "3.7 MB",
    downloads: 124,
    public: false,
  },
  {
    id: "4",
    title: "PKN Research Methodology",
    category: "PKN",
    type: "PDF",
    date: "2024-05-05",
    size: "4.2 MB",
    downloads: 67,
    public: false,
  },
  {
    id: "5",
    title: "CPNS Latsar Final Project Guidelines",
    category: "CPNS",
    type: "DOCX",
    date: "2024-04-30",
    size: "1.8 MB",
    downloads: 112,
    public: false,
  },
  {
    id: "6",
    title: "PKP Assessment Criteria",
    category: "PKP",
    type: "PDF",
    date: "2024-05-12",
    size: "2.9 MB",
    downloads: 45,
    public: false,
  },
  {
    id: "7",
    title: "PKA Workshop Materials",
    category: "PKA",
    type: "ZIP",
    date: "2024-04-18",
    size: "15.3 MB",
    downloads: 78,
    public: false,
  },
  {
    id: "8",
    title: "PKN Data Analysis Templates",
    category: "PKN",
    type: "XLSX",
    date: "2024-05-08",
    size: "3.2 MB",
    downloads: 56,
    public: false,
  },
  {
    id: "9",
    title: "CPNS Overview Guide",
    category: "CPNS",
    type: "PDF",
    date: "2024-05-01",
    size: "1.5 MB",
    downloads: 203,
    public: true,
  },
  {
    id: "10",
    title: "Training Programs Brochure",
    category: "General",
    type: "PDF",
    date: "2024-04-15",
    size: "2.2 MB",
    downloads: 178,
    public: true,
  },
  {
    id: "11",
    title: "Public Service Introduction",
    category: "General",
    type: "PDF",
    date: "2024-03-20",
    size: "3.0 MB",
    downloads: 145,
    public: true,
  },
]

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const publicOnly = searchParams.get("public") === "true"
  const search = searchParams.get("search")

  // Filter collections
  let filteredCollections = [...collections]

  if (publicOnly) {
    filteredCollections = filteredCollections.filter((collection) => collection.public)
  }

  if (category && category !== "all") {
    filteredCollections = filteredCollections.filter((collection) => collection.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredCollections = filteredCollections.filter(
      (collection) =>
        collection.title.toLowerCase().includes(searchLower) || collection.category.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json({
    collections: filteredCollections,
  })
}

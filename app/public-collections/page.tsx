"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/common/page-header"
import { PublicCollectionCard } from "@/components/common/public-collection-card"
import { Footer } from "@/components/common/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Loader2 } from "lucide-react"

// Mock data for development
const mockCollections = [
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

export default function PublicCollectionsPage() {
  const [collections, setCollections] = useState(mockCollections)
  const [filteredCollections, setFilteredCollections] = useState(mockCollections)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true)
      try {
        // In a production environment, uncomment this to fetch from API
        // const data = await limitedCollectionApi.getCollections()
        // setCollections(data)
        // setFilteredCollections(data)

        // Using mock data for now
        setCollections(mockCollections)
        setFilteredCollections(mockCollections)
      } catch (error) {
        console.error("Failed to fetch collections:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    let result = collections

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (collection) =>
          collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((collection) => collection.category === categoryFilter)
    }

    setFilteredCollections(result)
  }, [searchQuery, categoryFilter, collections])

  // Extract unique categories
  const categories = ["all", ...new Set(collections.map((collection) => collection.category))]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-10">
          <PageHeader heading="Public Collections" subheading="Browse our curated collection of digital resources" />

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-60 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredCollections.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center shadow-card">
              <h3 className="mb-2 text-xl font-semibold">No collections found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCollections.map((collection) => (
                <PublicCollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

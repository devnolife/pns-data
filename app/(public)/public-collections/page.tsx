"use client"

import { useState, useEffect } from "react"
import { PublicCollectionCard } from "@/components/common/public-collection-card"
import { PageHeader } from "@/components/common/page-header"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Search, Filter } from "lucide-react"
import Image from "next/image"

interface Collection {
  id: string
  title: string
  category: string
  coverImage: string
  abstract: string
  year: string
  batch: string
}

export default function PublicCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    // Mock API call to fetch public collections
    const fetchCollections = async () => {
      // In a real app, this would be a fetch call to your API
      const mockCollections: Collection[] = [
        {
          id: "1",
          title: "CPNS Training Guidelines 2024",
          category: "CPNS",
          coverImage: "/cpns-training-guidelines.png",
          abstract:
            "Comprehensive guidelines for CPNS training programs, including curriculum structure, assessment criteria, and learning objectives for new civil servants.",
          year: "2024",
          batch: "1",
        },
        {
          id: "2",
          title: "PKP Module 3: Leadership Principles",
          category: "PKP",
          coverImage: "/leadership-principles.png",
          abstract:
            "This module explores essential leadership principles for public service managers, including effective communication, team building, and strategic decision-making.",
          year: "2023",
          batch: "2",
        },
        {
          id: "3",
          title: "PKA Presentation Templates",
          category: "PKA",
          coverImage: "/placeholder-mxzy1.png",
          abstract:
            "Standardized presentation templates for PKA participants, designed to ensure consistency and professionalism in all official presentations.",
          year: "2023",
          batch: "3",
        },
        {
          id: "4",
          title: "PKN Research Methodology",
          category: "PKN",
          coverImage: "/placeholder.svg?height=400&width=300&query=Research%20Methodology",
          abstract:
            "A comprehensive guide to research methodologies for PKN participants, covering qualitative and quantitative approaches, data collection techniques, and analysis methods.",
          year: "2024",
          batch: "1",
        },
        {
          id: "5",
          title: "CPNS Latsar Final Project Guidelines",
          category: "CPNS",
          coverImage: "/placeholder.svg?height=400&width=300&query=Final%20Project%20Guidelines",
          abstract:
            "Guidelines for CPNS Latsar participants on preparing and submitting their final projects, including format requirements, evaluation criteria, and submission procedures.",
          year: "2023",
          batch: "4",
        },
        {
          id: "6",
          title: "PKP Assessment Criteria",
          category: "PKP",
          coverImage: "/placeholder.svg?height=400&width=300&query=Assessment%20Criteria",
          abstract:
            "Detailed assessment criteria for PKP program participants, outlining performance indicators, evaluation methods, and certification requirements.",
          year: "2024",
          batch: "2",
        },
        {
          id: "7",
          title: "PKA Workshop Materials",
          category: "PKA",
          coverImage: "/placeholder.svg?height=400&width=300&query=Workshop%20Materials",
          abstract:
            "Comprehensive workshop materials for PKA participants, including exercises, case studies, and practical applications of public administration principles.",
          year: "2022",
          batch: "5",
        },
        {
          id: "8",
          title: "PKN Data Analysis Templates",
          category: "PKN",
          coverImage: "/placeholder.svg?height=400&width=300&query=Data%20Analysis%20Templates",
          abstract:
            "Standardized templates for data analysis in PKN research projects, designed to facilitate consistent and accurate analysis of research findings.",
          year: "2023",
          batch: "2",
        },
        {
          id: "9",
          title: "Public Service Introduction",
          category: "General",
          coverImage: "/placeholder.svg?height=400&width=300&query=Public%20Service%20Introduction",
          abstract:
            "An introduction to public service principles and practices for new civil servants, covering ethical standards, service delivery, and professional conduct.",
          year: "2024",
          batch: "1",
        },
      ]

      setCollections(mockCollections)
      setFilteredCollections(mockCollections)
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    // Filter collections based on search term and category
    let filtered = collections

    if (categoryFilter !== "all") {
      filtered = filtered.filter((collection) => collection.category === categoryFilter)
    }

    if (yearFilter !== "all") {
      filtered = filtered.filter((collection) => collection.year === yearFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter((collection) => collection.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredCollections(filtered)
  }, [searchTerm, categoryFilter, yearFilter, collections])

  const handleViewCollection = (id: string) => {
    const collection = collections.find((c) => c.id === id)
    if (collection) {
      setSelectedCollection(collection)
      setDialogOpen(true)
    }
  }

  // Extract unique years for the filter
  const years = Array.from(new Set(collections.map((collection) => collection.year))).sort((a, b) => b.localeCompare(a))

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <PageHeader
        heading="Public Digital Collections"
        text="Browse our collection of publicly available documents and resources"
      />

      <div className="flex flex-col md:flex-row gap-4 my-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search collections..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="CPNS">CPNS</SelectItem>
              <SelectItem value="PKP">PKP</SelectItem>
              <SelectItem value="PKA">PKA</SelectItem>
              <SelectItem value="PKN">PKN</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredCollections.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No collections found matching your criteria.</p>
          </div>
        ) : (
          filteredCollections.map((collection) => (
            <PublicCollectionCard key={collection.id} collection={collection} onViewClick={handleViewCollection} />
          ))
        )}
      </div>

      {selectedCollection && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedCollection.title}</DialogTitle>
              <DialogDescription>
                {selectedCollection.category} • {selectedCollection.year} • Batch {selectedCollection.batch}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={selectedCollection.coverImage || "/placeholder.svg"}
                  alt={selectedCollection.title}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Abstract</h3>
                <p className="text-gray-700">{selectedCollection.abstract}</p>
                <div className="mt-6">
                  <p className="text-sm text-gray-500 italic">
                    Note: Full document access is restricted to registered users. Please login or register to access the
                    complete document.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

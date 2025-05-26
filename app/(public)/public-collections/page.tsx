"use client"

import { useState, useEffect } from "react"
import { PublicCollectionCard } from "@/components/common/public-collection-card"
import { PageHeader } from "@/components/common/page-header"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Search, Filter } from "lucide-react"
import Image from "next/image"
import { t } from "@/lib/i18n"

interface Collection {
  id: string
  title: string
  category: string
  coverImage: string
  abstract: string
  year: string
  batch: string
  type: string
  description: string
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
          title: t("collections.mockData.cpnsTraining.title"),
          category: "CPNS",
          coverImage: "/cpns-training-guidelines.png",
          abstract: t("collections.mockData.cpnsTraining.abstract"),
          description: t("collections.mockData.cpnsTraining.abstract"),
          type: "PDF",
          year: "2024",
          batch: "1",
        },
        {
          id: "2",
          title: t("collections.mockData.pkpLeadership.title"),
          category: "PKP",
          coverImage: "/leadership-principles.png",
          abstract: t("collections.mockData.pkpLeadership.abstract"),
          description: t("collections.mockData.pkpLeadership.abstract"),
          type: "PDF",
          year: "2023",
          batch: "2",
        },
        {
          id: "3",
          title: t("collections.mockData.pkaTemplates.title"),
          category: "PKA",
          coverImage: "/placeholder-mxzy1.png",
          abstract: t("collections.mockData.pkaTemplates.abstract"),
          description: t("collections.mockData.pkaTemplates.abstract"),
          type: "PDF",
          year: "2023",
          batch: "3",
        },
        {
          id: "4",
          title: t("collections.mockData.pknMethodology.title"),
          category: "PKN",
          coverImage: "/placeholder.svg?height=400&width=300&query=Research%20Methodology",
          abstract: t("collections.mockData.pknMethodology.abstract"),
          description: t("collections.mockData.pknMethodology.abstract"),
          type: "PDF",
          year: "2024",
          batch: "1",
        },
        {
          id: "5",
          title: t("collections.mockData.cpnsLatsar.title"),
          category: "CPNS",
          coverImage: "/placeholder.svg?height=400&width=300&query=Final%20Project%20Guidelines",
          abstract: t("collections.mockData.cpnsLatsar.abstract"),
          description: t("collections.mockData.cpnsLatsar.abstract"),
          type: "PDF",
          year: "2023",
          batch: "4",
        },
        {
          id: "6",
          title: t("collections.mockData.pkpAssessment.title"),
          category: "PKP",
          coverImage: "/placeholder.svg?height=400&width=300&query=Assessment%20Criteria",
          abstract: t("collections.mockData.pkpAssessment.abstract"),
          description: t("collections.mockData.pkpAssessment.abstract"),
          type: "PDF",
          year: "2024",
          batch: "2",
        },
        {
          id: "7",
          title: t("collections.mockData.pkaWorkshop.title"),
          category: "PKA",
          coverImage: "/placeholder.svg?height=400&width=300&query=Workshop%20Materials",
          abstract: t("collections.mockData.pkaWorkshop.abstract"),
          description: t("collections.mockData.pkaWorkshop.abstract"),
          type: "PDF",
          year: "2022",
          batch: "5",
        },
        {
          id: "8",
          title: t("collections.mockData.pknTemplates.title"),
          category: "PKN",
          coverImage: "/placeholder.svg?height=400&width=300&query=Data%20Analysis%20Templates",
          abstract: t("collections.mockData.pknTemplates.abstract"),
          description: t("collections.mockData.pknTemplates.abstract"),
          type: "PDF",
          year: "2023",
          batch: "2",
        },
        {
          id: "9",
          title: t("collections.mockData.publicService.title"),
          category: "General",
          coverImage: "/placeholder.svg?height=400&width=300&query=Public%20Service%20Introduction",
          abstract: t("collections.mockData.publicService.abstract"),
          description: t("collections.mockData.publicService.abstract"),
          type: "PDF",
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
        heading={t("collections.pageTitle")}
        subheading={t("collections.pageDescription")}
      />

      <div className="flex flex-col md:flex-row gap-4 my-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t("collections.filters.searchPlaceholder")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t("collections.filters.byCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("collections.filters.allCategories")}</SelectItem>
              <SelectItem value="CPNS">{t("collections.categories.CPNS")}</SelectItem>
              <SelectItem value="PKP">{t("collections.categories.PKP")}</SelectItem>
              <SelectItem value="PKA">{t("collections.categories.PKA")}</SelectItem>
              <SelectItem value="PKN">{t("collections.categories.PKN")}</SelectItem>
              <SelectItem value="General">{t("collections.categories.General")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t("collections.filters.byYear")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("collections.filters.allYears")}</SelectItem>
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
            <p className="text-gray-500">{t("collections.filters.noResults")}</p>
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
                {t(`collections.categories.${selectedCollection.category}`)} • {selectedCollection.year} • {t("collections.labels.batch")} {selectedCollection.batch}
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
                <h3 className="text-lg font-semibold mb-2">{t("collections.labels.abstract")}</h3>
                <p className="text-gray-700">{selectedCollection.abstract}</p>
                <div className="mt-6">
                  <p className="text-sm text-gray-500 italic">
                    {t("auth.loginNote")}
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

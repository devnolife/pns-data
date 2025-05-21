"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Collection = {
  id: string
  title: string
  category: string
  type: string
  date: string
  size: string
  downloads: number
}

export default function CollectionsPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [collections, setCollections] = useState<Collection[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([])
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    // Mock API call to fetch collections
    const fetchCollections = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        const mockCollections: Collection[] = [
          {
            id: "1",
            title: "CPNS Training Guidelines 2024",
            category: "CPNS",
            type: "PDF",
            date: "2024-05-10",
            size: "2.4 MB",
            downloads: 156,
          },
          {
            id: "2",
            title: "PKP Module 3: Leadership Principles",
            category: "PKP",
            type: "PDF",
            date: "2024-04-22",
            size: "5.1 MB",
            downloads: 89,
          },
          {
            id: "3",
            title: "PKA Presentation Templates",
            category: "PKA",
            type: "PPTX",
            date: "2024-03-15",
            size: "3.7 MB",
            downloads: 124,
          },
          {
            id: "4",
            title: "PKN Research Methodology",
            category: "PKN",
            type: "PDF",
            date: "2024-05-05",
            size: "4.2 MB",
            downloads: 67,
          },
          {
            id: "5",
            title: "CPNS Latsar Final Project Guidelines",
            category: "CPNS",
            type: "DOCX",
            date: "2024-04-30",
            size: "1.8 MB",
            downloads: 112,
          },
          {
            id: "6",
            title: "PKP Assessment Criteria",
            category: "PKP",
            type: "PDF",
            date: "2024-05-12",
            size: "2.9 MB",
            downloads: 45,
          },
          {
            id: "7",
            title: "PKA Workshop Materials",
            category: "PKA",
            type: "ZIP",
            date: "2024-04-18",
            size: "15.3 MB",
            downloads: 78,
          },
          {
            id: "8",
            title: "PKN Data Analysis Templates",
            category: "PKN",
            type: "XLSX",
            date: "2024-05-08",
            size: "3.2 MB",
            downloads: 56,
          },
        ]

        setCollections(mockCollections)
        setFilteredCollections(mockCollections)
      } catch (error) {
        console.error("Error fetching collections:", error)
      }
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    // Filter collections based on search term and category
    let filtered = collections

    if (categoryFilter !== "all") {
      filtered = filtered.filter((collection) => collection.category === categoryFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter((collection) => collection.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredCollections(filtered)
  }, [searchTerm, categoryFilter, collections])

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CPNS":
        return "bg-blue-100 text-blue-800"
      case "PKP":
        return "bg-green-100 text-green-800"
      case "PKA":
        return "bg-purple-100 text-purple-800"
      case "PKN":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileTypeIcon = (type: string) => {
    return <FileText className="h-5 w-5" />
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Digital Collections</h1>
          <p className="text-gray-600 mt-1">Browse and access all available digital collections</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
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
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              Showing {filteredCollections.length} of {collections.length} collections
            </div>
          </div>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getCategoryColor(collection.category)}>{collection.category}</Badge>
                      <Badge variant="outline">{collection.type}</Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">{collection.title}</CardTitle>
                    <CardDescription>Added on {new Date(collection.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Size: {collection.size}</span>
                      <span className="mx-2">•</span>
                      <span>Downloads: {collection.downloads}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Size</th>
                        <th className="text-left p-4">Downloads</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCollections.map((collection) => (
                        <tr key={collection.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center">
                              {getFileTypeIcon(collection.type)}
                              <span className="ml-2 font-medium">{collection.title}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getCategoryColor(collection.category)}>{collection.category}</Badge>
                          </td>
                          <td className="p-4">{collection.type}</td>
                          <td className="p-4">{new Date(collection.date).toLocaleDateString()}</td>
                          <td className="p-4">{collection.size}</td>
                          <td className="p-4">{collection.downloads}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

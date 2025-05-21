"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye } from "lucide-react"

type PublicCollection = {
  id: string
  title: string
  category: string
  type: string
  description: string
}

export default function PublicCollections() {
  const [collections, setCollections] = useState<PublicCollection[]>([])

  useEffect(() => {
    // Mock API call to fetch public collections
    const fetchPublicCollections = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        const mockCollections: PublicCollection[] = [
          {
            id: "1",
            title: "CPNS Overview Guide",
            category: "CPNS",
            type: "PDF",
            description: "A general overview of the CPNS program and requirements.",
          },
          {
            id: "2",
            title: "Training Programs Brochure",
            category: "General",
            type: "PDF",
            description: "Information about available training programs.",
          },
          {
            id: "3",
            title: "Public Service Introduction",
            category: "General",
            type: "PDF",
            description: "An introduction to public service careers and opportunities.",
          },
        ]

        setCollections(mockCollections)
      } catch (error) {
        console.error("Error fetching public collections:", error)
      }
    }

    fetchPublicCollections()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CPNS":
        return "bg-blue-100 text-blue-800"
      case "General":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {collections.map((collection) => (
        <Card key={collection.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{collection.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{collection.description}</p>
                  </div>
                  <Badge className={getCategoryColor(collection.category)}>{collection.category}</Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center pt-2">
        <Button variant="link">Login to access more collections →</Button>
      </div>
    </div>
  )
}

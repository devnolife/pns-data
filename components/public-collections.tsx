"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye } from "lucide-react"
import { t } from "@/lib/i18n"

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
            title: t("collections.mockData.cpnsOverview.title"),
            category: "CPNS",
            type: "PDF",
            description: t("collections.mockData.cpnsOverview.description"),
          },
          {
            id: "2",
            title: t("collections.mockData.trainingPrograms.title"),
            category: "General",
            type: "PDF",
            description: t("collections.mockData.trainingPrograms.description"),
          },
          {
            id: "3",
            title: t("collections.mockData.publicService.title"),
            category: "General",
            type: "PDF",
            description: t("collections.mockData.publicService.description"),
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

  const getTranslatedCategory = (category: string) => {
    return t(`collections.categories.${category}`)
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
                  <Badge className={getCategoryColor(collection.category)}>
                    {getTranslatedCategory(collection.category)}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    {t("common.preview")}
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    {t("common.download")}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center pt-2">
        <Button variant="link">{t("auth.loginToAccess")} →</Button>
      </div>
    </div>
  )
}

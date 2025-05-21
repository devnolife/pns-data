import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Download, Eye } from "lucide-react"

interface CollectionCardProps {
  collection: {
    id: string
    title: string
    category: string
    type: string
    date: string
    size: string
    downloads: number
  }
}

export function CollectionCard({ collection }: CollectionCardProps) {
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

  return (
    <Card className="overflow-hidden">
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
  )
}

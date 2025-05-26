import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { t } from "@/lib/i18n"

type PublicCollectionProps = {
  collection: {
    id: string
    title: string
    category: string
    type: string
    description: string
    createdAt?: string
    updatedAt?: string
  }
  onViewClick: (id: string) => void
}

export function PublicCollectionCard({ collection, onViewClick }: PublicCollectionProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CPNS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "PKA":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "PKP":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "PKN":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "General":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-6 w-6 text-primary" />
      default:
        return <FileText className="h-6 w-6 text-primary" />
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {getTypeIcon(collection.type)}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{collection.title}</h3>
              <Badge className={getCategoryColor(collection.category)}>
                {t(`collections.categories.${collection.category}`)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{collection.description}</p>
            {collection.updatedAt && (
              <p className="text-xs text-muted-foreground">
                {t("collections.labels.updated")}: {formatDate(collection.updatedAt)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t bg-muted/50 px-6 py-3">
        <Button variant="outline" size="sm" onClick={() => onViewClick(collection.id)}>
          <Eye className="mr-1 h-4 w-4" />
          {t("common.preview")}
        </Button>
      </CardFooter>
    </Card>
  )
}

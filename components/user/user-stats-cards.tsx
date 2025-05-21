import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Clock } from "lucide-react"

interface UserStatsCardsProps {
  totalCollections: number
  reportsUploaded: number
  lastLogin: string
  trainingInfo?: {
    program: string
    class: string
  }
}

export function UserStatsCards({ totalCollections, reportsUploaded, lastLogin, trainingInfo }: UserStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-2xl font-bold">{totalCollections}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Reports Uploaded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Upload className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold">{reportsUploaded}</span>
          </div>
        </CardContent>
      </Card>

      {trainingInfo ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Training Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingInfo.program}</div>
            <div className="text-sm text-gray-500">Class: {trainingInfo.class}</div>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Last Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-lg font-medium">{lastLogin}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

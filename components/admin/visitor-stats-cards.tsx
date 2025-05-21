import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock } from "lucide-react"

interface VisitorStatsCardsProps {
  totalVisitors: number
  uniqueVisitors: number
  guestbookEntries: number
  avgSessionDuration: string
}

export function VisitorStatsCards({
  totalVisitors,
  uniqueVisitors,
  guestbookEntries,
  avgSessionDuration,
}: VisitorStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-2xl font-bold">{totalVisitors}</span>
            <span className="ml-2 text-xs text-green-500">+12% ↑</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Unique Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-2xl font-bold">{uniqueVisitors}</span>
            <span className="ml-2 text-xs text-green-500">+8% ↑</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Guestbook Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold">{guestbookEntries}</span>
            <span className="ml-2 text-xs text-green-500">+15% ↑</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Avg. Session Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-2xl font-bold">{avgSessionDuration}</span>
            <span className="ml-2 text-xs text-green-500">+5% ↑</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
        </CardContent>
      </Card>
    </div>
  )
}

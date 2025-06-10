import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, BookOpen } from "lucide-react"

interface ReportItem {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  created_at: Date
}

interface ReportCardProps {
  report: ReportItem
  index: number
  onClick: (report: ReportItem) => void
}

export function ReportCard({ report, index, onClick }: ReportCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className="group overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl hover:scale-105 hover:-translate-y-2"
        onClick={() => onClick(report)}
      >
        <CardHeader className="pb-4 p-6 relative">
          {/* Cover Image */}
          <div className="mb-4">
            {report.cover_image_url ? (
              <img
                src={report.cover_image_url}
                alt={`Cover of ${report.title}`}
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-bold leading-tight text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                {report.title}
              </CardTitle>
              <CardDescription className="text-sm mt-2 text-gray-600">
                {new Date(report.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-6 pb-6">
          <p className="text-xs text-gray-500 line-clamp-3 mb-4">
            {report.description || 'Deskripsi tidak tersedia'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-600 font-medium">
                Laporan Publik
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-full px-3 py-1 text-xs font-bold">
              View
            </Badge>
          </div>
        </CardContent>
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl" />
      </Card>
    </motion.div>
  )
} 

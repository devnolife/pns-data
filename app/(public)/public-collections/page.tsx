"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  FolderOpen,
  FileText,
  Search,
  ArrowLeft,
  Calendar,
  Users,
  BookOpen,
  Eye,
  Sparkles,
  Star,
  Zap,
  Download,
  User,
  AlertCircle,
  Clock
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getPublicReports, generatePDFViewToken } from "@/lib/actions/reports"
import { usePublicAccess } from "@/hooks/use-public-access"
import { ModernLoadingState } from "@/components/common/loading-state"
import { ModernErrorState } from "@/components/common/error-state"
import { AccessDenied } from "@/components/common/access-denied"
import { ReportCard } from "@/components/common/report-card"

interface ReportItem {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  created_at: Date
}

interface PDFViewerState {
  reportId: string | null
  token: string | null
  expiryTime: number | null
}

export default function PublicCollectionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [reports, setReports] = useState<ReportItem[]>([])
  const [reportsLoading, setReportsLoading] = useState(true)
  const [reportsError, setReportsError] = useState<string | null>(null)
  const [pdfViewer, setPdfViewer] = useState<PDFViewerState>({
    reportId: null,
    token: null,
    expiryTime: null
  })

  // Use centralized access control
  const { hasAccess, isLoading: accessLoading, error: accessError, refresh: refreshAccess } = usePublicAccess()

  // Fetch reports data from the database
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setReportsLoading(true)
        setReportsError(null)
        const result = await getPublicReports()

        if (result.error) {
          setReportsError(result.error)
        } else if (result.success && result.data) {
          setReports(result.data)
        }
      } catch (err) {
        setReportsError('Failed to load reports')
        console.error('Error fetching reports:', err)
      } finally {
        setReportsLoading(false)
      }
    }

    fetchReports()
  }, [])

  const handleReportClick = (report: ReportItem) => {
    setSelectedReport(report)
    setDialogOpen(true)
  }

  const handleViewPDF = async (reportId: string) => {
    try {
      const tokenResult = await generatePDFViewToken(reportId)
      if (tokenResult.success) {
        setPdfViewer({
          reportId,
          token: tokenResult.token!,
          expiryTime: tokenResult.expiryTime!
        })
        // Open PDF viewer in new window/modal
        window.open(`/pdf-viewer?token=${tokenResult.token}&reportId=${reportId}`, '_blank')
      } else {
        setError('Gagal membuat akses PDF')
      }
    } catch (error) {
      console.error('Error generating PDF view token:', error)
      setReportsError('Gagal mengakses PDF')
    }
  }

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Loading state
  if (accessLoading || reportsLoading) {
    return <ModernLoadingState message="Loading amazing content..." />
  }

  // Error state
  if (reportsError) {
    return (
      <ModernErrorState
        message={reportsError}
        onRetry={() => {
          setReportsError(null)
          setReportsLoading(true)
          // Re-fetch reports
          getPublicReports().then(result => {
            if (result.error) {
              setReportsError(result.error)
            } else if (result.success && result.data) {
              setReports(result.data)
            }
          }).finally(() => setReportsLoading(false))
        }}
      />
    )
  }

  // Access denied state
  if (!hasAccess) {
    const previewItems = reports.slice(0, 4).map(report => ({
      id: report.id,
      title: report.title
    }))

    return <AccessDenied previewItems={previewItems} />
  }
  // Main content with access and modern design
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header with Gen Z vibes */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Koleksi Laporan Publik ✨
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Jelajahi koleksi laporan terbaik yang absolutely amazing! 🚀
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
          <Input
            placeholder="Cari laporan yang epic... 🔍"
            className="pl-12 pr-6 py-4 text-lg bg-white/70 backdrop-blur-md border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <Card className="text-center py-16 bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
          <CardContent className="p-8">
            <div className="text-gray-400 mb-6">
              <div className="relative inline-block">
                <FileText className="h-20 w-20 mx-auto" />
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😢</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Tidak ada laporan ditemukan</h3>
            <p className="text-gray-500 text-lg">Coba ubah kata kunci pencarian! ✨</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <ReportCard
              key={report.id}
              report={report}
              index={index}
              onClick={handleReportClick}
            />
          ))}
        </div>
      )}

      {/* Report Detail Dialog */}
      {selectedReport && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white/90 backdrop-blur-md border-0 rounded-3xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-bold text-gray-800 leading-tight">
                    {selectedReport.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 text-sm mt-1">
                    Dipublikasikan pada {new Date(selectedReport.created_at).toLocaleDateString('id-ID')} ✨
                  </DialogDescription>
                </div>
                <div className="flex gap-1">
                  <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <Sparkles className="h-5 w-5 text-pink-400 animate-bounce" />
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Cover Image in Dialog */}
              {selectedReport.cover_image_url && (
                <div className="mb-4">
                  <img
                    src={selectedReport.cover_image_url}
                    alt={`Cover of ${selectedReport.title}`}
                    className="w-full max-h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              <div className="p-4 rounded-xl border bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <h3 className="font-bold mb-2 text-base flex items-center gap-2 text-purple-800">
                  <BookOpen className="h-4 w-4" />
                  Deskripsi Laporan 📖
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {selectedReport.description || 'Deskripsi tidak tersedia untuk laporan ini.'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="font-bold text-gray-800 text-base">Laporan PDF 📄</p>
                      <p className="text-xs text-gray-600">
                        Laporan terverifikasi dan dipublikasikan
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => handleViewPDF(selectedReport.id)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Lihat PDF 🚀
                    </Button>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <p className="text-xs text-blue-800 font-bold">
                      Akses PDF Terbatas Waktu ⏰
                    </p>
                  </div>
                  <p className="text-xs text-blue-700">
                    Akses PDF berlaku selama 6 jam. Tidak dapat diunduh atau dicetak. Stay respectful! 😎
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

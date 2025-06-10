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
  Clock,
  ChevronRight,
  Home,
  Folder
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { generatePDFViewToken, getPublicReportsHierarchicalAction, getPublicReportsByAngkatanAction } from "@/lib/actions/reports"
import { usePublicAccess } from "@/hooks/use-public-access"
import { ModernLoadingState } from "@/components/common/loading-state"
import { ModernErrorState } from "@/components/common/error-state"
import { AccessDenied } from "@/components/common/access-denied"

interface ReportItem {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  created_at: Date
  author?: {
    name: string
    username: string
  }
  files?: any[]
}

interface AngkatanData {
  id: string
  angkatan: string
  reports: ReportItem[]
  totalReports: number
}

interface YearData {
  id: string
  year: string
  angkatan: AngkatanData[]
  totalReports: number
}

interface CategoryData {
  id: string
  name: string
  description: string
  years: YearData[]
  totalReports: number
}

type ViewMode = 'categories' | 'years' | 'angkatan' | 'reports'

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

  // Navigation state
  const [viewMode, setViewMode] = useState<ViewMode>('categories')
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
  const [selectedYear, setSelectedYear] = useState<YearData | null>(null)
  const [selectedAngkatan, setSelectedAngkatan] = useState<AngkatanData | null>(null)
  const [reports, setReports] = useState<ReportItem[]>([])

  // Loading states
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [reportsLoading, setReportsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [pdfViewer, setPdfViewer] = useState<PDFViewerState>({
    reportId: null,
    token: null,
    expiryTime: null
  })

  // Use centralized access control
  const { hasAccess, isLoading: accessLoading, error: accessError, refresh: refreshAccess } = usePublicAccess()

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true)
        setError(null)
        const result = await getPublicReportsHierarchicalAction()

        if (result.success && result.data) {
          setCategories(result.data.categories)
        } else {
          setError(result.error || 'Failed to load categories')
        }
      } catch (err) {
        setError('Failed to load categories')
        console.error('Error loading categories:', err)
      } finally {
        setCategoriesLoading(false)
      }
    }

    if (hasAccess) {
      loadCategories()
    }
  }, [hasAccess])

  // Load reports for specific angkatan
  const loadReports = async (category: string, year: string, angkatan: string) => {
    try {
      setReportsLoading(true)
      setError(null)
      const result = await getPublicReportsByAngkatanAction(category, year, angkatan)

      if (result.success && result.data) {
        setReports(result.data.reports)
      } else {
        setError(result.error || 'Failed to load reports')
      }
    } catch (err) {
      setError('Failed to load reports')
      console.error('Error loading reports:', err)
    } finally {
      setReportsLoading(false)
    }
  }

  // Navigation handlers
  const handleCategorySelect = (category: CategoryData) => {
    setSelectedCategory(category)
    setSelectedYear(null)
    setSelectedAngkatan(null)
    setViewMode('years')
  }

  const handleYearSelect = (year: YearData) => {
    setSelectedYear(year)
    setSelectedAngkatan(null)
    setViewMode('angkatan')
  }

  const handleAngkatanSelect = async (angkatan: AngkatanData) => {
    setSelectedAngkatan(angkatan)
    setViewMode('reports')
    if (selectedCategory && selectedYear) {
      await loadReports(selectedCategory.id, selectedYear.year, angkatan.angkatan)
    }
  }

  const handleBackNavigation = () => {
    if (viewMode === 'reports') {
      setViewMode('angkatan')
      setSelectedAngkatan(null)
    } else if (viewMode === 'angkatan') {
      setViewMode('years')
      setSelectedYear(null)
    } else if (viewMode === 'years') {
      setViewMode('categories')
      setSelectedCategory(null)
    }
  }

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
        window.open(`/pdf-viewer?token=${tokenResult.token}&reportId=${reportId}`, '_blank')
      } else {
        setError('Gagal membuat akses PDF')
      }
    } catch (error) {
      console.error('Error generating PDF view token:', error)
      setError('Gagal mengakses PDF')
    }
  }

  // Filter function for search
  const getFilteredItems = () => {
    if (!searchTerm) return null

    switch (viewMode) {
      case 'categories':
        return categories.filter(cat =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      case 'years':
        return selectedCategory?.years.filter(year =>
          year.year.includes(searchTerm)
        )
      case 'angkatan':
        return selectedYear?.angkatan.filter(ang =>
          ang.angkatan.toLowerCase().includes(searchTerm.toLowerCase())
        )
      case 'reports':
        return reports.filter(report =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      default:
        return null
    }
  }

  // Loading state
  if (accessLoading || categoriesLoading) {
    return <ModernLoadingState message="Loading amazing content..." />
  }

  // Error state
  if (error) {
    return (
      <ModernErrorState
        message={error}
        onRetry={() => {
          setError(null)
          if (viewMode === 'categories') {
            setCategoriesLoading(true)
            getPublicReportsHierarchicalAction().then(result => {
              if (result.success && result.data) {
                setCategories(result.data.categories)
              } else {
                setError(result.error || 'Failed to load categories')
              }
            }).finally(() => setCategoriesLoading(false))
          }
        }}
      />
    )
  }

  // Access denied state
  if (!hasAccess) {
    const previewItems = categories.slice(0, 4).map(cat => ({
      id: cat.id,
      title: cat.name
    }))

    return <AccessDenied previewItems={previewItems} />
  }

  // Get current items to display
  const filteredItems = getFilteredItems()
  const currentItems = filteredItems || (() => {
    switch (viewMode) {
      case 'categories':
        return categories
      case 'years':
        return selectedCategory?.years || []
      case 'angkatan':
        return selectedYear?.angkatan || []
      case 'reports':
        return reports
      default:
        return []
    }
  })()

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className="mb-8">
      <div className="flex items-center space-x-2 text-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setViewMode('categories')
            setSelectedCategory(null)
            setSelectedYear(null)
            setSelectedAngkatan(null)
          }}
          className="h-8 px-3 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all duration-200"
        >
          <Home className="h-3 w-3 mr-1" />
          Beranda
        </Button>

        {selectedCategory && (
          <>
            <ChevronRight className="h-4 w-4 text-purple-400" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setViewMode('years')
                setSelectedYear(null)
                setSelectedAngkatan(null)
              }}
              className="h-8 px-3 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all duration-200"
            >
              <Folder className="h-3 w-3 mr-1" />
              {selectedCategory.name}
            </Button>
          </>
        )}

        {selectedYear && (
          <>
            <ChevronRight className="h-4 w-4 text-purple-400" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setViewMode('angkatan')
                setSelectedAngkatan(null)
              }}
              className="h-8 px-3 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all duration-200"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Tahun {selectedYear.year}
            </Button>
          </>
        )}

        {selectedAngkatan && (
          <>
            <ChevronRight className="h-4 w-4 text-purple-400" />
            <span className="h-8 px-3 bg-purple-100 text-purple-800 rounded-full flex items-center text-xs font-medium">
              <Users className="h-3 w-3 mr-1" />
              Angkatan {selectedAngkatan.angkatan}
            </span>
          </>
        )}
      </div>
    </div>
  )

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

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Back Button */}
      {viewMode !== 'categories' && (
        <div className="mb-6">
          <Button
            onClick={handleBackNavigation}
            className="bg-white/70 backdrop-blur-md border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-purple-700 hover:text-purple-800"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
          <Input
            placeholder="Cari yang epic... 🔍"
            className="pl-12 pr-6 py-4 text-lg bg-white/70 backdrop-blur-md border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {reportsLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat laporan...</p>
            </div>
          </motion.div>
        ) : currentItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center py-16 bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-8">
                <div className="text-gray-400 mb-6">
                  <div className="relative inline-block">
                    <FileText className="h-20 w-20 mx-auto" />
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😢</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {searchTerm ? 'Tidak ada hasil ditemukan' : 'Belum ada data'}
                </h3>
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'Coba ubah kata kunci pencarian! ✨' : 'Data akan muncul setelah ada laporan yang diverifikasi'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Categories View */}
            {viewMode === 'categories' && currentItems.map((category: CategoryData, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-105"
                  onClick={() => handleCategorySelect(category)}
                >
                  <CardHeader className="pb-3 p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center shadow-lg">
                        <FolderOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600">{category.totalReports} laporan</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        {category.years.length} tahun
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Years View */}
            {viewMode === 'years' && currentItems.map((year: YearData, index) => (
              <motion.div
                key={year.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-105"
                  onClick={() => handleYearSelect(year)}
                >
                  <CardHeader className="pb-3 p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 flex items-center justify-center shadow-lg">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                          Tahun {year.year}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1">
                          Laporan pelatihan tahun {year.year}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{year.totalReports} laporan</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        {year.angkatan.length} angkatan
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Angkatan View */}
            {viewMode === 'angkatan' && currentItems.map((angkatan: AngkatanData, index) => (
              <motion.div
                key={angkatan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-105"
                  onClick={() => handleAngkatanSelect(angkatan)}
                >
                  <CardHeader className="pb-3 p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          Angkatan {angkatan.angkatan}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1">
                          Laporan dari angkatan {angkatan.angkatan}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600">{angkatan.totalReports} laporan</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                        Lihat Semua
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Reports View */}
            {viewMode === 'reports' && currentItems.map((report: ReportItem, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-105"
                  onClick={() => handleReportClick(report)}
                >
                  {report.cover_image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={report.cover_image_url}
                        alt={`Cover of ${report.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3 p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-lg flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {report.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {report.description || 'Tidak ada deskripsi'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600 truncate">
                          {report.author?.name || 'Anonymous'}
                        </span>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {report.files?.length || 0} file
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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

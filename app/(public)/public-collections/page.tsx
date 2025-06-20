"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FolderOpen,
  FileText,
  Search,
  ArrowLeft,
  Calendar,
  Users,
  BookOpen,
  User,
  ChevronRight,
  Home,
  Folder
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getPublicReportsHierarchicalAction, getPublicReportsByAngkatanAction } from "@/lib/actions/reports"
import { usePublicAccess } from "@/hooks/use-public-access"
import { ModernLoadingState } from "@/components/common/loading-state"
import { ModernErrorState } from "@/components/common/error-state"
import { AccessDenied } from "@/components/common/access-denied"

interface ReportItem {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  category?: string | null
  created_at: Date
  author?: {
    name: string | null
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

export default function PublicCollectionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

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
        // Ensure files are included in the report data
        const reportsWithFiles = result.data.reports.map(report => ({
          ...report,
          files: report.files || [] // Ensure files array exists
        }))
        setReports(reportsWithFiles as ReportItem[])
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
    // Navigate to detail page instead of opening dialog
    router.push(`/public-collections/${report.id}`)
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
                  {searchTerm ? 'Tidak ada hasil ditemukan' : 'Belum ada laporan terverifikasi'}
                </h3>
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'Coba ubah kata kunci pencarian! ✨' : 'Laporan akan muncul di sini setelah diverifikasi dan memiliki file PDF yang valid. Silakan cek kembali nanti! 🚀'}
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
            {viewMode === 'categories' && (currentItems as CategoryData[]).map((category, index) => (
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
            {viewMode === 'years' && (currentItems as YearData[]).map((year, index) => (
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
            {viewMode === 'angkatan' && (currentItems as AngkatanData[]).map((angkatan, index) => (
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
            {viewMode === 'reports' && (currentItems as ReportItem[]).map((report, index) => (
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
                  {/* Enhanced Cover Image with Fallback */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative">
                    {report.cover_image_url ? (
                      <img
                        src={report.cover_image_url}
                        alt={`Cover of ${report.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Try fallback URLs if original fails
                          const img = e.currentTarget
                          if (!img.dataset.retryCount) {
                            img.dataset.retryCount = '1'
                            // Try with different potential paths
                            const reportYear = new Date(report.created_at).getFullYear()
                            img.src = `/uploads/covers/${reportYear}/${img.src.split('/').pop()}`
                          } else if (img.dataset.retryCount === '1') {
                            img.dataset.retryCount = '2'
                            // Try placeholder image
                            img.src = '/placeholder-cover.svg'
                          } else {
                            // Final fallback - hide image and show text
                            img.style.display = 'none'
                            const fallback = img.parentElement?.querySelector('.fallback-cover') as HTMLElement
                            if (fallback) fallback.classList.remove('hidden')
                          }
                        }}
                      />
                    ) : null}
                    {/* Fallback when no cover image */}
                    <div className={`fallback-cover absolute inset-0 ${report.cover_image_url ? 'hidden' : ''} w-full h-full flex items-center justify-center text-center p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100`}>
                      <div>
                        <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-3 animate-pulse" />
                        <div className="text-sm font-semibold text-purple-700 mb-1 line-clamp-2">
                          {report.title.length > 40 ? report.title.substring(0, 40) + '...' : report.title}
                        </div>
                        <div className="text-xs text-purple-500 uppercase tracking-wide">
                          {report.category || 'LAPORAN'}
                        </div>
                      </div>
                    </div>
                    {/* Decorative overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
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
    </div>
  )
}

"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import {
  Search,
  FileText,
  Calendar,
  User,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Users,
  Eye,
  Clock,
  ChevronRight,
  Folder,
  Home
} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  getAllCompletedReportsByCategoryAction,
  getAllCompletedReportsByAngkatanAction,
  searchPublicDocumentsAction
} from '@/lib/actions/documents'

// Types
interface UploadedFile {
  id: string
  filename: string
  original_name: string
  file_size: number
  mime_type: string
  file_type?: string | null
  category: string | null
  year: string | null
  batch: string | null
  created_at: Date
}

interface ReportData {
  id: string
  title: string
  description: string | null
  content: string
  cover_image_url?: string | null
  status: string
  category: string | null
  priority: string
  author_id: string
  created_at: Date
  updated_at: Date
  files?: UploadedFile[]
  author: {
    name: string | null
    username: string
    training?: string | null
    angkatan?: string | null
  }
}

interface AngkatanData {
  id: string
  angkatan: string
  reports: ReportData[]
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
  years?: YearData[]
  totalReports?: number
  isPublicView?: boolean
}

type ViewMode = 'categories' | 'years' | 'angkatan' | 'reports'

export default function DigitalCollectionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('categories')
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
  const [selectedYear, setSelectedYear] = useState<YearData | null>(null)
  const [selectedAngkatan, setSelectedAngkatan] = useState<AngkatanData | null>(null)
  const [reports, setReports] = useState<ReportData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ reports: ReportData[] } | null>(null)

  // Load initial data
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      // Load semua laporan yang sudah COMPLETED dari semua user
      const reportsResult = await getAllCompletedReportsByCategoryAction()

      if (reportsResult.success && reportsResult.data) {
        setCategories(reportsResult.data.categories)
        console.log(`📋 Loaded ${reportsResult.data.totalReports} public reports from all users`)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (category: CategoryData) => {
    setSelectedCategory(category)
    setViewMode('years')
  }

  const handleYearSelect = (year: YearData) => {
    setSelectedYear(year)
    setViewMode('angkatan')
  }

  const handleAngkatanSelect = async (angkatan: AngkatanData) => {
    if (!selectedCategory || !selectedYear) return

    setLoading(true)
    try {
      const result = await getAllCompletedReportsByAngkatanAction(
        selectedCategory.id,
        selectedYear.year,
        angkatan.angkatan
      )

      if (result.success && result.data) {
        setReports(result.data.reports)
        setSelectedAngkatan(angkatan)
        setViewMode('reports')
      }
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    setLoading(true)
    try {
      const result = await searchPublicDocumentsAction(searchQuery)
      if (result.success && result.data) {
        // Hanya ambil reports saja
        setSearchResults({ reports: result.data.reports })
        console.log(`🔍 Search results: ${result.data.reports.length} public reports`)
      }
    } catch (error) {
      console.error('Error searching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentView = (document: ReportData) => {
    // Navigate to detail page
    window.location.href = `/dashboard/user/digital-collection/${document.id}`
  }

  // Helper function to get cover image URL with smart fallback
  const getCoverImageInfo = (document: ReportData) => {
    // First, try to use the cover_image_url from database
    if (document.cover_image_url) {
      return {
        url: document.cover_image_url,
        isFromUpload: false,
        fileName: 'Cover Image',
        fileSize: 0
      }
    }

    // If no cover_image_url, try to find cover image from files
    if (document.files && document.files.length > 0) {
      const imageFile = document.files.find(file =>
        file.mime_type.startsWith('image/') ||
        file.file_type === 'cover' ||
        file.original_name.toLowerCase().includes('cover') ||
        file.original_name.toLowerCase().includes('sampul')
      )

      if (imageFile) {
        return {
          url: `/uploads/covers/${imageFile.year || new Date(document.created_at).getFullYear()}/${imageFile.batch || 'I'}/${imageFile.filename}`,
          isFromUpload: true,
          fileName: imageFile.original_name,
          fileSize: imageFile.file_size
        }
      }
    }

    return null
  }

  const handleBack = () => {
    if (viewMode === 'reports') {
      setViewMode('angkatan')
      setReports([])
      setSelectedAngkatan(null)
    } else if (viewMode === 'angkatan') {
      setViewMode('years')
      setSelectedYear(null)
    } else if (viewMode === 'years') {
      setViewMode('categories')
      setSelectedCategory(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'COMPLETED': { label: 'Selesai', variant: 'default' as const },
      'IN_PROGRESS': { label: 'Proses', variant: 'secondary' as const },
      'PENDING': { label: 'Pending', variant: 'outline' as const },
      'REJECTED': { label: 'Ditolak', variant: 'destructive' as const }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'outline' as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

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
          Digital Collection
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

  if (loading && viewMode === 'categories') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-20"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat koleksi digital yang amazing...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header with modern design */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Digital Collection ✨
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Koleksi lengkap laporan terverifikasi yang absolutely spectacular! 🚀
        </p>
        {/* Public View Indicator */}
        {categories.length > 0 && categories[0]?.isPublicView && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium shadow-lg">
              <Users className="h-4 w-4" />
              Koleksi Publik
            </div>
            <span className="text-sm text-gray-600">
              Menampilkan laporan terverifikasi dari semua pengguna
            </span>
          </div>
        )}
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Back Button */}
      {viewMode !== 'categories' && (
        <div className="mb-6">
          <Button
            onClick={handleBack}
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
            placeholder="Cari laporan yang epic... 🔍"
            className="pl-12 pr-6 py-4 text-lg bg-white/70 backdrop-blur-md border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl"
            size="sm"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <Search className="h-5 w-5 text-white" />
                </div>
                Hasil Pencarian yang Amazing! ✨
              </CardTitle>
              <CardDescription className="text-lg">
                Ditemukan {searchResults.reports.length} laporan terverifikasi yang epic!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.reports.length > 0 && (
                  <div className="grid gap-3">
                    {searchResults.reports.map((report) => (
                      <Card key={report.id} className="group cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden" onClick={() => handleDocumentView(report)}>
                        <CardContent className="p-0">
                          <div className="flex items-start gap-4 p-4">
                            {/* Cover Image for Search Results */}
                            <div className="flex-shrink-0 relative">
                              {(() => {
                                const coverImageInfo = getCoverImageInfo(report);

                                if (coverImageInfo) {
                                  return (
                                    <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                      <img
                                        src={coverImageInfo.url}
                                        alt={`Sampul ${report.title}`}
                                        className="w-16 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                          // Smart fallback logic
                                          const img = e.currentTarget
                                          if (!img.dataset.retryCount) {
                                            img.dataset.retryCount = '1'
                                            // Try with different year path
                                            const reportYear = new Date(report.created_at).getFullYear()
                                            const filename = img.src.split('/').pop()
                                            img.src = `/uploads/covers/${reportYear}/${filename}`
                                          } else if (img.dataset.retryCount === '1') {
                                            img.dataset.retryCount = '2'
                                            // Try placeholder
                                            img.src = '/placeholder-cover.svg'
                                          } else {
                                            // Final fallback - hide image and show fallback
                                            img.style.display = 'none'
                                            const fallback = img.parentElement?.querySelector('.fallback-cover') as HTMLElement
                                            if (fallback) fallback.classList.remove('hidden')
                                          }
                                        }}
                                      />
                                      <div className="fallback-cover hidden w-16 h-20 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 rounded-lg border border-purple-200 flex items-center justify-center">
                                        <div className="text-center">
                                          <FileText className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                                          <div className="text-xs text-purple-700 font-semibold">Laporan</div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="w-16 h-20 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 rounded-lg border border-purple-200 flex items-center justify-center">
                                      <div className="text-center">
                                        <FileText className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                                        <div className="text-xs text-purple-700 font-semibold">Laporan</div>
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 line-clamp-1">{report.title}</h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{report.description}</p>
                              <div className="flex items-center gap-2 mt-3 flex-wrap">
                                {getStatusBadge(report.status)}
                                <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">{report.category}</Badge>
                                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs">
                                  <Users className="h-3 w-3 mr-1" />
                                  Terverifikasi
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                <span>oleh {report.author.name || report.author.username}</span>
                                <span>{format(new Date(report.created_at), 'dd MMM yyyy', { locale: id })}</span>
                              </div>
                            </div>

                            <div className="flex-shrink-0 flex items-center">
                              <div className="p-2 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                                <Eye className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat konten...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Categories View - Simplified */}
            {viewMode === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-0 bg-white/60 backdrop-blur-md shadow-xl overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardHeader className="relative">
                        <CardTitle className="flex items-center gap-4">
                          <div className="relative">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                              <GraduationCap className="h-7 w-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              {category.name}
                            </h3>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed mt-2">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="space-y-6">
                          {/* Stats Card - Only Reports */}
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 border border-blue-200/50">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -mr-8 -mt-8" />
                            <div className="relative text-center">
                              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                                {category.totalReports || 0}
                              </div>
                              <div className="text-sm font-medium text-blue-700">Laporan Terverifikasi</div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                            onClick={() => handleCategorySelect(category)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/btn rounded-xl py-4"
                            disabled={!category.totalReports}
                          >
                            <FileText className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-200" />
                            <span className="font-medium text-lg">Lihat Laporan</span>
                            <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Years View */}
            {viewMode === 'years' && selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory.years && selectedCategory.years.map((year, index) => (
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
              </div>
            )}

            {/* Angkatan View */}
            {viewMode === 'angkatan' && selectedYear && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedYear.angkatan.map((angkatan, index) => (
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
                            Akses Penuh
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Reports List View - Enhanced with Cover Images */}
            {viewMode === 'reports' && (
              <div className="space-y-6 pb-8">
                <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Daftar Laporan Terverifikasi</h2>
                        <p className="text-blue-100 text-sm font-normal">Angkatan {selectedAngkatan?.angkatan}</p>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-blue-100 mt-2">
                      {reports.length} laporan ditemukan • Klik untuk melihat detail
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {reports.length > 0 ? (
                      <div className="grid gap-6">
                        {reports.map((report) => (
                          <Card key={report.id} className="group cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden" onClick={() => handleDocumentView(report)}>
                            <CardContent className="p-0">
                              <div className="flex items-start gap-6 p-6">
                                {/* Enhanced Cover Image with Smart Fallback */}
                                <div className="flex-shrink-0 relative">
                                  {(() => {
                                    const coverImageInfo = getCoverImageInfo(report);

                                    if (coverImageInfo) {
                                      return (
                                        <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                          <img
                                            src={coverImageInfo.url}
                                            alt={`Sampul ${report.title}`}
                                            className="w-24 h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                              // Smart fallback logic
                                              const img = e.currentTarget
                                              if (!img.dataset.retryCount) {
                                                img.dataset.retryCount = '1'
                                                // Try with different year path
                                                const reportYear = new Date(report.created_at).getFullYear()
                                                const filename = img.src.split('/').pop()
                                                img.src = `/uploads/covers/${reportYear}/${filename}`
                                              } else if (img.dataset.retryCount === '1') {
                                                img.dataset.retryCount = '2'
                                                // Try placeholder
                                                img.src = '/placeholder-cover.svg'
                                              } else {
                                                // Final fallback - hide image and show fallback
                                                img.style.display = 'none'
                                                const fallback = img.parentElement?.querySelector('.fallback-cover') as HTMLElement
                                                if (fallback) fallback.classList.remove('hidden')
                                              }
                                            }}
                                          />
                                          <div className="fallback-cover hidden w-24 h-32 bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 rounded-xl border-2 border-blue-200 flex items-center justify-center group-hover:border-blue-400 transition-colors duration-300 shadow-lg">
                                            <div className="text-center">
                                              <FileText className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                                              <div className="text-xs text-blue-700 font-semibold">Laporan</div>
                                              <div className="text-xs text-blue-600">{report.category}</div>
                                            </div>
                                          </div>
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                          {/* Cover indicators */}
                                          {coverImageInfo.isFromUpload && (
                                            <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                              </svg>
                                            </div>
                                          )}

                                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Eye className="h-3 w-3 text-gray-700" />
                                          </div>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div className="w-24 h-32 bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 rounded-xl border-2 border-blue-200 flex items-center justify-center group-hover:border-blue-400 transition-colors duration-300 shadow-lg">
                                          <div className="text-center">
                                            <FileText className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                                            <div className="text-xs text-blue-700 font-semibold">Laporan</div>
                                            <div className="text-xs text-blue-600">{report.category}</div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  })()}
                                  {/* Document Type Indicator */}
                                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                    <BookOpen className="h-3 w-3 inline mr-1" />
                                    VERIFIED
                                  </div>
                                </div>

                                {/* Enhanced Content */}
                                <div className="flex-1 min-w-0 space-y-3">
                                  <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                                      {report.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                                      {report.description || "Tidak ada deskripsi tersedia"}
                                    </p>
                                  </div>

                                  {/* Enhanced Badges */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {getStatusBadge(report.status)}
                                    <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                      {report.category}
                                    </Badge>
                                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm">
                                      <Users className="h-3 w-3 mr-1" />
                                      Terverifikasi
                                    </Badge>
                                  </div>

                                  {/* Enhanced Metadata */}
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <User className="h-4 w-4" />
                                      <span className="font-medium">{report.author.name || report.author.username}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{format(new Date(report.created_at), 'dd MMM yyyy', { locale: id })}</span>
                                    </div>
                                    {report.files && report.files.length > 0 && (
                                      <div className="flex items-center gap-1 text-blue-600">
                                        <FileText className="h-4 w-4" />
                                        <span className="font-medium">{report.files.length} file(s)</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Enhanced Action Area */}
                                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                  <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                                    <Eye className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                                  </div>
                                  <span className="text-xs text-gray-500 font-medium">Lihat Detail</span>
                                </div>
                              </div>

                              {/* Hover Effect Border */}
                              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="relative mx-auto mb-8">
                          {/* Enhanced empty state illustration */}
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <div className="relative">
                              <FileText className="h-16 w-16 text-blue-400" />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                                <span className="text-xs">✨</span>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced empty state content */}
                          <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                              Belum Ada Laporan Terverifikasi
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                              Laporan akan muncul di sini setelah diverifikasi dan memiliki file PDF yang valid.
                              Silakan upload laporan baru atau tunggu proses verifikasi.
                            </p>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                              <Button
                                onClick={() => window.location.href = '/dashboard/user/upload-report'}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Upload Laporan Baru
                              </Button>

                              <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                                className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl px-6 py-3"
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Refresh Halaman
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

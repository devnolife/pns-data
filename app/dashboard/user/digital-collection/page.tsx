"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

import { FilePreviewButton, FileTypeIndicator } from '@/components/preview/file-preview-button'
import { FilePreviewGallery } from '@/components/preview/file-preview-gallery'
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
  Shield,
  Clock,
  ChevronRight,
  Folder,
  FolderOpen,
  Home
} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  getUserReportsByCategoryAction,
  getUserCollectionsByCategoryAction,
  getReportsByAngkatanAction,
  getReportByIdAction,
  getCollectionByIdAction,
  searchUserDocumentsAction,
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
  cover_image_url?: string | null // Added cover image URL
  status: string
  category: string | null
  priority: string
  author_id: string
  created_at: Date
  updated_at: Date
  files?: UploadedFile[] // Added files array
  author: {
    name: string | null
    username: string
    training?: string | null
    angkatan?: string | null
  }
}

interface CollectionData {
  id: string
  title: string
  description: string | null
  content: string
  image_url: string | null
  category: string | null
  tags: string | null
  is_public: boolean
  author_id: string
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    username: string
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
  collections?: CollectionData[]
  totalReports?: number
  totalCollections?: number
  isPublicView?: boolean
}

type ViewMode = 'categories' | 'years' | 'angkatan' | 'reports' | 'collections'

export default function DigitalCollectionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('categories')
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
  const [selectedYear, setSelectedYear] = useState<YearData | null>(null)
  const [selectedAngkatan, setSelectedAngkatan] = useState<AngkatanData | null>(null)
  const [reports, setReports] = useState<ReportData[]>([])
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ collections: CollectionData[], reports: ReportData[] } | null>(null)


  // Load initial data
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      // PERBAIKAN: Gunakan fungsi publik untuk menampilkan SEMUA laporan COMPLETED
      // bukan hanya milik user tertentu
      const [reportsResult, collectionsResult] = await Promise.all([
        getAllCompletedReportsByCategoryAction(), // Ganti dari getUserReportsByCategoryAction
        getUserCollectionsByCategoryAction()
      ])

      if (reportsResult.success && collectionsResult.success && reportsResult.data && collectionsResult.data) {
        // Merge reports and collections data
        const mergedCategories = reportsResult.data.categories.map(reportCat => {
          const collectionCat = collectionsResult.data!.categories.find(c => c.id === reportCat.id)
          return {
            ...reportCat,
            collections: collectionCat?.collections || [],
            totalCollections: collectionCat?.totalCollections || 0,
            isPublicView: reportsResult.data.isPublicView // Flag untuk menandai view publik
          }
        })
        setCategories(mergedCategories)
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
      // PERBAIKAN: Gunakan fungsi publik untuk menampilkan laporan dari semua user
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

  const handleCollectionsView = (category: CategoryData) => {
    setSelectedCategory(category)
    setCollections(category.collections || [])
    setViewMode('collections')
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    setLoading(true)
    try {
      // PERBAIKAN: Gunakan fungsi pencarian publik untuk mencari semua laporan COMPLETED
      const result = await searchPublicDocumentsAction(searchQuery)
      if (result.success && result.data) {
        setSearchResults(result.data)
        console.log(`🔍 Search results: ${result.data.reports.length} public reports, ${result.data.collections.length} collections`)
      }
    } catch (error) {
      console.error('Error searching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentView = (document: ReportData | CollectionData) => {
    // Navigate to detail page instead of opening dialog
    window.location.href = `/dashboard/user/digital-collection/${document.id}`
  }

  // Helper function to generate file URL based on schema structure
  const getFileUrl = (file: UploadedFile) => {
    // For collections: /uploads/collections/2023/I/filename
    // For reports: /uploads/reports/year/batch/filename
    if (file.file_type === 'collection' || file.category) {
      return `/uploads/collections/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
    } else {
      return `/uploads/reports/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
    }
  }

  // Helper function to get cover image URL from uploaded files
  const getCoverImageUrl = (document: ReportData | CollectionData) => {
    // First, try to get from uploaded files (images)
    if ('files' in document && document.files && document.files.length > 0) {
      // Look for image files first
      const imageFile = document.files.find(file =>
        file.mime_type.startsWith('image/') ||
        file.file_type === 'cover' ||
        file.original_name.toLowerCase().includes('cover') ||
        file.original_name.toLowerCase().includes('sampul')
      )

      if (imageFile) {
        return getFileUrl(imageFile)
      }

      // If no specific cover image, use the first image file
      const firstImageFile = document.files.find(file => file.mime_type.startsWith('image/'))
      if (firstImageFile) {
        return getFileUrl(firstImageFile)
      }
    }

    // Fallback to cover_image_url or image_url fields
    if ('cover_image_url' in document && document.cover_image_url) {
      return document.cover_image_url
    }
    if ('image_url' in document && document.image_url) {
      return document.image_url
    }

    return null
  }

  // Helper function to get cover image info (whether it's from uploaded files or not)
  const getCoverImageInfo = (document: ReportData | CollectionData) => {
    if ('files' in document && document.files && document.files.length > 0) {
      const imageFile = document.files.find(file =>
        file.mime_type.startsWith('image/') ||
        file.file_type === 'cover' ||
        file.original_name.toLowerCase().includes('cover') ||
        file.original_name.toLowerCase().includes('sampul')
      )

      if (imageFile) {
        return {
          url: getFileUrl(imageFile),
          isFromUpload: true,
          fileName: imageFile.original_name,
          fileSize: imageFile.file_size
        }
      }

      const firstImageFile = document.files.find(file => file.mime_type.startsWith('image/'))
      if (firstImageFile) {
        return {
          url: getFileUrl(firstImageFile),
          isFromUpload: true,
          fileName: firstImageFile.original_name,
          fileSize: firstImageFile.file_size
        }
      }
    }

    // Fallback to cover_image_url or image_url fields
    const fallbackUrl = ('cover_image_url' in document && document.cover_image_url) ||
      ('image_url' in document && document.image_url)

    if (fallbackUrl) {
      return {
        url: fallbackUrl,
        isFromUpload: false,
        fileName: 'Cover Image',
        fileSize: 0
      }
    }

    return null
  }

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Helper function to get file icon based on mime type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('image')) return '🖼️'
    if (mimeType.includes('video')) return '🎥'
    if (mimeType.includes('audio')) return '🎵'
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊'
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📋'
    return '📁'
  }

  // Function to handle file download/view
  const handleFileView = (file: UploadedFile) => {
    const fileUrl = getFileUrl(file)

    // For PDF files, open in new tab
    if (file.mime_type.includes('pdf')) {
      window.open(fileUrl, '_blank')
    }
    // For images, open in new tab
    else if (file.mime_type.includes('image')) {
      window.open(fileUrl, '_blank')
    }
    // For other files, trigger download
    else {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = file.original_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleBack = () => {
    if (viewMode === 'reports') {
      setViewMode('angkatan')
      setReports([])
      setSelectedAngkatan(null)
    } else if (viewMode === 'angkatan') {
      setViewMode('years')
      setSelectedYear(null)
    } else if (viewMode === 'years' || viewMode === 'collections') {
      setViewMode('categories')
      setSelectedCategory(null)
      setCollections([])
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
          Koleksi lengkap laporan dan dokumen yang absolutely spectacular! 🚀
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
            placeholder="Cari dokumen yang epic... 🔍"
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

      {/* Search Results with modern design */}
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
                Ditemukan {searchResults.reports.length} laporan dan {searchResults.collections.length} koleksi yang epic!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.reports.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Laporan</h3>
                    <div className="grid gap-3">
                      {searchResults.reports.map((report) => (
                        <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDocumentView(report)}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{report.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  {getStatusBadge(report.status)}
                                  <Badge variant="outline">{report.category}</Badge>
                                  {/* PERBAIKAN: Tambahkan badge untuk laporan publik di hasil pencarian */}
                                  {(report as any).isPublicReport && (
                                    <Badge className="bg-green-500 text-white text-xs">
                                      <Users className="h-3 w-3 mr-1" />
                                      Publik
                                    </Badge>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    oleh {report.author.name || report.author.username}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(report.created_at), 'dd MMM yyyy', { locale: id })}
                                  </span>
                                </div>
                              </div>
                              <Eye className="h-4 w-4 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.collections.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Koleksi</h3>
                    <div className="grid gap-3">
                      {searchResults.collections.map((collection) => (
                        <Card key={collection.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDocumentView(collection)}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{collection.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{collection.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant={collection.is_public ? 'default' : 'secondary'}>
                                    {collection.is_public ? 'Publik' : 'Privat'}
                                  </Badge>
                                  <Badge variant="outline">{collection.category}</Badge>
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(collection.created_at), 'dd MMM yyyy', { locale: id })}
                                  </span>
                                </div>
                              </div>
                              <BookOpen className="h-4 w-4 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
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
            {/* Categories View - Enhanced Modern Design */}
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
                          {/* Enhanced Stats Cards */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 border border-blue-200/50">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -mr-8 -mt-8" />
                              <div className="relative">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                  {category.totalReports || 0}
                                </div>
                                <div className="text-sm font-medium text-blue-700 mt-1">Laporan</div>
                              </div>
                            </div>
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 border border-emerald-200/50">
                              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full -mr-8 -mt-8" />
                              <div className="relative">
                                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                                  {category.totalCollections || 0}
                                </div>
                                <div className="text-sm font-medium text-emerald-700 mt-1">Koleksi</div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Action Buttons */}
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleCategorySelect(category)}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/btn rounded-xl"
                              disabled={!category.totalReports}
                            >
                              <FileText className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                              <span className="font-medium">Lihat Laporan</span>
                              <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                            </Button>
                            <Button
                              onClick={() => handleCollectionsView(category)}
                              variant="outline"
                              className="flex-1 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 group/btn rounded-xl"
                              disabled={!category.totalCollections}
                            >
                              <BookOpen className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                              <span className="font-medium">Koleksi</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Years View with modern design */}
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

            {/* Angkatan View with modern design */}
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

            {/* Reports List View - Enhanced with Modern Design */}
            {viewMode === 'reports' && (
              <div className="space-y-6 pb-8">
                <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Daftar Laporan</h2>
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
                                {/* Enhanced Cover Image */}
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
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                          {/* Uploaded file indicator */}
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
                                          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                            <span className="text-white text-xs font-medium">
                                              {coverImageInfo.isFromUpload ? '📁 Uploaded' : 'Laporan'}
                                            </span>
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
                                    OPEN
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
                                    {(report as any).isPublicReport && (
                                      <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm">
                                        <Users className="h-3 w-3 mr-1" />
                                        Publik
                                      </Badge>
                                    )}
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
                                    {(report as any).files && (report as any).files.length > 0 && (
                                      <div className="flex items-center gap-1 text-blue-600">
                                        <FileText className="h-4 w-4" />
                                        <span className="font-medium">{(report as any).files.length} file(s)</span>
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
                      <div className="text-center py-12">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Laporan</h3>
                        <p className="text-gray-500">Belum ada laporan untuk angkatan ini</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Collections View - Enhanced with Modern Design */}
            {viewMode === 'collections' && (
              <div className="space-y-6 pb-8">
                <Card className="border-0 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Koleksi Digital</h2>
                        <p className="text-emerald-100 text-sm font-normal">{selectedCategory?.name}</p>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-emerald-100 mt-2">
                      {collections.length} koleksi ditemukan • Klik untuk melihat detail
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {collections.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                          <Card key={collection.id} className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden" onClick={() => handleDocumentView(collection)}>
                            <CardContent className="p-0">
                              {/* Collection Cover/Thumbnail */}
                              <div className="relative h-48 bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 overflow-hidden">
                                {collection.image_url ? (
                                  <img
                                    src={collection.image_url}
                                    alt={`Sampul ${collection.title}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-200">
                                    <div className="text-center">
                                      <BookOpen className="h-16 w-16 text-emerald-400 mx-auto mb-2" />
                                      <div className="text-sm font-medium text-emerald-600">Koleksi Digital</div>
                                    </div>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Floating Action Button */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                  <Eye className="h-4 w-4 text-gray-700" />
                                </div>

                                {/* Collection Type Badge */}
                                <div className="absolute top-4 left-4">
                                  <Badge variant={collection.is_public ? 'default' : 'secondary'} className="shadow-lg">
                                    {collection.is_public ? 'Publik' : 'Privat'}
                                  </Badge>
                                </div>
                              </div>

                              {/* Collection Info */}
                              <div className="p-6 space-y-4">
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                                    {collection.title}
                                  </h3>
                                  <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                                    {collection.description || "Tidak ada deskripsi tersedia"}
                                  </p>
                                </div>

                                {/* Category Badge */}
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                                    {collection.category}
                                  </Badge>
                                  {collection.tags && (
                                    <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                      {collection.tags}
                                    </Badge>
                                  )}
                                </div>

                                {/* Author & Date */}
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span className="font-medium">{collection.author.name || collection.author.username}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{format(new Date(collection.created_at), 'dd MMM yyyy', { locale: id })}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Hover Effect Border */}
                              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-12 w-12 text-emerald-500" />
                          </div>
                          <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Koleksi</h3>
                        <p className="text-gray-500">Belum ada koleksi untuk kategori ini</p>
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

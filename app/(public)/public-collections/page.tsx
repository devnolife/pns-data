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
  User
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getPublicCollectionsByCategory, getPublicCollectionsByYear, getAvailableYears } from "@/lib/actions/collections"

interface FileItem {
  id: string
  title: string
  author: string
  year: string
  batch: string
  abstract: string
  type: string
  size: string
  downloadUrl: string
  content?: string
  isLimited?: boolean
  maxAccess?: number
  currentAccess?: number
  isPublicReport?: boolean
  isCollection?: boolean
  category?: string
  priority?: string
  fileCount?: number
}

interface FolderData {
  id: string
  name: string
  description: string
  icon: string
  color: string
  files: FileItem[]
  totalFiles: number
  gradient?: string
}

type ViewType = 'years' | 'folders' | 'files'

export default function PublicCollectionsPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<ViewType>('years')
  const [selectedFolder, setSelectedFolder] = useState<FolderData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [folders, setFolders] = useState<FolderData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([])

  // Fetch years data from the database
  useEffect(() => {
    const fetchYears = async () => {
      try {
        setIsLoading(true)
        const result = await getAvailableYears()

        if (result.error) {
          setError(result.error)
        } else if (result.success && result.years.length > 0) {
          setAvailableYears(result.years)
          setBreadcrumb([{ id: 'root', name: 'Koleksi Digital Publik' }])
        } else {
          // If no years available, fetch all collections
          const allCollections = await getPublicCollectionsByCategory()
          if (allCollections.success) {
            const foldersWithGradients = allCollections.categories.map((folder, index) => ({
              ...folder,
              gradient: getGradientByIndex(index)
            }))
            setFolders(foldersWithGradients)
            setCurrentView('folders')
            setBreadcrumb([{ id: 'root', name: 'Koleksi Digital Publik' }])
          } else if (allCollections.error) {
            setError(allCollections.error)
          }
        }
      } catch (err) {
        setError('Failed to load collection years')
        console.error('Error fetching years:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchYears()
  }, [])

  // Fetch collections by year when a year is selected
  useEffect(() => {
    if (selectedYear && currentView === 'folders') {
      const fetchCollectionsByYear = async () => {
        try {
          setIsLoading(true)
          const result = await getPublicCollectionsByYear(selectedYear)

          if (result.error) {
            setError(result.error)
          } else if (result.success) {
            const foldersWithGradients = result.categories.map((folder, index) => ({
              ...folder,
              gradient: getGradientByIndex(index)
            }))
            setFolders(foldersWithGradients)
            setTotalDocuments(result.totalDocuments)
          }
        } catch (err) {
          setError(`Failed to load collections for year ${selectedYear}`)
          console.error(`Error fetching collections for year ${selectedYear}:`, err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchCollectionsByYear()
    }
  }, [selectedYear, currentView])

  // Check if user has filled guestbook
  useEffect(() => {
    const checkAccess = () => {
      const hasFilledGuestbook = localStorage.getItem('hasFilledGuestbook')
      setHasAccess(hasFilledGuestbook === 'true')
    }

    // Add small delay for better UX
    setTimeout(checkAccess, 500)
  }, [])

  const getGradientByIndex = (index: number) => {
    const gradients = [
      'from-purple-500 via-pink-500 to-red-500',
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-green-500 via-emerald-500 to-cyan-500',
      'from-orange-500 via-yellow-500 to-amber-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-rose-500 via-pink-500 to-purple-500'
    ]
    return gradients[index % gradients.length]
  }

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setCurrentView('folders')
    setBreadcrumb([
      { id: 'root', name: 'Koleksi Digital Publik' },
      { id: 'year', name: `Arsip ${year}` }
    ])
  }

  const handleFolderClick = (folder: FolderData) => {
    setSelectedFolder(folder)
    setCurrentView('files')
    setBreadcrumb([
      ...breadcrumb,
      { id: folder.id, name: folder.name }
    ])
  }

  const handleBackToFolders = () => {
    setCurrentView('folders')
    setSelectedFolder(null)
    setSearchTerm("")
    setBreadcrumb(breadcrumb.slice(0, -1))
  }

  const handleBackToYears = () => {
    setCurrentView('years')
    setSelectedFolder(null)
    setSearchTerm("")
    setSelectedYear(null)
    setBreadcrumb([{ id: 'root', name: 'Koleksi Digital Publik' }])
  }

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
    setDialogOpen(true)
  }

  const navigateBack = (targetIndex: number) => {
    if (targetIndex === 0) {
      // Back to root
      setCurrentView('years')
      setSelectedFolder(null)
      setSelectedYear(null)
      setBreadcrumb([{ id: 'root', name: 'Koleksi Digital Publik' }])
    } else if (targetIndex === 1 && breadcrumb.length > 2) {
      // Back to folders
      setCurrentView('folders')
      setSelectedFolder(null)
      setBreadcrumb(breadcrumb.slice(0, 2))
    }
  }

  const filteredFiles = selectedFolder?.files.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  // Loading state with modern design
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-pink-400 opacity-20"></div>
        </div>
      </div>
    )
  }

  // Error state with modern design
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong 😢</CardTitle>
            <CardDescription className="text-gray-600">{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => router.refresh()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-2xl px-6 py-3 font-bold"
            >
              Try Again ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // No access state with modern design
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
        <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />

        {/* Header with Gen Z vibes */}
        <div className="p-6 text-center">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Akses Terbatas 🔒
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Untuk mengakses koleksi digital yang absolutely amazing, silakan isi buku tamu terlebih dahulu! ✨
          </p>
        </div>

        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-8">
                <CardTitle className="text-3xl font-bold mb-2">Koleksi Digital Menanti Anda 🚀</CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Dapatkan akses ke ribuan dokumen, laporan, dan materi pembelajaran berkualitas tinggi yang totally epic!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {folders.slice(0, 4).map((folder, index) => (
                    <div
                      key={folder.id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 shadow-lg"
                    >
                      <p className="text-sm font-bold text-gray-800">{folder.name}</p>
                      <p className="text-xs text-gray-600">{folder.totalFiles}+ dokumen laporan</p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <a
                    href="/guestbook"
                    className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Isi Buku Tamu Sekarang ✨
                  </a>
                  <p className="text-xs text-gray-500 mt-4">
                    Gratis dan hanya membutuhkan waktu 2 menit! No cap! 😎
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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
          Koleksi Digital Publik ✨
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Jelajahi koleksi laporan dan dokumen terbaik yang absolutely amazing! 🚀
        </p>
      </div>

      {/* Modern Breadcrumb */}
      <div className="mb-8">
        <nav className="flex items-center justify-center">
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
            {breadcrumb.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && <span className="mx-3 text-purple-400">✨</span>}
                <button
                  onClick={() => navigateBack(index)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${index === breadcrumb.length - 1
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg'
                    : 'text-gray-600 hover:bg-white/50 hover:text-purple-600'
                    }`}
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {currentView === 'years' && (
          <motion.div
            key="years"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Years View with modern cards */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pilih Tahun Arsip 📅
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {availableYears.map((year, index) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="group overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl hover:scale-105 hover:-translate-y-2"
                      onClick={() => handleYearSelect(year)}
                    >
                      <CardHeader className="pb-4 p-6 relative">
                        <div className="flex items-center gap-4">
                          <div className={`p-4 rounded-2xl bg-gradient-to-r ${getGradientByIndex(index)} shadow-lg`}>
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                              {year}
                            </CardTitle>
                            <CardDescription className="text-sm mt-2 text-gray-600">
                              Arsip dokumen laporan di tahun {year}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 px-6 pb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FolderOpen className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-gray-600 font-medium">
                              Klik untuk explore! 🚀
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl" />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'folders' && (
          <motion.div
            key="folders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Folders View with modern cards */}
            <div className="mb-8">
              {folders.length === 0 ? (
                <Card className="text-center py-16 bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
                  <CardContent className="p-8">
                    <div className="text-gray-400 mb-6">
                      <div className="relative inline-block">
                        <FolderOpen className="h-20 w-20 mx-auto" />
                        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😢</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Tidak ada dokumen</h3>
                    <p className="text-gray-500 text-lg">Tidak ada dokumen yang tersedia untuk tahun {selectedYear} 📁</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {folders.map((folder, index) => (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="group overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl hover:scale-105 hover:-translate-y-2"
                        onClick={() => handleFolderClick(folder)}
                      >
                        <CardHeader className="pb-4 p-6 relative">
                          <div className="flex items-center gap-4">
                            <div className={`text-3xl p-4 rounded-2xl bg-gradient-to-r ${folder.gradient || getGradientByIndex(index)} shadow-lg`}>
                              {folder.icon || '📁'}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg font-bold leading-tight text-gray-800 group-hover:text-purple-600 transition-colors">
                                {folder.name}
                              </CardTitle>
                              <CardDescription className="text-sm mt-2 text-gray-600">
                                {folder.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FolderOpen className="h-4 w-4 text-purple-400" />
                              <span className="text-sm text-gray-600 font-medium">
                                {folder.totalFiles} dokumen yang fire! 🔥
                              </span>
                            </div>
                            <Badge className={`bg-gradient-to-r ${folder.gradient || getGradientByIndex(index)} text-white border-0 rounded-full px-3 py-1 text-xs font-bold`}>
                              {folder.totalFiles}
                            </Badge>
                          </div>
                        </CardContent>
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl" />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {currentView === 'files' && (
          <motion.div
            key="files"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Files View with modern design */}
            <div className="mb-8">
              {/* Trendy Search */}
              <div className="mb-10 flex justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                  <Input
                    placeholder="Cari dokumen yang epic... 🔍"
                    className="pl-12 pr-6 py-4 text-lg bg-white/70 backdrop-blur-md border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Files Grid */}
              {filteredFiles.length === 0 ? (
                <Card className="text-center py-16 bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
                  <CardContent className="p-8">
                    <div className="text-gray-400 mb-6">
                      <div className="relative inline-block">
                        <FileText className="h-20 w-20 mx-auto" />
                        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😢</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Tidak ada file ditemukan</h3>
                    <p className="text-gray-500 text-lg">Coba ubah kata kunci pencarian atau explore folder lain! ✨</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`group overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl hover:scale-105 hover:-translate-y-2 ${file.isLimited ? 'border-l-4 border-amber-500' : file.isPublicReport ? 'border-l-4 border-orange-500' : ''}`}
                        onClick={() => handleFileClick(file)}
                      >
                        <CardHeader className="pb-4 p-6 relative">
                          <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-2xl shadow-lg ${file.isPublicReport ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gradient-to-r from-indigo-400 to-purple-400'}`}>
                              {file.isPublicReport ? (
                                <FileText className="h-6 w-6 text-white" />
                              ) : (
                                <BookOpen className="h-6 w-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg font-bold leading-tight text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                                {file.title}
                              </CardTitle>
                              <CardDescription className="text-sm mt-2 text-gray-600">
                                {file.author} • {file.year}
                                {file.isPublicReport && (
                                  <span className="ml-2 text-orange-600 font-semibold">📋</span>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-6 pb-6">
                          <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                            {file.abstract}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {file.isPublicReport ? (
                                <FileText className="h-4 w-4 text-orange-400" />
                              ) : (
                                <FileText className="h-4 w-4 text-purple-400" />
                              )}
                              <span className="text-sm text-gray-600 font-medium">
                                {file.type} • {file.size}
                                {file.isPublicReport && file.fileCount && file.fileCount > 0 && (
                                  <span className="ml-2 text-orange-600">({file.fileCount} files)</span>
                                )}
                              </span>
                            </div>
                            <Badge className={`text-white border-0 rounded-full px-3 py-1 text-xs font-bold ${file.isPublicReport ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                              {file.isPublicReport ? 'Laporan' : 'View'}
                            </Badge>
                          </div>
                          {file.isLimited && (
                            <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-amber-500 h-1.5 rounded-full"
                                style={{ width: `${(file.currentAccess! / file.maxAccess!) * 100}%` }}
                              ></div>
                            </div>
                          )}
                        </CardContent>
                        {/* Hover effect overlay */}
                        <div className={`absolute inset-0 transition-all duration-500 rounded-3xl ${file.isPublicReport ? 'bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10' : 'bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10'}`} />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Detail Dialog with modern design */}
      {selectedFile && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent
            className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white/90 backdrop-blur-md border-0 rounded-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            style={{
              position: 'fixed',
              top: '10rem',
              left: '25rem',
              transform: 'none',
              margin: 0
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl ${selectedFile.isPublicReport ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                  {selectedFile.isPublicReport ? (
                    <FileText className="h-6 w-6 text-white" />
                  ) : (
                    <BookOpen className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-bold text-gray-800 leading-tight">
                    {selectedFile.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 text-sm mt-1">
                    {selectedFile.author} • {selectedFile.year} • {selectedFile.batch} ✨
                    {selectedFile.isPublicReport && (
                      <span className="ml-2 text-orange-600 font-semibold">📋 Laporan Publik</span>
                    )}
                  </DialogDescription>
                </div>
                <div className="flex gap-1">
                  <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <Sparkles className="h-5 w-5 text-pink-400 animate-bounce" />
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${selectedFile.isPublicReport ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'}`}>
                <h3 className={`font-bold mb-2 text-base flex items-center gap-2 ${selectedFile.isPublicReport ? 'text-orange-800' : 'text-purple-800'}`}>
                  {selectedFile.isPublicReport ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <BookOpen className="h-4 w-4" />
                  )}
                  {selectedFile.isPublicReport ? 'Ringkasan Laporan 📋' : 'Abstrak 📖'}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">{selectedFile.abstract}</p>

                {selectedFile.isPublicReport && selectedFile.fileCount && selectedFile.fileCount > 0 && (
                  <div className="mt-3 p-2 bg-white/50 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-700">
                      📎 Laporan ini memiliki <span className="font-bold">{selectedFile.fileCount}</span> file terlampir
                    </p>
                  </div>
                )}
              </div>

              {selectedFile.isPublicReport ? (
                // Public Report UI - No download functionality
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="font-bold text-gray-800 text-base">Laporan {selectedFile.type} 📋</p>
                        <p className="text-xs text-gray-600">
                          Kategori: {selectedFile.category || 'Umum'} •
                          Prioritas: {selectedFile.priority || 'Medium'}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 rounded-full px-3 py-1 text-xs font-bold">
                      Laporan Publik
                    </Badge>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-orange-600" />
                      <p className="text-xs text-orange-800 font-bold">
                        Laporan Hanya untuk Dibaca 👀
                      </p>
                    </div>
                    <p className="text-xs text-orange-700">
                      Ini adalah laporan yang telah diverifikasi dan dipublikasikan untuk kepentingan umum.
                      Tidak tersedia untuk diunduh. 📋✨
                    </p>
                  </div>
                </div>
              ) : (
                // Collection/Document UI - With download functionality
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className={`w-6 h-6 ${selectedFile.isLimited ? 'text-amber-500' : 'text-purple-500'}`} />
                      <div>
                        <p className="font-bold text-gray-800 text-base">{selectedFile.type} Document 📄</p>
                        <p className="text-xs text-gray-600">Ukuran: {selectedFile.size}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl border-purple-200 hover:bg-purple-50">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview ✨
                      </Button>
                      <Button size="sm" className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Download className="w-3 h-3 mr-1" />
                        Download 🚀
                      </Button>
                    </div>
                  </div>

                  {selectedFile.isLimited && (
                    <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-amber-600" />
                        <p className="text-xs text-amber-800 font-bold">
                          Perhatian: Dokumen ini memiliki akses terbatas! ⚠️
                        </p>
                      </div>
                      <p className="text-xs text-amber-700 mb-2">
                        Telah diakses {selectedFile.currentAccess} dari {selectedFile.maxAccess} kali.
                      </p>
                      <div className="w-full bg-amber-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(selectedFile.currentAccess! / selectedFile.maxAccess!) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <p className="text-xs text-blue-800 font-bold">
                        Mode Baca Saja 👀
                      </p>
                    </div>
                    <p className="text-xs text-blue-700">
                      Dokumen ini hanya dapat dibaca dan tidak dapat disalin. Stay respectful! 😎
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

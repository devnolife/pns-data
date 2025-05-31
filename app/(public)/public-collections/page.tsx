"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Search, Folder, FileText, ArrowLeft, Download, Eye, Calendar, User, Grid, List } from "lucide-react"
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
}

interface FolderData {
  id: string
  name: string
  description: string
  icon: string
  color: string
  files: FileItem[]
  totalFiles: number
}

type ViewType = 'years' | 'folders' | 'files'
type DisplayMode = 'grid' | 'list'

export default function PublicCollectionsPage() {
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
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid')
  const [totalDocuments, setTotalDocuments] = useState(0)

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
          setSelectedYear(result.years[0]) // Select the first (most recent) year
        } else {
          // If no years available, fetch all collections
          const allCollections = await getPublicCollectionsByCategory()
          if (allCollections.success) {
            setFolders(allCollections.categories)
            setCurrentView('folders')
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
            setFolders(result.categories)
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

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setCurrentView('folders')
  }

  const handleFolderClick = (folder: FolderData) => {
    setSelectedFolder(folder)
    setCurrentView('files')
  }

  const handleBackToFolders = () => {
    setCurrentView('folders')
    setSelectedFolder(null)
    setSearchTerm("")
  }

  const handleBackToYears = () => {
    setCurrentView('years')
    setSelectedFolder(null)
    setSearchTerm("")
  }

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
    setDialogOpen(true)
  }

  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'grid' ? 'list' : 'grid')
  }

  const filteredFiles = selectedFolder?.files.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-primary font-medium">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  // No access state
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-primary">
          <div className="container mx-auto py-16 px-4 md:px-6">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Akses Terbatas
              </h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Untuk mengakses koleksi digital, silakan isi buku tamu terlebih dahulu.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Koleksi Digital Menanti Anda
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dapatkan akses ke ribuan dokumen, laporan, dan materi pembelajaran berkualitas tinggi.
                Cukup isi buku tamu untuk membuka akses penuh ke koleksi digital kami.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-800">{folder.name}</p>
                    <p className="text-xs text-gray-600">{folder.totalFiles}+ dokumen</p>
                  </div>
                ))}
              </div>

              <a
                href="/guestbook"
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Isi Buku Tamu Sekarang
              </a>

              <p className="text-xs text-gray-500 mt-4">
                Gratis dan hanya membutuhkan waktu 2 menit!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main content with access
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Koleksi Digital
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Jelajahi koleksi laporan dan dokumen terbaik dari berbagai program pelatihan.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <AnimatePresence mode="wait">
          {currentView === 'years' && (
            <motion.div
              key="years"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Years View */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Pilih Tahun Arsip</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={displayMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setDisplayMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={displayMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setDisplayMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {displayMode === 'grid' ? (
                  // Grid View
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {availableYears.map((year, index) => (
                      <motion.div
                        key={year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                        onClick={() => handleYearSelect(year)}
                      >
                        <div className="h-32 bg-primary flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">
                            {year}
                          </span>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-gray-700 font-medium">Arsip Dokumen</p>
                          <p className="text-sm text-gray-500">Klik untuk melihat</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-3">
                    {availableYears.map((year, index) => (
                      <motion.div
                        key={year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                        onClick={() => handleYearSelect(year)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{year}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">Arsip Tahun {year}</h3>
                            <p className="text-sm text-gray-500">Koleksi dokumen dan laporan</p>
                          </div>
                        </div>
                        <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                      </motion.div>
                    ))}
                  </div>
                )}
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
              {/* Folders View */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Button
                      onClick={handleBackToYears}
                      variant="outline"
                      className="mb-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Tahun
                    </Button>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                      Arsip Tahun {selectedYear}
                      <span className="ml-2 text-sm font-normal text-gray-500">({totalDocuments} dokumen)</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={displayMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setDisplayMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={displayMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setDisplayMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {folders.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Dokumen</h3>
                    <p className="text-gray-600">Tidak ada dokumen yang tersedia untuk tahun {selectedYear}</p>
                  </div>
                ) : displayMode === 'grid' ? (
                  // Grid View
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {folders.map((folder, index) => (
                      <motion.div
                        key={folder.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                        onClick={() => handleFolderClick(folder)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-800">
                            {folder.name}
                          </h3>
                          <div className="bg-gray-100 rounded-full px-3 py-1">
                            <span className="text-gray-600 font-medium text-sm">
                              {folder.totalFiles} file
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">
                          {folder.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Folder className="w-4 h-4" />
                            <span className="text-sm">Klik untuk membuka</span>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="bg-white rounded-lg shadow-md p-4">
                    {folders.map((folder, index) => (
                      <motion.div
                        key={folder.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between border-b last:border-0"
                        onClick={() => handleFolderClick(folder)}
                      >
                        <div className="flex items-center gap-4">
                          <Folder className="w-5 h-5 text-primary" />
                          <div>
                            <h3 className="font-medium text-gray-800">{folder.name}</h3>
                            <p className="text-sm text-gray-500">{folder.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            {folder.totalFiles} file
                          </span>
                          <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                        </div>
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
              {/* Files View */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Button
                      onClick={handleBackToFolders}
                      variant="outline"
                      className="mb-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Folder
                    </Button>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                      {selectedFolder?.name}
                    </h2>
                    <p className="text-gray-600">{selectedFolder?.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={displayMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setDisplayMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={displayMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setDisplayMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Cari berdasarkan judul atau penulis..."
                    className="pl-12 h-12 rounded-lg border bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Files Grid/List */}
                {filteredFiles.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 font-medium">Tidak ada file yang ditemukan</p>
                    <p className="text-sm text-gray-500 mt-1">Coba ubah kata kunci pencarian</p>
                  </div>
                ) : displayMode === 'grid' ? (
                  // Grid View
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFiles.map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${file.isLimited ? 'border-l-4 border-amber-500' : ''}`}
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <FileText className={`w-6 h-6 ${file.isLimited ? 'text-amber-500' : 'text-primary'}`} />
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            {file.type}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {file.title}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span>{file.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{file.year} • {file.batch}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                          {file.abstract}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{file.size}</span>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <Eye className="w-3 h-3 mr-1" />
                            Lihat
                          </Button>
                        </div>

                        {file.isLimited && (
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-amber-500 h-1.5 rounded-full"
                              style={{ width: `${(file.currentAccess! / file.maxAccess!) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="bg-white rounded-lg shadow-md p-4">
                    {filteredFiles.map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between border-b last:border-0 ${file.isLimited ? 'border-l-4 border-amber-500' : ''}`}
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-center gap-4">
                          <FileText className={`w-5 h-5 ${file.isLimited ? 'text-amber-500' : 'text-primary'}`} />
                          <div className="max-w-2xl">
                            <h3 className="font-medium text-gray-800 line-clamp-1">{file.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{file.abstract}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" /> {file.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {file.year}
                              </span>
                              <span>{file.batch}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            {file.type} • {file.size}
                          </span>
                          {file.isLimited && (
                            <div className="w-24 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-amber-500 h-1.5 rounded-full"
                                style={{ width: `${(file.currentAccess! / file.maxAccess!) * 100}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Detail Dialog */}
        {selectedFile && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  {selectedFile.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {selectedFile.author} • {selectedFile.year} • {selectedFile.batch}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-gray-800 mb-2">Abstrak</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedFile.abstract}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className={`w-6 h-6 ${selectedFile.isLimited ? 'text-amber-500' : 'text-primary'}`} />
                    <div>
                      <p className="font-medium text-gray-800">{selectedFile.type} Document</p>
                      <p className="text-sm text-gray-600">Ukuran: {selectedFile.size}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-lg">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button className="rounded-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {selectedFile.isLimited && (
                  <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Perhatian:</strong> Dokumen ini memiliki akses terbatas dan telah diakses {selectedFile.currentAccess} dari {selectedFile.maxAccess} kali.
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${(selectedFile.currentAccess! / selectedFile.maxAccess!) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Catatan:</strong> Untuk mengunduh file, silakan login terlebih dahulu atau isi buku tamu.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

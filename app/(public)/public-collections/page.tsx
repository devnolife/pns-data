"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Search, Folder, FileText, ArrowLeft, Download, Eye, Calendar, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

export default function PublicCollectionsPage() {
  const [currentView, setCurrentView] = useState<'folders' | 'files'>('folders')
  const [selectedFolder, setSelectedFolder] = useState<FolderData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user has filled guestbook
  useEffect(() => {
    const checkAccess = () => {
      const hasFilledGuestbook = localStorage.getItem('hasFilledGuestbook')
      setHasAccess(hasFilledGuestbook === 'true')
      setIsLoading(false)
    }

    // Add small delay for better UX
    setTimeout(checkAccess, 500)
  }, [])

  // Mock data untuk folder-folder
  const folders: FolderData[] = [
    {
      id: "latsar-cpns",
      name: "Latsar Aktualisasi CPNS",
      description: "Laporan Aktualisasi Latsar Calon Pegawai Negeri Sipil",
      icon: "🎓",
      color: "from-blue-500 to-cyan-500",
      totalFiles: 24,
      files: [
        {
          id: "1",
          title: "Aktualisasi Nilai-Nilai Dasar PNS dalam Pelayanan Publik",
          author: "Ahmad Rizki Pratama",
          year: "2024",
          batch: "Angkatan 1",
          abstract: "Laporan aktualisasi ini membahas implementasi nilai-nilai dasar PNS dalam meningkatkan kualitas pelayanan publik di lingkungan kerja.",
          type: "PDF",
          size: "2.3 MB",
          downloadUrl: "#"
        },
        {
          id: "2",
          title: "Optimalisasi Sistem Informasi untuk Efisiensi Kerja",
          author: "Siti Nurhaliza",
          year: "2024",
          batch: "Angkatan 1",
          abstract: "Penelitian tentang pemanfaatan teknologi informasi untuk meningkatkan efisiensi dan efektivitas dalam pelaksanaan tugas.",
          type: "PDF",
          size: "1.8 MB",
          downloadUrl: "#"
        },
        {
          id: "3",
          title: "Inovasi Pelayanan Berbasis Digital",
          author: "Budi Santoso",
          year: "2024",
          batch: "Angkatan 2",
          abstract: "Implementasi inovasi pelayanan digital untuk meningkatkan kepuasan masyarakat dalam mengakses layanan pemerintah.",
          type: "PDF",
          size: "3.1 MB",
          downloadUrl: "#"
        }
      ]
    },
    {
      id: "laporan-pka",
      name: "Laporan PKA",
      description: "Laporan Pelatihan Kepemimpinan Administrator",
      icon: "👔",
      color: "from-purple-500 to-pink-500",
      totalFiles: 18,
      files: [
        {
          id: "4",
          title: "Strategi Kepemimpinan dalam Era Digital",
          author: "Dr. Indira Sari",
          year: "2024",
          batch: "Angkatan 3",
          abstract: "Analisis mendalam tentang gaya kepemimpinan yang efektif dalam menghadapi tantangan transformasi digital.",
          type: "PDF",
          size: "4.2 MB",
          downloadUrl: "#"
        },
        {
          id: "5",
          title: "Manajemen Perubahan Organisasi",
          author: "Eko Prasetyo",
          year: "2023",
          batch: "Angkatan 2",
          abstract: "Studi kasus implementasi manajemen perubahan dalam organisasi pemerintahan untuk meningkatkan kinerja.",
          type: "PDF",
          size: "2.7 MB",
          downloadUrl: "#"
        }
      ]
    },
    {
      id: "laporan-pkp",
      name: "Laporan PKP",
      description: "Laporan Pelatihan Kepemimpinan Pengawas",
      icon: "🔍",
      color: "from-green-500 to-emerald-500",
      totalFiles: 31,
      files: [
        {
          id: "6",
          title: "Sistem Pengawasan Internal yang Efektif",
          author: "Maya Kusuma",
          year: "2024",
          batch: "Angkatan 1",
          abstract: "Pengembangan sistem pengawasan internal untuk mencegah korupsi dan meningkatkan akuntabilitas.",
          type: "PDF",
          size: "3.5 MB",
          downloadUrl: "#"
        },
        {
          id: "7",
          title: "Audit Kinerja Berbasis Risiko",
          author: "Rudi Hermawan",
          year: "2023",
          batch: "Angkatan 4",
          abstract: "Metodologi audit kinerja dengan pendekatan manajemen risiko untuk optimalisasi hasil audit.",
          type: "PDF",
          size: "2.9 MB",
          downloadUrl: "#"
        }
      ]
    },
    {
      id: "laporan-pkn",
      name: "Laporan PKN",
      description: "Laporan Kepemimpinan Nasional",
      icon: "🏛️",
      color: "from-orange-500 to-red-500",
      totalFiles: 12,
      files: [
        {
          id: "8",
          title: "Visi Indonesia 2045: Strategi Kepemimpinan Nasional",
          author: "Prof. Dr. Bambang Wijaya",
          year: "2024",
          batch: "Angkatan 1",
          abstract: "Analisis strategis tentang kepemimpinan nasional dalam mewujudkan visi Indonesia Emas 2045.",
          type: "PDF",
          size: "5.1 MB",
          downloadUrl: "#"
        },
        {
          id: "9",
          title: "Diplomasi dan Kepemimpinan Global",
          author: "Dewi Fortuna Anwar",
          year: "2023",
          batch: "Angkatan 2",
          abstract: "Peran kepemimpinan Indonesia dalam diplomasi global dan pengaruhnya terhadap pembangunan nasional.",
          type: "PDF",
          size: "4.7 MB",
          downloadUrl: "#"
        }
      ]
    }
  ]

  const handleFolderClick = (folder: FolderData) => {
    setSelectedFolder(folder)
    setCurrentView('files')
  }

  const handleBackToFolders = () => {
    setCurrentView('folders')
    setSelectedFolder(null)
    setSearchTerm("")
  }

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
    setDialogOpen(true)
  }

  const filteredFiles = selectedFolder?.files.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  // No access state
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto py-16 px-4 md:px-6">
            <div className="text-center text-white">
              <div className="animate-bounce mb-6">
                <span className="text-6xl md:text-8xl">🔒</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Akses Terbatas
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Untuk mengakses koleksi digital, silakan isi buku tamu terlebih dahulu! 📝✨
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Koleksi Digital Menanti Anda!
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dapatkan akses ke ribuan dokumen, laporan, dan materi pembelajaran berkualitas tinggi.
                Cukup isi buku tamu untuk membuka akses penuh ke koleksi digital kami.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl mb-2">🎓</div>
                  <p className="text-sm font-medium text-blue-800">Latsar CPNS</p>
                  <p className="text-xs text-blue-600">24+ dokumen</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <div className="text-2xl mb-2">👔</div>
                  <p className="text-sm font-medium text-purple-800">Laporan PKA</p>
                  <p className="text-xs text-purple-600">18+ dokumen</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="text-2xl mb-2">🔍</div>
                  <p className="text-sm font-medium text-green-800">Laporan PKP</p>
                  <p className="text-xs text-green-600">31+ dokumen</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                  <div className="text-2xl mb-2">🏛️</div>
                  <p className="text-sm font-medium text-orange-800">Laporan PKN</p>
                  <p className="text-xs text-orange-600">12+ dokumen</p>
                </div>
              </div>

              <a
                href="/guestbook"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>📝</span>
                Isi Buku Tamu Sekarang
                <span>✨</span>
              </a>

              <p className="text-xs text-gray-500 mt-4">
                Gratis dan hanya membutuhkan waktu 2 menit!
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
      </div>
    )
  }

  // Main content with access
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto py-16 px-4 md:px-6">
          <div className="text-center text-white">
            <div className="animate-bounce mb-6">
              <span className="text-6xl md:text-8xl">📚</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Koleksi Digital
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Jelajahi koleksi laporan dan dokumen terbaik dari berbagai program pelatihan! 📖✨
            </p>
            <div className="flex justify-center gap-4 text-2xl md:text-3xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>📊</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>📋</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>📈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>💼</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎯</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <AnimatePresence mode="wait">
          {currentView === 'folders' ? (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Folders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {folders.map((folder, index) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => handleFolderClick(folder)}
                  >
                    <div className={`bg-gradient-to-br ${folder.color} p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          {folder.icon}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-white font-semibold text-sm">
                            {folder.totalFiles} files
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">
                        {folder.name}
                      </h3>

                      <p className="text-white/90 text-sm leading-relaxed mb-6">
                        {folder.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/80">
                          <Folder className="w-4 h-4" />
                          <span className="text-sm">Klik untuk membuka</span>
                        </div>
                        <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors">
                          <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="files"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Files View */}
              <div className="mb-8">
                <Button
                  onClick={handleBackToFolders}
                  variant="outline"
                  className="mb-6 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Folder
                </Button>

                <div className={`bg-gradient-to-r ${selectedFolder?.color} p-6 rounded-2xl mb-6`}>
                  <div className="flex items-center gap-4 text-white">
                    <span className="text-4xl">{selectedFolder?.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedFolder?.name}</h2>
                      <p className="opacity-90">{selectedFolder?.description}</p>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Cari berdasarkan judul atau penulis... 🔍"
                    className="pl-12 h-12 rounded-xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Files Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFiles.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <span className="text-6xl mb-4 block">📄</span>
                      <p className="text-gray-600 font-medium">Tidak ada file yang ditemukan</p>
                      <p className="text-sm text-gray-500 mt-1">Coba ubah kata kunci pencarian</p>
                    </div>
                  ) : (
                    filteredFiles.map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/30 cursor-pointer group"
                        onClick={() => handleFileClick(file)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl">
                            <FileText className="w-6 h-6 text-purple-600" />
                          </div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                            {file.type}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
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
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Eye className="w-3 h-3 mr-1" />
                              Lihat
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
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
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-400">
                  <h3 className="font-semibold text-gray-800 mb-2">Abstrak</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedFile.abstract}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
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
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Catatan:</strong> Untuk mengunduh file, silakan login terlebih dahulu atau isi buku tamu.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

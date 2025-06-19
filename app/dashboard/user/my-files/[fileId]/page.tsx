"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import {
  ArrowLeft,
  FileText,
  Download,
  Calendar,
  HardDrive,
  Shield,
  Clock,
  Home,
  ChevronRight,
  Eye,
  AlertTriangle,
  Image,
  File,
  FileImage,
  FileVideo,
  Music,
  Archive,
  Trash2,
  ExternalLink,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react'
import { AdvancedPDFViewer } from '@/components/security/advanced-pdf-viewer'
import { motion } from "framer-motion"
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { getUserUploadedFileByIdAction, deleteUploadedFileAction } from '@/lib/actions/reports'

interface UploadedFile {
  id: string
  filename: string
  original_name: string
  file_path: string
  file_size: number
  mime_type: string
  category: string | null
  year: string | null
  batch: string | null
  created_at: Date
  downloadUrl: string
  report?: {
    id: string
    title: string
    status: string
  } | null
}

export default function FileDetailPage({ params }: { params: { fileId: string } }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const [file, setFile] = useState<UploadedFile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      loadFile()
    }
  }, [params.fileId, isAuthenticated])

  // Handle ESC key to go back
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleBack()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Check authentication
  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const loadFile = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getUserUploadedFileByIdAction(params.fileId)
      if (result.success && result.data) {
        setFile(result.data)
      } else {
        setError('File tidak ditemukan atau Anda tidak memiliki akses')
      }
    } catch (error) {
      console.error('Error loading file:', error)
      setError('Terjadi kesalahan saat memuat file')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/dashboard/user/my-files')
  }

  const handleDownload = () => {
    if (!file) return

    // Use secure endpoint for download
    const secureFileUrl = `/api/secure-file/${file.id}`
    const link = document.createElement('a')
    link.href = secureFileUrl
    link.download = file.original_name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Dimulai",
      description: `File "${file.original_name}" sedang diunduh melalui secure endpoint`
    })
  }

  const handleDelete = async () => {
    if (!file) return

    if (!confirm(`Apakah Anda yakin ingin menghapus file "${file.original_name}"?`)) {
      return
    }

    try {
      const result = await deleteUploadedFileAction(file.id)
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "File berhasil dihapus"
        })
        router.push('/dashboard/user/my-files')
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Delete file error:', error)
      toast({
        title: "Error",
        description: "Gagal menghapus file",
        variant: "destructive"
      })
    }
  }

  const getFileIcon = (mimeType: string, size = 'h-8 w-8') => {
    if (mimeType.includes('image')) return <FileImage className={`${size} text-green-600`} />
    if (mimeType.includes('pdf')) return <FileText className={`${size} text-red-600`} />
    if (mimeType.includes('video')) return <FileVideo className={`${size} text-purple-600`} />
    if (mimeType.includes('audio')) return <Music className={`${size} text-pink-600`} />
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className={`${size} text-orange-600`} />
    if (mimeType.includes('word') || mimeType.includes('document')) return <FileText className={`${size} text-blue-600`} />
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return <FileText className={`${size} text-green-600`} />
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return <FileText className={`${size} text-orange-600`} />
    return <File className={`${size} text-gray-600`} />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

  const FilePreview = () => {
    if (!file) return null

    const isImage = file.mime_type.includes('image')
    const isPDF = file.mime_type.includes('pdf')
    const isVideo = file.mime_type.includes('video')
    const isAudio = file.mime_type.includes('audio')
    const isText = file.mime_type.includes('text')

    // Use secure endpoint for images and PDFs
    const secureFileUrl = `/api/secure-file/${file.id}`

    if (isImage) {
      return (
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-800">Preview Gambar</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600 min-w-[4rem] text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRotation((rotation + 90) % 360)}
                className="h-8 w-8 p-0"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(secureFileUrl, '_blank')}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-8 flex justify-center items-center min-h-[400px] overflow-auto">
            <img
              src={secureFileUrl}
              alt={file.original_name}
              className="max-w-full max-h-full object-contain shadow-lg rounded-lg transition-all duration-300"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
              onLoad={() => setPreviewLoading(false)}
              onError={() => setPreviewLoading(false)}
            />
          </div>
        </div>
      )
    }

    if (isPDF) {
      return (
        <AdvancedPDFViewer
          fileUrl={secureFileUrl}
          fileName={file.original_name}
          onDownload={handleDownload}
        />
      )
    }

    if (isVideo) {
      return (
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b">
            <div className="flex items-center gap-2">
              <FileVideo className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-800">Preview Video</span>
            </div>
          </div>
          <div className="p-8 flex justify-center">
            <video
              controls
              className="max-w-full max-h-[500px] rounded-lg shadow-lg"
              onLoadedData={() => setPreviewLoading(false)}
              onError={() => setPreviewLoading(false)}
            >
              <source src={secureFileUrl} type={file.mime_type} />
              Browser Anda tidak mendukung pemutar video.
            </video>
          </div>
        </div>
      )
    }

    if (isAudio) {
      return (
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-pink-600" />
              <span className="font-medium text-gray-800">Preview Audio</span>
            </div>
          </div>
          <div className="p-8 flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center mb-4">
                <Music className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">{file.original_name}</h3>
                <p className="text-sm text-gray-600">File Audio</p>
              </div>
              <audio
                controls
                className="w-full"
                onLoadedData={() => setPreviewLoading(false)}
                onError={() => setPreviewLoading(false)}
              >
                <source src={secureFileUrl} type={file.mime_type} />
                Browser Anda tidak mendukung pemutar audio.
              </audio>
            </div>
          </div>
        </div>
      )
    }

    // Default preview for unsupported file types
    return (
      <div className="relative bg-gray-50 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b">
          <div className="flex items-center gap-2">
            {getFileIcon(file.mime_type, 'h-5 w-5')}
            <span className="font-medium text-gray-800">Preview File</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(secureFileUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Buka di Tab Baru
          </Button>
        </div>
        <div className="p-12 text-center">
          <div className="max-w-md mx-auto">
            {getFileIcon(file.mime_type, 'h-24 w-24')}
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Preview Tidak Tersedia</h3>
            <p className="text-gray-600 mb-6">
              File jenis "{file.mime_type}" tidak dapat dipratinjau langsung di browser.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download untuk Melihat
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(secureFileUrl, '_blank')}
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Buka di Tab Baru
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center py-20"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat file yang amazing...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={handleBack}
              className="bg-white/70 backdrop-blur-md border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-purple-700 hover:text-purple-800"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke My Files
            </Button>
          </div>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-800 mb-2">File Tidak Dapat Diakses</h2>
                <p className="text-red-600">{error}</p>
              </div>
              <Button onClick={handleBack} className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke My Files
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!file) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={handleBack}
                className="bg-white/70 backdrop-blur-md border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-purple-700 hover:text-purple-800"
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke My Files
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </Button>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-8 px-3 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80 transition-all duration-200"
              >
                <Home className="h-3 w-3 mr-1" />
                My Files
              </Button>
              <ChevronRight className="h-4 w-4 text-purple-400" />
              <span className="h-8 px-3 bg-purple-100 text-purple-800 rounded-full flex items-center text-xs font-medium">
                <Eye className="h-3 w-3 mr-1" />
                File Preview
              </span>
            </div>

            {/* File Header */}
            <Card className="border-0 bg-white/60 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
              <CardHeader className="relative p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      {getFileIcon(file.mime_type, 'h-10 w-10 text-white')}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-3xl font-black mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent line-clamp-2">
                      {file.original_name}
                    </CardTitle>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <HardDrive className="h-4 w-4" />
                        <span className="font-medium">{formatFileSize(file.file_size)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(file.created_at), 'dd MMMM yyyy', { locale: id })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{format(new Date(file.created_at), 'HH:mm', { locale: id })}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        {file.mime_type}
                      </Badge>
                      {file.category && (
                        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                          {file.category}
                        </Badge>
                      )}
                      {file.year && (
                        <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                          {file.year}
                        </Badge>
                      )}
                      {file.batch && (
                        <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                          Angkatan {file.batch}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Card className="bg-green-50/80 border-green-200">
                      <CardContent className="p-4 text-center">
                        <Eye className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-xs font-semibold text-green-800">File Preview</div>
                        <div className="text-xs text-green-600">Mode Lihat</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* File Preview Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl mb-8">
            <CardContent className="p-0">
              {previewLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat preview...</p>
                  </div>
                </div>
              )}
              <FilePreview />
            </CardContent>
          </Card>

          {/* File Info */}
          {file.report && (
            <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informasi Laporan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Judul Laporan</label>
                    <p className="font-medium text-gray-800 mt-1">{file.report.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(file.report.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">ID Laporan</label>
                    <p className="font-mono text-sm text-gray-600 mt-1">{file.report.id.slice(-8)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <Card className="border-0 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-md shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-blue-800">File Manager PNS</div>
                    <p className="text-xs text-blue-700">Akses file dengan aman dan mudah</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Diakses oleh</div>
                  <div className="text-sm font-semibold text-gray-800">{user?.name || user?.username}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 

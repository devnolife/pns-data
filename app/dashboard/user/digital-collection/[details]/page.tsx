"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  FileText,
  BookOpen,
  User,
  Calendar,
  AlertTriangle,
  Eye,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/actions/auth'
import {
  getReportByIdAction,
  getCollectionByIdAction
} from '@/lib/actions/documents'
import { getSecureReportDetailsAction } from '@/lib/actions/reports'

export default function DocumentDetailPage({ params }: { params: { details: string } }) {
  const router = useRouter()
  const [document, setDocument] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [documentType, setDocumentType] = useState<'report' | 'collection' | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [previewFile, setPreviewFile] = useState<any>(null)

  useEffect(() => {
    loadDocument()
    loadCurrentUser()
  }, [params.details])

  const loadCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      if (user) {
        setCurrentUser({
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        })
      }
    } catch (error) {
      console.error('Error loading current user:', error)
    }
  }

  const loadDocument = async () => {
    setLoading(true)
    setError(null)

    try {
      // First try to load as a secure report
      const reportResult = await getSecureReportDetailsAction(params.details)
      if (reportResult.success && reportResult.data) {
        setDocument(reportResult.data)
        setDocumentType('report')
        setLoading(false)
        return
      }

      // If not found as secure report, try regular report
      const regularReportResult = await getReportByIdAction(params.details)
      if (regularReportResult.success && regularReportResult.data) {
        setDocument(regularReportResult.data)
        setDocumentType('report')
        setLoading(false)
        return
      }

      // Finally, try as collection
      const collectionResult = await getCollectionByIdAction(params.details)
      if (collectionResult.success && collectionResult.data) {
        setDocument(collectionResult.data)
        setDocumentType('collection')
        setLoading(false)
        return
      }

      setError('Dokumen tidak ditemukan atau Anda tidak memiliki akses')
    } catch (error) {
      console.error('Error loading document:', error)
      setError('Terjadi kesalahan saat memuat dokumen')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/dashboard/user/digital-collection')
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

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('image')) return '🖼️'
    if (mimeType.includes('video')) return '🎥'
    if (mimeType.includes('audio')) return '🎵'
    return '📄'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleViewFile = (file: any) => {
    if (previewFile && previewFile.id === file.id) {
      // Hide preview if same file is clicked
      setPreviewFile(null)
    } else {
      // Show preview for the selected file
      setPreviewFile(file)
    }
  }

  const handleOpenInNewTab = (file: any) => {
    if (file.mime_type.includes('pdf')) {
      // Generate secure PDF view token
      const viewToken = btoa(JSON.stringify({
        fileId: file.id,
        userId: currentUser.id,
        timestamp: Date.now(),
        restrictions: {
          download: false,
          print: false,
          copy: false,
          screenshot: false
        }
      }))
      window.open(`/api/secure-pdf/${file.id}?token=${viewToken}`, '_blank')
    } else {
      // For other files, use secure file endpoint
      window.open(`/api/secure-file/${file.id}`, '_blank')
    }
  }

  const renderFilePreview = (file: any) => {
    const fileUrl = `/api/secure-file/${file.id}`

    if (file.mime_type.includes('image')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Preview: {file.original_name}</h4>
            <Button
              onClick={() => setPreviewFile(null)}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <img
              src={fileUrl}
              alt={file.original_name}
              className="max-w-full max-h-96 object-contain mx-auto rounded border"
            />
          </div>
        </div>
      )
    }

    if (file.mime_type.includes('pdf')) {
      // Generate secure PDF view token with user information
      const viewToken = btoa(JSON.stringify({
        fileId: file.id,
        userId: currentUser.id,
        timestamp: Date.now(),
        restrictions: {
          download: false,
          print: false,
          copy: false,
          screenshot: false
        }
      }))

      const securePdfUrl = `/api/secure-pdf/${file.id}?token=${viewToken}`

      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Preview: {file.original_name}</h4>
            <Button
              onClick={() => setPreviewFile(null)}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="border rounded bg-white">
            <iframe
              src={securePdfUrl}
              className="w-full h-96"
              title={file.original_name}
            />
          </div>
        </div>
      )
    }

    if (file.mime_type.includes('video')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Preview: {file.original_name}</h4>
            <Button
              onClick={() => setPreviewFile(null)}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <video
              src={fileUrl}
              controls
              className="max-w-full max-h-96 mx-auto rounded border"
            >
              Browser Anda tidak mendukung video HTML5.
            </video>
          </div>
        </div>
      )
    }

    if (file.mime_type.includes('audio')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Preview: {file.original_name}</h4>
            <Button
              onClick={() => setPreviewFile(null)}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <audio
              src={fileUrl}
              controls
              className="w-full max-w-md mx-auto"
            >
              Browser Anda tidak mendukung audio HTML5.
            </audio>
          </div>
        </div>
      )
    }

    // For other file types
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">File: {file.original_name}</h4>
          <Button
            onClick={() => setPreviewFile(null)}
            variant="ghost"
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">{getFileIcon(file.mime_type)}</span>
          <h3 className="text-lg font-semibold mb-2">Preview Tidak Tersedia</h3>
          <p className="text-gray-600 text-sm mb-4">
            File jenis "{file.mime_type}" tidak dapat dipratinjau langsung.
          </p>
          <Button
            onClick={() => handleOpenInNewTab(file)}
            variant="outline"
            size="sm"
          >
            Buka di Tab Baru
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dokumen...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <Button onClick={handleBack} variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Dokumen Tidak Dapat Diakses</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Button onClick={handleBack} variant="outline">
              Kembali
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!document || !currentUser) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <Button onClick={handleBack} variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Akses Diperlukan</h2>
            <p className="text-gray-600 mb-6">Anda perlu login untuk mengakses dokumen ini</p>
            <Button onClick={handleBack} variant="outline">
              Kembali
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button onClick={handleBack} variant="ghost" className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Digital Collection
        </Button>

        {/* Document Header */}
        <div className="mb-8">
          {/* Badges */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">
              {documentType === 'report' ? (
                <><FileText className="h-4 w-4 mr-1" />Laporan</>
              ) : (
                <><BookOpen className="h-4 w-4 mr-1" />Koleksi</>
              )}
            </Badge>
            {documentType === 'report' && document.status && getStatusBadge(document.status)}
            <Badge variant="outline">{document.category}</Badge>
            {document.is_public !== undefined && (
              <Badge variant={document.is_public ? 'default' : 'secondary'}>
                {document.is_public ? 'Publik' : 'Privat'}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {document.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{document.author?.name || document.author?.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(document.created_at), 'dd MMMM yyyy', { locale: id })}</span>
            </div>
          </div>

          {/* Description */}
          {document.description && (
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">{document.description}</p>
            </div>
          )}

          <hr className="border-gray-200 mb-8" />
        </div>

        {/* Document Content */}
        {document.content && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Konten Dokumen</h2>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: document.content }} />
            </div>
            <hr className="border-gray-200 mt-8 mb-8" />
          </div>
        )}

        {/* Files Section */}
        {document.files && document.files.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">File Lampiran ({document.files.length})</h2>

            <div className="space-y-4">
              {document.files.map((file: any) => (
                <div key={file.id}>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{getFileIcon(file.mime_type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {file.original_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {file.mime_type} • {formatFileSize(file.file_size)}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleViewFile(file)}
                      size="sm"
                      variant="outline"
                      className="ml-4"
                    >
                      {previewFile && previewFile.id === file.id ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Tutup
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Lihat
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Inline Preview */}
                  {previewFile && previewFile.id === file.id && renderFilePreview(file)}
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Catatan Keamanan:</strong> File dilindungi dan hanya dapat dilihat dalam mode view-only.
                Download dan print dinonaktifkan untuk keamanan dokumen.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Diakses oleh: {currentUser.name || currentUser.username} • Digital Collection PNS</p>
        </div>
      </div>
    </div>
  )
} 

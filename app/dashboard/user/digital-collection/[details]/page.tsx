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

          {(() => {
            const getCoverImageUrl = () => {
              if (document.cover_image_url) {
                return document.cover_image_url
              }

              if (document.files && document.files.length > 0) {
                const imageFile = document.files.find((file: any) =>
                  file.mime_type?.startsWith('image/') ||
                  file.file_type === 'cover' ||
                  file.original_name?.toLowerCase().includes('cover') ||
                  file.original_name?.toLowerCase().includes('sampul')
                )

                if (imageFile) {
                  return `/uploads/covers/${imageFile.year || new Date(document.created_at).getFullYear()}/${imageFile.batch || 'I'}/${imageFile.filename}`
                }
              }

              return null
            }

            const coverImageUrl = getCoverImageUrl()
            console.log(coverImageUrl)
            if (coverImageUrl) {
              return (
                <div className="mb-12">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Sampul Laporan
                    </h2>
                  </div>

                  {/* Large Cover Image Container */}
                  <div className="relative group">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 rounded-3xl transform rotate-1 scale-105 opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 rounded-3xl transform -rotate-1 scale-105 opacity-20"></div>

                    {/* Main Cover Container */}
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white to-gray-50 p-2 border border-purple-200/50 group-hover:shadow-3xl transition-all duration-500">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100">
                        <img
                          src={coverImageUrl}
                          alt={`Sampul ${document.title}`}
                          className="w-full h-auto max-h-[600px] object-cover rounded-2xl shadow-inner group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            // Smart fallback logic
                            const img = e.currentTarget
                            if (!img.dataset.retryCount) {
                              img.dataset.retryCount = '1'
                              // Try with different year path
                              const reportYear = new Date(document.created_at).getFullYear()
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

                        {/* Elegant Fallback Design */}
                        <div className="fallback-cover hidden w-full h-80 bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 rounded-2xl border-2 border-blue-200 flex items-center justify-center relative overflow-hidden">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
                            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
                          </div>

                          {/* Content */}
                          <div className="text-center relative z-10">
                            <div className="mb-6 relative">
                              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl">
                                <FileText className="h-12 w-12 text-white" />
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                            </div>
                            <div className="text-2xl text-blue-700 font-bold mb-2">Laporan Terverifikasi</div>
                            <div className="text-lg text-blue-600 font-medium">{document.category}</div>
                            <div className="text-sm text-blue-500 mt-2 opacity-75">Sampul tidak tersedia</div>
                          </div>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                        {/* Corner Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => window.open(coverImageUrl, '_blank')}
                        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                        title="Lihat ukuran penuh"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Sampul laporan <span className="font-medium text-gray-700">{document.title}</span>
                    </p>
                  </div>
                </div>
              )
            }
            return null
          })()}

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

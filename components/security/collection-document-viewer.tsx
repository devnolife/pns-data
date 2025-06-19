"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CollectionPDFViewer } from './collection-pdf-viewer'
import {
  FileText,
  BookOpen,
  Image,
  FileImage,
  FileVideo,
  Music,
  Archive,
  File,
  Eye,
  Shield,
  Lock,
  Maximize2,
  Minimize2
} from 'lucide-react'

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

interface CollectionDocumentViewerProps {
  document: any
  user: any
  className?: string
}

export function CollectionDocumentViewer({
  document,
  user,
  className = ""
}: CollectionDocumentViewerProps) {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const [previewExpanded, setPreviewExpanded] = useState(false)

  // Helper function to generate file URL based on schema structure
  const getFileUrl = (file: UploadedFile) => {
    // Use secure endpoint for file access
    return `/api/secure-file/${file.id}`
  }

  // Helper function to get file icon based on mime type
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

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Helper function to get cover image URL from uploaded files
  const getCoverImageUrl = () => {
    if (document.files && document.files.length > 0) {
      // Look for image files first
      const imageFile = document.files.find((file: UploadedFile) =>
        file.mime_type.startsWith('image/') ||
        file.file_type === 'cover' ||
        file.original_name.toLowerCase().includes('cover') ||
        file.original_name.toLowerCase().includes('sampul')
      )

      if (imageFile) {
        return getFileUrl(imageFile)
      }

      // If no specific cover image, use the first image file
      const firstImageFile = document.files.find((file: UploadedFile) => file.mime_type.startsWith('image/'))
      if (firstImageFile) {
        return getFileUrl(firstImageFile)
      }
    }

    // Fallback to cover_image_url field
    return document.cover_image_url || null
  }

  const handleFileSelect = (file: UploadedFile) => {
    setSelectedFile(file)
  }

  const renderFilePreview = () => {
    if (!selectedFile) return null

    const fileUrl = getFileUrl(selectedFile)
    const isImage = selectedFile.mime_type.includes('image')
    const isPDF = selectedFile.mime_type.includes('pdf')

    return (
      <div className={`transition-all duration-300 ${previewExpanded ? 'col-span-2' : ''}`}>
        <Card className="border-0 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon(selectedFile.mime_type, 'h-6 w-6 text-white')}
                <div>
                  <h3 className="font-bold">{selectedFile.original_name}</h3>
                  <div className="flex items-center gap-2 text-blue-100 text-xs mt-1">
                    <span>{formatFileSize(selectedFile.file_size)}</span>
                    <span>•</span>
                    <Lock className="h-3 w-3" />
                    <span>View Only</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setPreviewExpanded(!previewExpanded)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {previewExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={() => setSelectedFile(null)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {isImage ? (
              <div className="text-center">
                <img
                  src={fileUrl}
                  alt={selectedFile.original_name}
                  className={`max-w-full object-contain mx-auto rounded-lg shadow-lg ${previewExpanded ? 'max-h-[600px]' : 'max-h-[400px]'
                    }`}
                />
              </div>
            ) : isPDF ? (
              <div className={previewExpanded ? 'h-[600px]' : 'h-[400px]'}>
                <CollectionPDFViewer
                  fileUrl={fileUrl}
                  fileName={selectedFile.original_name}
                  isPublicAccess={true}
                />
              </div>
            ) : (
              <div className="text-center py-8">
                {getFileIcon(selectedFile.mime_type, 'h-16 w-16 mx-auto mb-4')}
                <h3 className="text-lg font-semibold mb-2">Preview Tidak Tersedia</h3>
                <p className="text-gray-600 text-sm">
                  File jenis "{selectedFile.mime_type}" tidak dapat dipratinjau langsung.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Main Content */}
      <Card className="border-0 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl mb-6">
        <CardContent className="p-6">
          {/* Description */}
          {document.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Deskripsi
              </h3>
              <p className="text-gray-700 leading-relaxed">{document.description}</p>
            </div>
          )}

          {/* Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Konten
            </h3>
            <ScrollArea className="h-[300px] w-full">
              <div
                className="prose prose-sm max-w-none pr-4"
                dangerouslySetInnerHTML={{ __html: document.content }}
              />
            </ScrollArea>
          </div>

          {/* Cover Image */}
          {(() => {
            const coverImageUrl = getCoverImageUrl()
            if (coverImageUrl) {
              return (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Image className="h-5 w-5 text-green-600" />
                    Gambar Sampul
                  </h3>
                  <img
                    src={coverImageUrl}
                    alt={`Sampul ${document.title}`}
                    className="w-full h-auto max-h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )
            }
            return null
          })()}
        </CardContent>
      </Card>

      {/* Files Section */}
      {document.files && document.files.length > 0 && (
        <div className={`grid gap-6 ${selectedFile ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* File List */}
          <Card className="border-0 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                File Lampiran ({document.files.length})
                <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 text-xs">
                  <Lock className="h-3 w-3 mr-1" />
                  View Only
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {document.files.map((file: UploadedFile) => (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${selectedFile?.id === file.id
                        ? 'bg-blue-100 border-2 border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.mime_type, 'h-6 w-6')}
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">{file.original_name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>•</span>
                          <span className="capitalize">{file.mime_type.split('/')[1]}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* File Preview */}
          {selectedFile && renderFilePreview()}
        </div>
      )}
    </div>
  )
} 

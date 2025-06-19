"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Eye, 
  FileText, 
  Image as ImageIcon, 
  File, 
  Download, 
  Lock, 
  Shield,
  Play,
  AlertCircle
} from 'lucide-react'
import { SecurityUtils } from '@/lib/security/config'
import { InlineFilePreview } from './inline-file-preview'

interface FileAttachment {
  id: string
  filename: string
  original_name: string
  file_size: number
  mime_type: string
  file_type?: string | null
  category: string | null
  year: string | null
  batch: string | null
}

interface FilePreviewButtonProps {
  file: FileAttachment
  isPublicAccess?: boolean
  showDownloadOption?: boolean
  variant?: 'default' | 'compact' | 'card'
  className?: string
}

export function FilePreviewButton({ 
  file, 
  isPublicAccess = true,
  showDownloadOption = false,
  variant = 'default',
  className = ''
}: FilePreviewButtonProps) {
  const [previewOpen, setPreviewOpen] = useState(false)

  // File type detection
  const isPreviewable = () => {
    return SecurityUtils.isAllowedFileType(file.mime_type)
  }

  const isPDF = () => file.mime_type === 'application/pdf'
  const isImage = () => file.mime_type.startsWith('image/')
  const isVideo = () => file.mime_type.startsWith('video/')
  const isAudio = () => file.mime_type.startsWith('audio/')

  const getFileIcon = () => {
    if (isPDF()) return <FileText className="h-4 w-4" />
    if (isImage()) return <ImageIcon className="h-4 w-4" />
    if (isVideo()) return <Play className="h-4 w-4" />
    if (isAudio()) return <Play className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const getFileTypeLabel = () => {
    if (isPDF()) return 'PDF'
    if (isImage()) return 'Image'
    if (isVideo()) return 'Video'
    if (isAudio()) return 'Audio'
    return file.mime_type.split('/')[1]?.toUpperCase() || 'File'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handlePreview = () => {
    if (isPreviewable()) {
      setPreviewOpen(true)
    }
  }

  const handleDownload = () => {
    if (!isPublicAccess && showDownloadOption) {
      // Implement download functionality for authenticated users
      console.log('Download file:', file.original_name)
    }
  }

  // Compact variant - just an icon button
  if (variant === 'compact') {
    return (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePreview}
          disabled={!isPreviewable()}
          className={`p-2 ${className}`}
          title={isPreviewable() ? `Preview ${file.original_name}` : 'Preview not available'}
        >
          {isPreviewable() ? (
            <Eye className="h-4 w-4 text-blue-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-gray-400" />
          )}
        </Button>

        <InlineFilePreview
          file={file}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          isPublicAccess={isPublicAccess}
          showDownloadOption={showDownloadOption}
        />
      </>
    )
  }

  // Card variant - full file card with preview
  if (variant === 'card') {
    return (
      <>
        <div 
          className={`group flex items-center gap-4 p-4 bg-gray-50/50 hover:bg-blue-50/50 rounded-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 cursor-pointer ${className}`}
          onClick={handlePreview}
        >
          {/* File Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
            {getFileIcon()}
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-300">
              {file.original_name}
            </h4>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span>{formatFileSize(file.file_size)}</span>
              <span>•</span>
              <span className="capitalize">{getFileTypeLabel()}</span>
              {file.year && (
                <>
                  <span>•</span>
                  <span>Tahun {file.year}</span>
                </>
              )}
              {file.batch && (
                <>
                  <span>•</span>
                  <span>Angkatan {file.batch}</span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* File Type Badge */}
            {isPDF() && (
              <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700">
                PDF
              </Badge>
            )}
            {isImage() && (
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                IMG
              </Badge>
            )}
            
            {/* Preview Status */}
            {isPreviewable() ? (
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                <Eye className="h-4 w-4" />
              </div>
            ) : (
              <div className="p-2 bg-gray-100 text-gray-400 rounded-full" title="Preview not available">
                <AlertCircle className="h-4 w-4" />
              </div>
            )}

            {/* Security Indicator */}
            {isPublicAccess && (
              <div className="p-1 bg-orange-100 text-orange-600 rounded-full" title="View only - No download">
                <Lock className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>

        <InlineFilePreview
          file={file}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          isPublicAccess={isPublicAccess}
          showDownloadOption={showDownloadOption}
        />
      </>
    )
  }

  // Default variant - button with text
  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant={isPreviewable() ? "default" : "outline"}
          size="sm"
          onClick={handlePreview}
          disabled={!isPreviewable()}
          className={`flex items-center gap-2 ${
            isPreviewable() 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPreviewable() ? (
            <>
              <Eye className="h-4 w-4" />
              Preview
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              No Preview
            </>
          )}
        </Button>

        {/* Download button for authenticated users */}
        {showDownloadOption && !isPublicAccess && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        )}

        {/* Security indicator */}
        {isPublicAccess && (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
            <Shield className="h-3 w-3" />
            View Only
          </div>
        )}
      </div>

      <InlineFilePreview
        file={file}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        isPublicAccess={isPublicAccess}
        showDownloadOption={showDownloadOption}
      />
    </>
  )
}

// Helper component for file type indicators
export function FileTypeIndicator({ file }: { file: FileAttachment }) {
  const isPDF = () => file.mime_type === 'application/pdf'
  const isImage = () => file.mime_type.startsWith('image/')
  const isPreviewable = () => SecurityUtils.isAllowedFileType(file.mime_type)

  return (
    <div className="flex items-center gap-1">
      {isPDF() && (
        <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700 text-xs">
          <FileText className="h-3 w-3 mr-1" />
          PDF
        </Badge>
      )}
      {isImage() && (
        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">
          <ImageIcon className="h-3 w-3 mr-1" />
          IMG
        </Badge>
      )}
      {isPreviewable() && (
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs">
          <Eye className="h-3 w-3 mr-1" />
          Previewable
        </Badge>
      )}
      {!isPreviewable() && (
        <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-500 text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          No Preview
        </Badge>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Eye, 
  Shield, 
  Lock, 
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  File,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { SECURITY_CONFIG, SecurityUtils } from '@/lib/security/config'

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

interface InlineFilePreviewProps {
  file: FileAttachment
  isOpen: boolean
  onClose: () => void
  isPublicAccess?: boolean
  showDownloadOption?: boolean
}

export function InlineFilePreview({ 
  file, 
  isOpen, 
  onClose, 
  isPublicAccess = true,
  showDownloadOption = false 
}: InlineFilePreviewProps) {
  const [viewToken, setViewToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [securityAlert, setSecurityAlert] = useState<string | null>(null)
  const [imageZoom, setImageZoom] = useState(1)
  const [imageRotation, setImageRotation] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // File type detection
  const isPreviewable = () => {
    return SecurityUtils.isAllowedFileType(file.mime_type)
  }

  const isPDF = () => file.mime_type === 'application/pdf'
  const isImage = () => file.mime_type.startsWith('image/')
  
  const getFileIcon = () => {
    if (isPDF()) return <FileText className="h-6 w-6" />
    if (isImage()) return <ImageIcon className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Generate secure view token
  const generateViewToken = async () => {
    if (!isPreviewable()) return

    setLoading(true)
    setError(null)

    try {
      // Generate file path based on file structure
      let filePath: string
      if (file.file_type === 'collection' || file.category) {
        filePath = `uploads/collections/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
      } else {
        filePath = `uploads/reports/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
      }

      const response = await fetch('/api/secure-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath,
          isPublic: isPublicAccess
        })
      })

      const result = await response.json()

      if (result.success) {
        setViewToken(result.token)
        SecurityUtils.logSecurityEvent('file_preview_opened', {
          fileName: file.original_name,
          fileType: file.mime_type,
          isPublicAccess
        })
      } else {
        setError(result.error || 'Failed to generate view token')
      }
    } catch (err) {
      setError('Failed to generate secure access token')
      console.error('Token generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Security event handlers
  useEffect(() => {
    if (!isOpen || !isPublicAccess) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (SecurityUtils.isBlockedKeyboardEvent(e)) {
        e.preventDefault()
        e.stopPropagation()
        setSecurityAlert(`Action "${e.key}" blocked for security`)
        setTimeout(() => setSecurityAlert(null), 2000)
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setSecurityAlert('Right-click menu disabled for security')
      setTimeout(() => setSecurityAlert(null), 2000)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [isOpen, isPublicAccess])

  // Generate token when dialog opens
  useEffect(() => {
    if (isOpen && !viewToken) {
      generateViewToken()
    }
  }, [isOpen])

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setViewToken(null)
      setError(null)
      setImageZoom(1)
      setImageRotation(0)
      setIsFullscreen(false)
    }
  }, [isOpen])

  // Image manipulation handlers
  const handleZoomIn = () => {
    setImageZoom(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setImageZoom(prev => Math.max(prev - 0.25, 0.25))
  }

  const handleRotate = () => {
    setImageRotation(prev => (prev + 90) % 360)
  }

  const handleResetView = () => {
    setImageZoom(1)
    setImageRotation(0)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Render preview content
  const renderPreviewContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Generating secure preview...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <Alert className="max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )
    }

    if (!isPreviewable()) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center max-w-md">
            <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Preview Not Available</h3>
            <p className="text-gray-500 mb-4">
              This file type ({file.mime_type}) cannot be previewed in the browser for security reasons.
            </p>
            {isPublicAccess && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-orange-700 mb-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Public Access Restriction</span>
                </div>
                <p className="text-xs text-orange-600">
                  File viewing is limited for public access. Please login for additional file type support.
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (!viewToken) return null

    const secureUrl = `/api/secure-file?token=${encodeURIComponent(viewToken)}&file=${encodeURIComponent(
      file.file_type === 'collection' || file.category
        ? `uploads/collections/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
        : `uploads/reports/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
    )}&mode=view`

    if (isPDF()) {
      return (
        <div className="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
          {/* PDF Security Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute top-4 left-4 bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200 z-20">
              <Lock className="h-3 w-3 inline mr-1" />
              VIEW ONLY
            </div>
            <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 z-20">
              <Shield className="h-3 w-3 inline mr-1" />
              NO DOWNLOAD
            </div>
          </div>
          
          <iframe
            src={`${secureUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit`}
            className="w-full h-full border-0"
            title={`PDF Preview - ${file.original_name}`}
            sandbox="allow-same-origin allow-scripts"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
      )
    }

    if (isImage()) {
      return (
        <div className="relative">
          {/* Image Controls */}
          <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={imageZoom <= 0.25}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(imageZoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={imageZoom >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetView}
              >
                Reset
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Image Container */}
          <div className={`relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center ${
            isFullscreen ? 'h-[80vh]' : 'h-[60vh]'
          }`}>
            {/* Security Watermarks */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-4 left-4 bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                <Lock className="h-3 w-3 inline mr-1" />
                VIEW ONLY
              </div>
              <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                <Shield className="h-3 w-3 inline mr-1" />
                NO DOWNLOAD
              </div>
              
              {/* Diagonal watermarks */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-gray-300/20 text-xl font-bold transform rotate-45 select-none pointer-events-none"
                  style={{
                    top: `${(i % 4) * 25}%`,
                    left: `${Math.floor(i / 4) * 50}%`,
                    transform: 'rotate(-45deg)',
                    userSelect: 'none'
                  }}
                >
                  VIEW ONLY
                </div>
              ))}
            </div>
            
            <img
              ref={imageRef}
              src={secureUrl}
              alt={file.original_name}
              className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
              style={{
                transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'none'
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-6xl ${isFullscreen ? 'max-h-[95vh] w-[95vw]' : 'max-h-[85vh] w-[90vw]'} p-0 gap-0`}>
        {/* Security Alert */}
        {securityAlert && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[60]">
            <Alert className="bg-red-50 border-red-200 shadow-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                {securityAlert}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                {getFileIcon()}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{file.original_name}</DialogTitle>
                <div className="flex items-center gap-4 text-blue-100 text-sm mt-1">
                  <span>{formatFileSize(file.file_size)}</span>
                  <span>•</span>
                  <span className="capitalize">{file.mime_type.split('/')[1]}</span>
                  {isPublicAccess && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        <span>View Only</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showDownloadOption && !isPublicAccess && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  disabled={isPublicAccess}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 overflow-auto">
          {renderPreviewContent()}
        </div>

        {/* Security Footer */}
        {isPublicAccess && (
          <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 border-t border-orange-200/50 p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100/80 rounded-lg">
                <Shield className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-orange-800">🔒 Secure Preview Mode</div>
                <p className="text-xs text-orange-700">
                  File is protected with view-only access. Download, copy, and print functions are disabled.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="font-medium">Protected</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

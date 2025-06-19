"use client"

import { useState, useEffect } from 'react'
import { Shield, Eye, Lock, AlertTriangle, FileText, Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SecureFileViewerProps {
  file: {
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
  isPublicAccess?: boolean
  onClose?: () => void
}

export function SecureFileViewer({ file, isPublicAccess = true, onClose }: SecureFileViewerProps) {
  const [viewToken, setViewToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [securityAlert, setSecurityAlert] = useState<string | null>(null)

  // Generate secure view token
  const generateViewToken = async () => {
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

  useEffect(() => {
    generateViewToken()
  }, [file.id])

  // Enhanced security measures
  useEffect(() => {
    if (!isPublicAccess) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common shortcuts
      const blockedCombinations = [
        { ctrl: true, key: 'c' }, // Copy
        { ctrl: true, key: 'a' }, // Select All
        { ctrl: true, key: 's' }, // Save
        { ctrl: true, key: 'p' }, // Print
        { key: 'F12' }, // Developer Tools
        { ctrl: true, shift: true, key: 'I' }, // Developer Tools
        { ctrl: true, shift: true, key: 'J' }, // Console
        { ctrl: true, key: 'u' }, // View Source
        { key: 'PrintScreen' }, // Screenshot
      ]

      const isBlocked = blockedCombinations.some(combo => {
        const ctrlMatch = combo.ctrl ? e.ctrlKey : !e.ctrlKey
        const shiftMatch = combo.shift ? e.shiftKey : !e.shiftKey
        return ctrlMatch && shiftMatch && combo.key.toLowerCase() === e.key.toLowerCase()
      })

      if (isBlocked) {
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
  }, [isPublicAccess])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

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

  const renderSecureViewer = () => {
    if (!viewToken) return null

    const secureUrl = `/api/secure-file?token=${encodeURIComponent(viewToken)}&file=${encodeURIComponent(
      file.file_type === 'collection' || file.category
        ? `uploads/collections/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
        : `uploads/reports/${file.year || '2023'}/${file.batch || 'I'}/${file.filename}`
    )}&mode=view`

    if (file.mime_type.includes('pdf')) {
      return (
        <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          {/* Security overlay for PDF */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Watermark */}
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
            title={`PDF Viewer - ${file.original_name}`}
            sandbox="allow-same-origin allow-scripts"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
      )
    }

    if (file.mime_type.includes('image')) {
      return (
        <div className="relative w-full max-h-[600px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Security overlay for images */}
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
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-gray-300/20 text-2xl font-bold transform rotate-45 select-none pointer-events-none"
                style={{
                  top: `${(i % 3) * 33}%`,
                  left: `${Math.floor(i / 3) * 50}%`,
                  transform: 'rotate(-45deg)',
                  userSelect: 'none'
                }}
              >
                VIEW ONLY
              </div>
            ))}
          </div>
          
          <img
            src={secureUrl}
            alt={file.original_name}
            className="max-w-full max-h-full object-contain select-none"
            style={{
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
      )
    }

    // For other file types, show preview not available message
    return (
      <div className="w-full h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Preview Not Available</h3>
          <p className="text-gray-500 mb-4">
            This file type cannot be previewed in the browser for security reasons.
          </p>
          {isPublicAccess && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-orange-700">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Public Access Restriction</span>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                File viewing is limited for public access. Please login for full access.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{getFileIcon(file.mime_type)}</div>
              <div>
                <h2 className="text-xl font-bold">{file.original_name}</h2>
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

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating secure access...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <Alert className="max-w-md">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {!loading && !error && renderSecureViewer()}
        </div>

        {/* Security Footer */}
        {isPublicAccess && (
          <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 border-t border-orange-200/50 p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100/80 rounded-lg">
                <Shield className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-orange-800">🔒 Secure View Mode Active</div>
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
      </div>
    </div>
  )
}

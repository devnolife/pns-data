"use client"

import { Loader2, FileText, Image as ImageIcon, File, Shield } from 'lucide-react'

interface FilePreviewLoadingProps {
  fileName?: string
  fileType?: string
  isPublicAccess?: boolean
  message?: string
}

export function FilePreviewLoading({ 
  fileName = "File", 
  fileType = "file",
  isPublicAccess = true,
  message = "Generating secure preview..."
}: FilePreviewLoadingProps) {
  const getFileIcon = () => {
    if (fileType.includes('pdf')) return <FileText className="h-8 w-8 text-red-600" />
    if (fileType.includes('image')) return <ImageIcon className="h-8 w-8 text-green-600" />
    return <File className="h-8 w-8 text-gray-600" />
  }

  return (
    <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Animated File Icon */}
        <div className="relative mb-6">
          <div className="animate-pulse">
            {getFileIcon()}
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="p-1 bg-blue-100 rounded-full">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Preparing Preview
        </h3>
        <p className="text-gray-600 mb-4">
          {message}
        </p>

        {/* File Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 mb-4">
          <div className="text-sm font-medium text-gray-800 truncate mb-1">
            {fileName}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {fileType} file
          </div>
        </div>

        {/* Security Indicator */}
        {isPublicAccess && (
          <div className="flex items-center justify-center gap-2 text-xs text-orange-600">
            <Shield className="h-3 w-3" />
            <span>Secure view-only mode</span>
          </div>
        )}

        {/* Loading Progress Animation */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" 
                 style={{ width: '60%' }} />
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Applying security measures...
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton loader for file cards
export function FileCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        {/* File Icon Skeleton */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-lg" />
        
        {/* File Info Skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        
        {/* Action Button Skeleton */}
        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}

// Grid skeleton for multiple files
export function FileGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <FileCardSkeleton key={i} />
      ))}
    </div>
  )
}

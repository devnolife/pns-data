import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header Skeleton */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg w-80 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-6 bg-blue-100 rounded-full w-24 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-96 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Search Skeleton */}
        <div className="flex gap-2 max-w-md">
          <div className="h-10 bg-white/70 backdrop-blur-md rounded-md flex-1 animate-pulse border border-gray-200" />
          <div className="h-10 bg-gradient-to-r from-purple-200 to-pink-200 rounded-md w-20 animate-pulse" />
        </div>
      </div>

      {/* Reports Grid Skeleton with Cover Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group relative overflow-hidden">
            {/* Card Background */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border-0 shadow-xl overflow-hidden">

              {/* Cover Image Skeleton */}
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative">
                {/* Simulated Cover Image Loading */}
                <div className="w-full h-full animate-pulse bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <div className="text-center text-purple-400">
                    <div className="h-16 w-16 bg-purple-300 rounded-full mx-auto mb-3 animate-pulse" />
                    <div className="h-4 bg-purple-300 rounded w-24 mx-auto animate-pulse" />
                  </div>
                </div>
                {/* Loading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-purple-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </div>
                  <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-20 animate-pulse" />
                </div>

                {/* Author info */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Floating Animation */}
            <div
              className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Loading Indicator */}
      <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-purple-200/50">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent" />
          <div className="text-sm font-medium text-purple-700">
            🔒 Memuat Koleksi Publik...
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
    </div>
  )
}

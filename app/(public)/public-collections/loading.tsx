import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg w-80 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-6 bg-blue-100 rounded-full w-24 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-96 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Search Skeleton */}
        <div className="flex gap-2 max-w-md">
          <div className="h-10 bg-gray-100 rounded-md flex-1 animate-pulse" />
          <div className="h-10 bg-blue-100 rounded-md w-20 animate-pulse" />
        </div>
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group relative overflow-hidden">
            {/* Card Background */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg relative">
                  <div className="h-7 w-7 bg-white/20 rounded animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 border border-blue-200/50">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -mr-8 -mt-8" />
                  <div className="relative space-y-2">
                    <div className="h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-12 animate-pulse" />
                    <div className="h-4 bg-blue-100 rounded w-16 animate-pulse" />
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 border border-emerald-200/50">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full -mr-8 -mt-8" />
                  <div className="relative space-y-2">
                    <div className="h-8 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded w-12 animate-pulse" />
                    <div className="h-4 bg-emerald-100 rounded w-16 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <div className="flex-1 h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-md animate-pulse" />
                <div className="flex-1 h-10 bg-gray-100 border-2 border-gray-200 rounded-md animate-pulse" />
              </div>
            </div>

            {/* Floating Animation */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl border border-blue-200/50">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent" />
          <div className="text-sm font-medium text-blue-700">
            🔒 Public Access Mode
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

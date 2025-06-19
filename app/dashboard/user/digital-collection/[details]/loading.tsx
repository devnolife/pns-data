import { Card, CardContent } from '@/components/ui/card'

export default function DocumentDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-48 bg-white/70 rounded-xl animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="h-8 w-20 bg-white/70 rounded-full animate-pulse" />
                <div className="h-8 w-16 bg-white/70 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-32 bg-white/60 rounded-full animate-pulse" />
              <div className="h-4 w-4 bg-purple-400/50 rounded animate-pulse" />
              <div className="h-8 w-28 bg-purple-100 rounded-full animate-pulse" />
            </div>

            {/* Title Header Skeleton */}
            <Card className="border-0 bg-white/60 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl animate-pulse" />
                  <div className="flex-1 space-y-4">
                    <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-20 bg-blue-200 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-green-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="w-20 h-24 bg-green-100 rounded-lg animate-pulse" />
                </div>
              </div>
            </Card>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6 mb-8">
            {/* Security Header Skeleton */}
            <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-200 rounded-lg animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-60 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-green-200 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-blue-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Document Header Skeleton */}
            <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-32 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-4">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Content Area Skeleton */}
            <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
              <div className="p-8">
                <div className="space-y-4">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    ))}
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer Skeleton */}
          <Card className="border-0 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-md shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 

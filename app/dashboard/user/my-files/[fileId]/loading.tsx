import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  Eye,
  FileText,
  Download,
  Trash2,
  Home,
  ChevronRight
} from 'lucide-react'

export default function FileDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20 rounded-xl shadow-lg px-4 py-2">
                <ArrowLeft className="h-4 w-4 text-purple-400 animate-pulse" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl shadow-lg px-4 py-2">
                  <Download className="h-4 w-4 text-blue-400 animate-pulse" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-2 border-red-200/50 bg-red-50/50 rounded-xl px-4 py-2">
                  <Trash2 className="h-4 w-4 text-red-400 animate-pulse" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm mb-6">
              <div className="h-8 px-3 bg-white/60 backdrop-blur-sm rounded-full flex items-center gap-1">
                <Home className="h-3 w-3 text-purple-400 animate-pulse" />
                <Skeleton className="h-3 w-12" />
              </div>
              <ChevronRight className="h-4 w-4 text-purple-400 animate-pulse" />
              <div className="h-8 px-3 bg-purple-100/60 rounded-full flex items-center gap-1">
                <Eye className="h-3 w-3 text-purple-600 animate-pulse" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* File Header */}
            <Card className="border-0 bg-white/60 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
              <CardHeader className="relative p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileText className="h-10 w-10 text-blue-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-8 w-3/4 mb-4" />

                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>

                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Card className="bg-green-50/80 border-green-200/50">
                      <CardContent className="p-4 text-center">
                        <Eye className="h-6 w-6 text-green-400 mx-auto mb-2 animate-pulse" />
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* File Preview Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl mb-8">
            <CardContent className="p-0">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-400 animate-pulse" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-32" />
                </div>

                <div className="p-12 flex justify-center items-center min-h-[400px]">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <FileText className="h-16 w-16 text-gray-400 animate-pulse" />
                    </div>
                    <Skeleton className="h-6 w-48 mb-4 mx-auto" />
                    <Skeleton className="h-4 w-72 mb-8 mx-auto" />

                    <div className="space-y-3 max-w-md mx-auto">
                      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl p-3">
                        <Download className="h-4 w-4 text-blue-400 animate-pulse" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl p-3">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Info Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-400 animate-pulse" />
                <Skeleton className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Skeleton className="h-3 w-24 mb-2" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card className="border-0 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-md shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100/50 rounded-lg">
                    <div className="h-5 w-5 bg-blue-400/50 rounded animate-pulse" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 

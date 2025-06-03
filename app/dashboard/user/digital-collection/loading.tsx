import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header skeleton with gradient */}
      <div className="mb-8 text-center">
        <div className="h-10 w-80 mx-auto mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-2xl animate-pulse" />
        <div className="h-5 w-96 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
      </div>

      {/* Floating breadcrumb skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-8 w-24 bg-white/60 backdrop-blur-sm rounded-full animate-pulse shadow-lg" />
          <div className="text-purple-400 animate-bounce">✨</div>
          <div className="h-8 w-32 bg-white/60 backdrop-blur-sm rounded-full animate-pulse shadow-lg" />
        </div>
      </div>

      {/* Modern search skeleton */}
      <div className="mb-8 flex justify-center">
        <div className="h-12 w-96 bg-white/70 backdrop-blur-md rounded-2xl animate-pulse shadow-xl border border-white/20" />
      </div>

      {/* Trendy grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className="group overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl animate-pulse"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <CardHeader className="pb-3 p-6">
              <div className="flex items-center gap-4">
                {/*  className="max-w-4xl max-h-[85vh] w-[90vw] z-50" icon skeleton */}
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 animate-pulse shadow-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse" />
                  <div className="h-3 w-3/4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-purple-200 rounded-lg animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-10 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full animate-pulse" />
              </div>
            </CardContent>

            {/* Floating elements for extra Gen Z vibes */}
            <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-70"
              style={{ animationDelay: `${index * 200}ms` }} />
          </Card>
        ))}
      </div>

      {/* Floating decorative elements with Tailwind animations */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}

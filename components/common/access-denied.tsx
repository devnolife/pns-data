import { Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AccessDeniedProps {
  title?: string
  description?: string
  previewItems?: Array<{ id: string; title: string }>
  className?: string
}

export function AccessDenied({
  title = "Akses Terbatas 🔒",
  description = "Untuk mengakses koleksi laporan yang absolutely amazing, silakan isi buku tamu terlebih dahulu! ✨",
  previewItems = [],
  className = ""
}: AccessDeniedProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 ${className}`}>
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-8">
              <CardTitle className="text-3xl font-bold mb-2">Koleksi Laporan Menanti Anda 🚀</CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Dapatkan akses ke ribuan laporan berkualitas tinggi yang totally epic!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {previewItems.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {previewItems.slice(0, 4).map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200 shadow-lg"
                    >
                      <p className="text-sm font-bold text-gray-800 line-clamp-2">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-1">Laporan Berkualitas</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center">
                <a
                  href="/guestbook"
                  className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Isi Buku Tamu Sekarang ✨
                </a>
                <p className="text-xs text-gray-500 mt-4">
                  Gratis dan hanya membutuhkan waktu 2 menit! No cap! 😎
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-bounce">📚</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-purple-600 mb-2">Memuat Koleksi Digital</h2>
        <p className="text-purple-500">Sedang menyiapkan dokumen terbaik untuk Anda...</p>

        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

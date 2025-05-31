"use client"

import { useState, useEffect } from "react"
import { GuestbookForm } from "@/components/common/guestbook-form"
import { getGuestbookEntriesAction } from "@/lib/actions/guestbook"

interface GuestbookEntry {
  id: string
  name: string
  email?: string | null
  message: string
  createdAt: Date
  author?: {
    id: string
    username: string
    name: string | null
  } | null
}

export default function GuestbookPage() {
  const [recentEntries, setRecentEntries] = useState<GuestbookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load entries from database
  const loadEntries = async () => {
    setIsLoading(true)
    try {
      const result = await getGuestbookEntriesAction(1, 10)
      if (result.success && result.entries) {
        setRecentEntries(result.entries)
      }
    } catch (error) {
      console.error('Error loading guestbook entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [])

  // Function to refresh entries after new submission
  const handleSubmitSuccess = () => {
    loadEntries()
    // Redirect to public collections page after successful submission
    window.location.href = "/public-collections"
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto py-16 px-4 md:px-6">
          <div className="text-center text-white">
            <div className="animate-float mb-6">
              <span className="text-6xl md:text-8xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-pulse">
              Buku Tamu Digital
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Bagikan pemikiran, energi, dan tinggalkan jejak Anda di sini! 💫
            </p>
            <div className="flex justify-center gap-4 text-2xl md:text-3xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>🌈</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>⭐</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎉</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Isi Buku Tamu
                </h2>
                <p className="text-purple-100 mt-2">Ceritakan pengalaman Anda bersama kami! ✨</p>
              </div>
              <div className="p-6">
                <GuestbookForm onSubmitSuccess={handleSubmitSuccess} />
              </div>
            </div>
          </div>

          {/* Entries Section */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🌟</span>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Pengunjung Terbaru
                </h2>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3 text-purple-600">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    <p className="font-medium">Memuat data...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {recentEntries.length === 0 ? (
                    <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                      <span className="text-6xl mb-4 block">🤔</span>
                      <p className="text-gray-600 font-medium">Belum ada entri...</p>
                      <p className="text-sm text-gray-500 mt-1">Jadilah yang pertama berbagi cerita! 💫</p>
                    </div>
                  ) : (
                    recentEntries.map((entry, index) => (
                      <div
                        key={entry.id}
                        className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {entry.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                  {entry.name}
                                </h3>
                                {entry.email && (
                                  <p className="text-xs text-gray-500">{entry.email}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                <span>🕐</span>
                                {new Date(entry.createdAt).toLocaleDateString("id-ID", {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-400">
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                              {entry.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

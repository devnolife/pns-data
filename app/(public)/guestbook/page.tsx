"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GuestbookForm } from "@/components/common/guestbook-form"
import { getGuestbookEntriesAction } from "@/lib/actions/guestbook"

interface GuestbookEntry {
  id: string
  name: string
  email?: string
  message: string
  institution: string
  membership: string
  visitPurpose: string
  createdAt: Date
}

export default function GuestbookPage() {
  const router = useRouter()
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
    router.push("/public-collections")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Buku Tamu Digital
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Bagikan pemikiran dan tinggalkan jejak Anda di sini.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary p-6">
                <h2 className="text-2xl font-bold text-white">
                  Isi Buku Tamu
                </h2>
                <p className="text-primary-foreground/80 mt-2">Ceritakan pengalaman Anda bersama kami.</p>
              </div>
              <div className="p-6">
                <GuestbookForm onSubmitSuccess={handleSubmitSuccess} />
              </div>
            </div>
          </div>

          {/* Entries Section */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Pengunjung Terbaru
              </h2>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3 text-primary">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <p className="font-medium">Memuat data...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {recentEntries.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                      <p className="text-gray-600 font-medium">Belum ada entri</p>
                      <p className="text-sm text-gray-500 mt-1">Jadilah yang pertama berbagi cerita</p>
                    </div>
                  ) : (
                    recentEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow transition-all duration-300"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {entry.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">
                                  {entry.name}
                                </h3>
                                {entry.email && (
                                  <p className="text-xs text-gray-500">{entry.email}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {new Date(entry.createdAt).toLocaleDateString("id-ID", {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary">
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

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9CA3AF;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  )
}

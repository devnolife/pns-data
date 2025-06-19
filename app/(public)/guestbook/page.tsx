"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GuestbookForm } from "@/components/common/guestbook-form"
import { getGuestbookEntriesAction } from "@/lib/actions/guestbook"
import { LoadingState } from "@/components/common/loading-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"

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
        setRecentEntries(result.entries as any)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Buku Tamu Digital ✨
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Bagikan pengalaman Anda dan tinggalkan jejak kunjungan
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Isi Buku Tamu
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Ceritakan pengalaman Anda dan dapatkan akses koleksi digital
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <GuestbookForm onSubmitSuccess={handleSubmitSuccess} />
              </CardContent>
            </Card>
          </div>

          {/* Entries Section */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                Pengunjung Terbaru
              </h2>

              {isLoading ? (
                <LoadingState message="Memuat data..." />
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {recentEntries.length === 0 ? (
                    <Card className="text-center py-12 bg-white/70 backdrop-blur-md border-0 shadow-lg">
                      <CardContent className="p-8">
                        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Belum ada entri</p>
                        <p className="text-sm text-gray-500 mt-1">Jadilah yang pertama berbagi cerita</p>
                      </CardContent>
                    </Card>
                  ) : (
                    recentEntries.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                          <CardContent className="p-5">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
                                <Badge variant="outline" className="text-xs">
                                  {new Date(entry.createdAt).toLocaleDateString("id-ID", {
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </Badge>
                              </div>

                              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-purple-500">
                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                  {entry.message}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
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

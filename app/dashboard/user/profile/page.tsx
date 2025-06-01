"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Mail, Building, Phone, Shield, Loader2, User, Settings, Lock, Edit3, Camera, Star, Sparkles, FileText, MessageSquare, FolderOpen } from "lucide-react"
import { updateOwnProfileAction, changeOwnPasswordAction, getOwnProfileAction } from "@/lib/actions/users"

// User type with additional stats
interface UserProfile {
  id: string
  username: string
  email: string
  name: string | null
  role: "USER" | "ADMIN" | "MODERATOR"
  avatar: string | null
  training: string | null
  angkatan: string | null
  phone: string | null
  created_at: Date
  updated_at: Date
  _count: {
    collections: number
    reports_reports_author_idTousers: number
    guestbook_entries: number
  }
}

export default function ProfilePage() {
  const { isAuthenticated, isLoading: authLoading, refreshUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [updating, setUpdating] = useState(false)
  const [profileError, setProfileError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true)
      const result = await getOwnProfileAction()

      if (result.success && result.data) {
        setUserProfile(result.data)
        setProfileData({
          name: result.data.name || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
        })
      } else {
        toast({
          title: "Error! 😔",
          description: result.error || "Gagal memuat data profil",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Fetch profile error:', error)
      toast({
        title: "Error! 😔",
        description: "Terjadi kesalahan saat memuat profil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated) {
      fetchUserProfile()
    }
  }, [isAuthenticated, authLoading, router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setProfileError("")

    try {
      const result = await updateOwnProfileAction({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      })

      if (!result.success) {
        setProfileError(result.error || "Gagal memperbarui profil")
        toast({
          title: "Error! 😔",
          description: result.error || "Gagal memperbarui profil",
          variant: "destructive",
        })
      } else {
        // Refresh user data in context and local state
        await refreshUser()
        await fetchUserProfile()
        toast({
          title: "Berhasil! 🎉",
          description: result.message || "Profil Anda telah diperbarui dengan sukses! ✨",
        })
      }
    } catch (error) {
      console.error('Profile update error:', error)
      setProfileError("Terjadi kesalahan saat memperbarui profil")
      toast({
        title: "Error! 😔",
        description: "Terjadi kesalahan saat memperbarui profil",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setPasswordError("")

    try {
      const result = await changeOwnPasswordAction({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      })

      if (!result.success) {
        setPasswordError(result.error || "Gagal mengubah password")
        toast({
          title: "Error! 😔",
          description: result.error || "Gagal mengubah password",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Berhasil! 🎉",
          description: result.message || "Password Anda telah diperbarui dengan sukses! 🔐",
        })
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }
    } catch (error) {
      console.error('Password change error:', error)
      setPasswordError("Terjadi kesalahan saat mengubah password")
      toast({
        title: "Error! 😔",
        description: "Terjadi kesalahan saat mengubah password",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (authLoading || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-gray-600 font-medium">Memuat profil Anda... ✨</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <p className="text-gray-600 font-medium">Gagal memuat data profil 😔</p>
          <Button onClick={fetchUserProfile} className="mt-4">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header with modern styling */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full mb-4 shadow-lg border border-white/20">
          <User className="h-4 w-4 text-purple-500 animate-pulse" />
          <span className="text-purple-700 font-semibold text-sm">Profile Zone</span>
          <Settings className="h-4 w-4 text-pink-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Profil Saya ✨
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Kelola informasi pribadi dan pengaturan akun Anda dengan mudah! 🚀
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card - Left Side */}
          <Card className="lg:col-span-1 overflow-hidden bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar with modern styling */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse blur-md opacity-50"></div>
                  <Avatar className="relative h-24 w-24 border-4 border-white shadow-xl">
                    <AvatarImage src={userProfile.avatar || "/diverse-avatars.png"} alt={userProfile.name || "User"} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {userProfile.name?.charAt(0) || userProfile.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-2 border-white shadow-lg"
                  >
                    <Camera className="h-3 w-3 text-white" />
                  </Button>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-1">{userProfile.name || userProfile.username}</h2>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-1">
                  <Star className="h-3 w-3 text-purple-500" />
                  <span className="text-purple-700 font-semibold text-xs">{userProfile.training || "Belum ada pelatihan"} Participant</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{userProfile.angkatan || "Belum ada angkatan"} • 2024</p>

                {/* Stats Cards */}
                <div className="w-full space-y-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-100 rounded-lg">
                        <FolderOpen className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-blue-600 font-semibold">Koleksi</p>
                        <p className="text-xs text-gray-700">{userProfile._count.collections} koleksi</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-green-100 rounded-lg">
                        <FileText className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-green-600 font-semibold">Laporan</p>
                        <p className="text-xs text-gray-700">{userProfile._count.reports_reports_author_idTousers} laporan</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-orange-100 rounded-lg">
                        <MessageSquare className="h-3 w-3 text-orange-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-orange-600 font-semibold">Buku Tamu</p>
                        <p className="text-xs text-gray-700">{userProfile._count.guestbook_entries} entri</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info with modern cards */}
                <div className="w-full space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-blue-100 rounded-lg">
                        <Mail className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-blue-600 font-semibold">Email</p>
                        <p className="text-xs text-gray-700">{userProfile.email || "Belum ada email"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-green-100 rounded-lg">
                        <Phone className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-green-600 font-semibold">Telepon</p>
                        <p className="text-xs text-gray-700">{userProfile.phone || "Belum ada nomor telepon"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-purple-100 rounded-lg">
                        <Shield className="h-3 w-3 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-purple-600 font-semibold">Bergabung</p>
                        <p className="text-xs text-gray-700">
                          {userProfile.created_at ? new Date(userProfile.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : "Tanggal tidak tersedia"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content - Right Side */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6 bg-white/70 backdrop-blur-md border-0 shadow-lg rounded-xl p-1">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-semibold transition-all duration-300"
                >
                  <Edit3 className="h-4 w-4" />
                  Informasi Profil
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-semibold transition-all duration-300"
                >
                  <Lock className="h-4 w-4" />
                  Ubah Password
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="overflow-hidden bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl">
                  <form onSubmit={handleProfileSubmit}>
                    <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Edit3 className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold mb-1">Informasi Profil 📝</CardTitle>
                          <CardDescription className="text-blue-100">
                            Perbarui detail pribadi Anda dengan mudah! ✨
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                          <Sparkles className="h-5 w-5 text-pink-300 animate-bounce" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {profileError && (
                        <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm rounded-xl">
                          <AlertDescription className="text-red-700 font-medium">{profileError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            👤 Nama Lengkap
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            📧 Alamat Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            📱 Nomor Telepon
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                            placeholder="Masukkan nomor telepon"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="training" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            🎓 Program Pelatihan
                          </Label>
                          <Input
                            id="training"
                            name="training"
                            value={userProfile.training || ""}
                            className="bg-gray-100/70 backdrop-blur-sm border-gray-200/20 rounded-xl shadow-md"
                            placeholder="Program pelatihan"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="batch" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            👥 Angkatan
                          </Label>
                          <Input
                            id="batch"
                            name="batch"
                            value={userProfile.angkatan || ""}
                            className="bg-gray-100/70 backdrop-blur-sm border-gray-200/20 rounded-xl shadow-md"
                            placeholder="Angkatan"
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            🏷️ Username
                          </Label>
                          <Input
                            id="username"
                            name="username"
                            value={userProfile.username}
                            className="bg-gray-100/70 backdrop-blur-sm border-gray-200/20 rounded-xl shadow-md"
                            placeholder="Username"
                            readOnly
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 bg-gray-50/50 backdrop-blur-sm">
                      <Button
                        type="submit"
                        disabled={updating}
                        className="px-6 py-2 font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                      >
                        {updating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Menyimpan... 🚀
                          </>
                        ) : (
                          <>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Simpan Perubahan ✨
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card className="overflow-hidden bg-gradient-to-br from-red-50/80 via-pink-50/80 to-purple-50/80 backdrop-blur-md border-0 shadow-xl rounded-2xl">
                  <form onSubmit={handlePasswordSubmit}>
                    <CardHeader className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Lock className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold mb-1">Ubah Password 🔐</CardTitle>
                          <CardDescription className="text-red-100">
                            Perbarui password akun Anda untuk keamanan yang lebih baik! 🛡️
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Shield className="h-5 w-5 text-yellow-300 animate-pulse" />
                          <Sparkles className="h-5 w-5 text-pink-300 animate-bounce" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {passwordError && (
                        <Alert className="border-red-200 bg-red-100/80 backdrop-blur-sm rounded-xl mb-6">
                          <AlertDescription className="text-red-700 font-medium">{passwordError}</AlertDescription>
                        </Alert>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Password Fields */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              🔑 Password Saat Ini
                            </Label>
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="bg-white/80 backdrop-blur-sm border-red-200/50 rounded-xl shadow-sm focus:shadow-md transition-all duration-300 focus:ring-2 focus:ring-red-400 focus:border-red-400"
                              placeholder="Masukkan password saat ini"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              🆕 Password Baru
                            </Label>
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="bg-white/80 backdrop-blur-sm border-red-200/50 rounded-xl shadow-sm focus:shadow-md transition-all duration-300 focus:ring-2 focus:ring-red-400 focus:border-red-400"
                              placeholder="Masukkan password baru (min. 8 karakter)"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              ✅ Konfirmasi Password Baru
                            </Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="bg-white/80 backdrop-blur-sm border-red-200/50 rounded-xl shadow-sm focus:shadow-md transition-all duration-300 focus:ring-2 focus:ring-red-400 focus:border-red-400"
                              placeholder="Konfirmasi password baru"
                              required
                            />
                          </div>

                          <div className="pt-4">
                            <Button
                              type="submit"
                              disabled={updating}
                              className="w-full px-6 py-3 font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              {updating ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Memperbarui... 🔄
                                </>
                              ) : (
                                <>
                                  <Lock className="mr-2 h-4 w-4" />
                                  Ubah Password 🔐
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Right Column - Security Tips */}
                        <div className="space-y-4">
                          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 h-fit">
                            <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                              💡 Tips Keamanan Password
                            </h4>
                            <ul className="text-sm text-yellow-700 space-y-3">
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>Gunakan minimal 8 karakter untuk keamanan optimal</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>Kombinasikan huruf besar, kecil, angka, dan simbol</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>Hindari menggunakan informasi pribadi seperti nama atau tanggal lahir</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>Gunakan password yang unik untuk setiap akun</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>Pertimbangkan menggunakan password manager</span>
                              </li>
                            </ul>
                          </div>

                          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                              🔒 Keamanan Akun
                            </h4>
                            <div className="text-sm text-blue-700 space-y-2">
                              <p>Password terakhir diubah:</p>
                              <p className="font-medium text-blue-800">
                                {userProfile.updated_at ? new Date(userProfile.updated_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : "Belum pernah diubah"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

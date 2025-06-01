import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FolderOpen, Upload, User, Activity, TrendingUp, Clock, Plus } from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Selamat Datang Kembali!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Kelola koleksi digital Anda, unggah laporan, dan pantau kemajuan Anda dalam satu tempat.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Koleksi</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Laporan Diunggah</p>
                <p className="text-3xl font-bold">48</p>
              </div>
              <Upload className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Bulan Ini</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Aktivitas Terakhir</p>
                <p className="text-xl font-bold">2 hari lalu</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Aksi Cepat</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Koleksi Digital</CardTitle>
                  <CardDescription className="text-gray-600">Jelajahi dan atur file Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Akses semua koleksi digital Anda dalam satu ruang yang terorganisir.</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Link href="/dashboard/user/digital-collection" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Lihat Koleksi
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Unggah Laporan</CardTitle>
                  <CardDescription className="text-gray-600">Tambahkan dokumen baru dengan cepat</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Unggah dan kategorikan laporan Anda dengan mudah.</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg">
                <Link href="/dashboard/user/upload-report" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Unggah Sekarang
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Pengaturan Profil</CardTitle>
                  <CardDescription className="text-gray-600">Sesuaikan pengalaman Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Kelola akun dan preferensi pribadi Anda.</p>
              <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 shadow-lg">
                <Link href="/dashboard/user/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Edit Profil
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Aktivitas Terbaru</h2>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Pembaruan Terbaru</CardTitle>
            </div>
            <CardDescription>Pantau tindakan dan kemajuan terbaru Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Laporan Berhasil Diunggah</p>
                  <p className="text-sm text-gray-600">Anda mengunggah "Laporan Keuangan Q1" ke Koleksi</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">2 hari lalu</div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Koleksi Baru Dibuat</p>
                  <p className="text-sm text-gray-600">Anda membuat koleksi baru "Proyek Alpha"</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">5 hari lalu</div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Informasi Profil Diperbarui</p>
                  <p className="text-sm text-gray-600">Anda memperbarui informasi profil dan preferensi</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">1 minggu lalu</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

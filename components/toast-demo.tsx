"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToastId } from "@/hooks/use-toast-id"
import { CheckCircle, AlertTriangle, Info, XCircle, Upload, UserPlus, Lock, FileText } from "lucide-react"

export function ToastDemo() {
  const { success, error, info, warning } = useToastId()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistem Notifikasi Toast</CardTitle>
        <CardDescription>
          Klik tombol di bawah untuk melihat contoh notifikasi toast dalam Bahasa Indonesia
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Notifikasi Sukses</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => success("login")}>
              <CheckCircle className="h-4 w-4" />
              Login
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => success("reportUpload")}
            >
              <Upload className="h-4 w-4" />
              Unggah
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => success("userCreate")}
            >
              <UserPlus className="h-4 w-4" />
              Buat User
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => success("passwordChange")}
            >
              <Lock className="h-4 w-4" />
              Ubah Password
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Notifikasi Error</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => error("login")}>
              <XCircle className="h-4 w-4" />
              Login
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => error("reportUpload")}
            >
              <XCircle className="h-4 w-4" />
              Unggah
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => error("serverError")}
            >
              <XCircle className="h-4 w-4" />
              Server
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => error("fileTypeError")}
            >
              <XCircle className="h-4 w-4" />
              Tipe File
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Notifikasi Info</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => info("loading")}>
              <Info className="h-4 w-4" />
              Loading
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => info("uploading")}>
              <Info className="h-4 w-4" />
              Uploading
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => info("sessionExpired")}
            >
              <Info className="h-4 w-4" />
              Sesi
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => info("newVersion")}>
              <Info className="h-4 w-4" />
              Versi Baru
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Notifikasi Peringatan</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => warning("unsavedChanges")}
            >
              <AlertTriangle className="h-4 w-4" />
              Perubahan
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => warning("deleteConfirmation")}
            >
              <AlertTriangle className="h-4 w-4" />
              Hapus
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => warning("expiringSoon")}
            >
              <AlertTriangle className="h-4 w-4" />
              Kedaluwarsa
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => warning("weakPassword")}
            >
              <AlertTriangle className="h-4 w-4" />
              Password
            </Button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <h3 className="text-sm font-medium">Notifikasi dengan Deskripsi</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() =>
                success("reportVerify", {
                  description: "Laporan 'Laporan Akhir PKP 2024' telah diverifikasi dan tersedia dalam sistem.",
                })
              }
            >
              <FileText className="h-4 w-4" />
              Dengan Deskripsi
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() =>
                error("validationError", {
                  description: "Terdapat 3 kesalahan pada formulir. Silakan periksa kembali data yang dimasukkan.",
                })
              }
            >
              <XCircle className="h-4 w-4" />
              Error Detail
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

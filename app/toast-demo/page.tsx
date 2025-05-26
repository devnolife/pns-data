import { ToastDemo } from "@/components/toast-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ToastDemoPage() {
  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sistem Notifikasi Toast</h1>
          <p className="text-gray-500 mt-2">Demonstrasi sistem notifikasi toast dengan pesan dalam Bahasa Indonesia</p>
        </div>

        <ToastDemo />

        <Card>
          <CardHeader>
            <CardTitle>Cara Penggunaan</CardTitle>
            <CardDescription>Panduan penggunaan sistem notifikasi toast dalam aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">1. Import Hook</h3>
              <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
                <code>{`import { useToastId } from "@/hooks/use-toast-id"`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium">2. Gunakan dalam Komponen</h3>
              <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
                <code>{`const { success, error, info, warning } = useToastId()`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium">3. Tampilkan Notifikasi</h3>
              <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
                <code>{`// Notifikasi sukses sederhana
success("login")

// Notifikasi dengan deskripsi tambahan
error("validationError", { 
  description: "Terdapat kesalahan pada formulir." 
})

// Notifikasi dengan durasi kustom (dalam milidetik)
info("newVersion", { duration: 10000 })

// Notifikasi dengan nilai dinamis
success("customMessage", {}, { 
  name: "John Doe" 
})`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

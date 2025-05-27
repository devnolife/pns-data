"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema, type RegisterFormData } from "@/schemas/registerSchema"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      training: "",
      class: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: RegisterFormData) => {
    setConfirmDialogOpen(true)
  }

  const handleConfirmRegistration = async (confirm: boolean) => {
    setConfirmDialogOpen(false)

    if (!confirm) return

    setLoading(true)

    try {
      const formValues = form.getValues()
      // Generate username from email
      const username = formValues.email.split("@")[0]

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          ...formValues,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Registration failed")
      }

      setRegistrationComplete(true)

      toast({
        title: "Pendaftaran berhasil",
        description: "Akun Anda telah dibuat. Anda sekarang dapat masuk.",
      })

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      toast({
        title: "Pendaftaran gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat pendaftaran",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    "Akses ke koleksi digital yang komprehensif",
    "Penyimpanan dan pengelolaan dokumen yang aman",
    "Pengiriman dan pelacakan laporan yang mudah",
    "Kolaborasi dengan profesional lainnya",
    "Tetap diperbarui dengan sumber daya terbaru",
  ]

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

      {/* Left Column - Visual/Benefits */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 space-y-8">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-float">🎉</div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Bergabung dengan Relasi CPNS!
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Gerbang menuju koleksi laporan aktualisasi terlengkap dan komunitas CPNS terbaik! ✨
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span>🌟</span> Mengapa Harus Daftar?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 text-white mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm opacity-90 mb-2">
                Sudah punya akun? 🤔
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 text-white font-semibold hover:text-purple-200 transition-colors">
                <span>🚀</span>
                Masuk di sini!
                <span>✨</span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-4 text-2xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💫</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🔥</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-6 lg:justify-start justify-center">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce">✨</div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Buat Akun Baru!
              </h2>
              <p className="text-gray-600 text-lg">Bergabung dengan komunitas CPNS terbaik! 🚀</p>
            </div>
          </div>

          {registrationComplete ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <div className="rounded-full bg-gradient-to-r from-purple-100 to-pink-100 p-4 mb-4">
                  <CheckCircle2 className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Pendaftaran Berhasil! 🎊
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Akun kamu sudah berhasil dibuat! Sekarang kamu bisa login dan menjelajahi koleksi digital terbaik! ✨
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2">
                    <span>🚀</span>
                    Pergi ke Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                    <span>✨</span>
                  </span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>👤</span> Nama Lengkap
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Siapa nama kamu? ✨"
                              className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>📧</span> Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="email.kamu@contoh.com 💌"
                              className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="training"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>🎓</span> Pelatihan yang Diikuti
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 transition-all duration-200 hover:bg-white/70">
                                <SelectValue placeholder="Pilih pelatihan kamu! 🌟" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-purple-200">
                              <SelectItem value="PKN" className="rounded-lg">🏛️ PKN</SelectItem>
                              <SelectItem value="PKP" className="rounded-lg">🔍 PKP</SelectItem>
                              <SelectItem value="PKA" className="rounded-lg">👔 PKA</SelectItem>
                              <SelectItem value="CPNS" className="rounded-lg">🎓 CPNS Latsar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>🏫</span> Kelas
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Kelas berapa nih? 📚"
                              className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>📱</span> Nomor Telepon
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nomor HP kamu! 📞"
                              className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="hidden md:block">{/* Spacer for grid alignment */}</div>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>🔒</span> Kata Sandi
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password super rahasia! 🤫"
                              className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500 flex items-center gap-1">
                            <span>💡</span> Minimal 8 karakter ya!
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>🔐</span> Konfirmasi Kata Sandi
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Ulangi password kamu! 🔄"
                              className="h-12 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Membuat akun... ⏳
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-lg">
                        <span>🚀</span>
                        Buat Akun Sekarang!
                        <span>✨</span>
                      </span>
                    )}
                  </Button>

                  <div className="text-center mt-6 lg:hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <p className="text-sm text-gray-600 mb-2">
                        Sudah punya akun? 🤔
                      </p>
                      <Link href="/login" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                        <span>🚀</span>
                        Masuk di sini!
                        <span>✨</span>
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Pendaftaran</DialogTitle>
            <DialogDescription>
              Silakan konfirmasi bahwa Anda ingin mendaftar dengan informasi yang diberikan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Nama:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Pelatihan:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().training}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Kelas:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().class}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Telepon:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm text-muted-foreground">{form.getValues().email}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleConfirmRegistration(false)}>
              Batal
            </Button>
            <Button onClick={() => handleConfirmRegistration(true)}>Konfirmasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

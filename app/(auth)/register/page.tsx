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
import { Loader2, CheckCircle2, ArrowRight, Eye, EyeOff } from "lucide-react"
import { registerUserAction } from "@/lib/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      training: "",
      angkatan: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: RegisterFormData) => {
    setLoading(true)

    try {
      // Call the server action instead of the API
      const result = await registerUserAction({
        username: values.username,
        email: values.email,
        password: values.password,
        training: values.training,
        angkatan: values.angkatan,
        phone: values.phone,
      })

      if (result.error) {
        throw new Error(result.error)
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
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-50 relative overflow-hidden">
      {/* Left Column - Visual/Benefits */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-primary text-white">
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 space-y-8">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-float">🎉</div>
            <h1 className="text-4xl font-bold mb-4">
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
                <div key={index} className="flex items-start bg-white/10 rounded-xl p-4 border border-white/20">
                  <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 text-white mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 text-center">
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <p className="text-sm opacity-90 mb-2">
                Sudah punya akun? 🤔
              </p>
              <Link href="/login" className="inline-flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors">
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
                  className="flex items-center gap-2 bg-white border-primary text-primary hover:bg-primary/5 rounded-xl"
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
              <h2 className="text-4xl font-bold text-primary mb-3">
                Buat Akun Baru!
              </h2>
              <p className="text-gray-600 text-lg">Bergabung dengan komunitas CPNS terbaik! 🚀</p>
            </div>
          </div>

          {registrationComplete ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Pendaftaran Berhasil! 🎊
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Akun kamu sudah berhasil dibuat! Sekarang kamu bisa login dan menjelajahi koleksi digital terbaik! ✨
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl"
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
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>👤</span> Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan username kamu! ✨"
                              className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary focus:ring-primary transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500 flex items-center gap-1">
                            <span>💡</span> Username minimal 3 karakter
                          </FormDescription>
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
                              className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary focus:ring-primary transition-all"
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
                              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary transition-all">
                                <SelectValue placeholder="Pilih pelatihan kamu! 🌟" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-gray-200">
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
                      name="angkatan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span>🏫</span> Angkatan
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Angkatan berapa nih? 📚"
                              className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary focus:ring-primary transition-all"
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
                              className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary focus:ring-primary transition-all"
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
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password super rahasia! 🤫"
                                className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary focus:ring-primary transition-all pr-10"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-gray-500 hover:text-primary"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </Button>
                            </div>
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
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Ulangi password kamu! 🔄"
                                className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-primary focus:ring-primary transition-all pr-10"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-gray-500 hover:text-primary"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        Sudah punya akun? 🤔
                      </p>
                      <Link href="/login" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
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

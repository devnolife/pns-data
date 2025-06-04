"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToastId } from "@/hooks/use-toast-id"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { success, error, info } = useToastId()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email) {
        error("validationError", {
          description: "Email diperlukan untuk reset password",
        })
        setIsLoading(false)
        return
      }

      if (!emailRegex.test(email)) {
        error("validationError", {
          description: "Format email tidak valid",
        })
        setIsLoading(false)
        return
      }

      info("processing", {
        description: "Sedang memproses permintaan reset password...",
      })

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For now, just show success message (dummy implementation)
      setIsEmailSent(true)
      success("resetEmailSent", {
        description: "Link reset password telah dikirim ke email Anda!",
      })

    } catch (err) {
      console.error("Forgot password error:", err)
      error("resetFailed", {
        description: "Terjadi kesalahan saat mengirim email reset password",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-stretch relative overflow-hidden">
        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

        <div className="w-full flex flex-col justify-center p-8 md:p-12 lg:p-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto w-full text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Email Terkirim! ✅
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  Kami telah mengirim link reset password ke email Anda
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Email: {email}</span>
                </div>
                <p className="text-sm text-green-700">
                  Silakan cek inbox atau folder spam Anda. Link reset akan berlaku selama 24 jam.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleBackToLogin}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Kembali ke Login
                </Button>

                <p className="text-sm text-gray-500">
                  Tidak menerima email? Coba cek folder spam atau{" "}
                  <button
                    onClick={() => {
                      setIsEmailSent(false)
                      setEmail("")
                    }}
                    className="text-purple-600 hover:text-purple-800 font-medium underline"
                  >
                    kirim ulang
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-stretch relative overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

      {/* Left Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <ArrowLeft size={16} />
                  Kembali ke Login
                </Button>
              </Link>
            </div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce">🔑</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Lupa Password?
              </h1>
              <p className="text-gray-600 text-lg">Jangan khawatir! Kami akan bantu reset password Anda 🚀</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 relative">
            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50"
                >
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-purple-600 flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mengirim Email Reset...
                      </p>
                      <p className="text-sm text-gray-500">Mohon tunggu sebentar ⏳</p>
                      <div className="flex justify-center gap-1 mt-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda! 📧"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-14 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Kami akan mengirim link reset password ke email ini
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      <span className="text-lg">Mengirim Email... ⏳</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-lg">
                      <Mail className="w-5 h-5" />
                      Kirim Link Reset
                      <span>✨</span>
                    </span>
                  )}
                </Button>
              </motion.div>

              <motion.div
                className="text-center text-gray-600 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm mb-2">Sudah ingat password? 🤔</p>
                  <Link
                    href="/login"
                    className={`inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <ArrowLeft size={16} />
                    Kembali ke Login
                    <span>🚀</span>
                  </Link>
                </div>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-white text-center"
        >
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-float">🔐</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-md">
              Jangan khawatir! Hal ini bisa terjadi pada siapa saja. Kami akan membantu Anda! 🤝
            </p>
          </div>

          <div className="space-y-4 max-w-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📧</span>
                <span className="font-semibold">Email Verification</span>
              </div>
              <p className="text-sm opacity-80">Link reset akan dikirim ke email Anda</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔒</span>
                <span className="font-semibold">Secure Process</span>
              </div>
              <p className="text-sm opacity-80">Proses reset password yang aman dan terpercaya</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Quick Recovery</span>
              </div>
              <p className="text-sm opacity-80">Akses kembali akun Anda dalam hitungan menit</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 text-2xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🔑</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>💫</span>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>
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

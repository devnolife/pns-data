"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToastId } from "@/hooks/use-toast-id"
import { motion } from "framer-motion"

// Import the useAuth hook
import { useAuth } from "@/context/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { success, error, info } = useToastId()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Replace the handleLogin function with this implementation
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simple validation
      if (!username || !password) {
        error("validationError", {
          description: "Email dan kata sandi diperlukan untuk masuk",
        })
        setIsLoading(false)
        return
      }

      info("processing", {
        description: "Sedang memproses permintaan login Anda...",
      })

      // Call login function from auth context
      await login(username, password)

      success("loginSuccess", {
        description: "Login berhasil!",
      })
    } catch (err) {
      console.error("Login error:", err)
      error("loginFailed", {
        description: err instanceof Error ? err.message : "Kredensial yang Anda masukkan tidak valid",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-stretch relative overflow-hidden">
      {/* Floating Elements */} 
      <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="fixed top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-20 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
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
              <div className="text-6xl mb-4 animate-bounce">🔐</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Selamat Datang Kembali!
              </h1>
              <p className="text-gray-600 text-lg">Masuk untuk melanjutkan petualangan Anda ✨</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span>👤</span> Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username kamu! 🚀"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                />
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span>🔒</span> Kata Sandi
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 transition-colors font-medium">
                    Lupa kata sandi? 🤔
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password rahasia kamu! 🤫"
                  className="h-14 rounded-xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400 transition-all duration-200 hover:bg-white/70"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Memproses... ⏳
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-lg">
                      <span>🚀</span>
                      Masuk Sekarang!
                      <span>✨</span>
                    </span>
                  )}
                </Button>
              </motion.div>

              <motion.div
                className="text-center text-gray-600 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <p className="text-sm mb-2">Belum punya akun? 🤷‍♀️</p>
                  <Link href="/register" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                    <span>✨</span>
                    Daftar Yuk!
                    <span>🎉</span>
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
            <div className="text-8xl mb-6 animate-float">📚</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Relasi CPNS
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-md">
              Repositori Laporan Aktualisasi terlengkap untuk CPNS Indonesia! 🇮🇩
            </p>
          </div>

          <div className="space-y-4 max-w-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎓</span>
                <span className="font-semibold">Akses Koleksi Digital</span>
              </div>
              <p className="text-sm opacity-80">Ribuan laporan aktualisasi berkualitas tinggi</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <span className="font-semibold">Platform Modern</span>
              </div>
              <p className="text-sm opacity-80">Interface yang user-friendly dan responsif</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌟</span>
                <span className="font-semibold">Komunitas CPNS</span>
              </div>
              <p className="text-sm opacity-80">Bergabung dengan ribuan CPNS se-Indonesia</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 text-2xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💫</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🔥</span>
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

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
    <div className="min-h-screen w-full bg-white flex items-stretch">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Masuk</h1>
            <p className="text-slate-500">Masukkan kredensial Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="username" className="text-sm font-medium text-slate-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:border-violet-500 focus:ring-violet-500"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Kata Sandi</Label>
                <Link href="/forgot-password" className="text-sm text-violet-600 hover:text-violet-800 transition-colors">
                  Lupa kata sandi?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:border-violet-500 focus:ring-violet-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </motion.div>

            <motion.div
              className="text-center text-sm text-slate-600 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Belum memiliki akun?{" "}
              <Link href="/register" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
                Daftar
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-slate-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          {/* Placeholder for illustration - replace with your actual image */}
          <div className="relative w-full h-full max-w-lg max-h-lg">
            <Image
              src="/placeholder-login-illustration.png"
              alt="Login Illustration"
              fill
              className="object-contain"
              priority
            />
            {/* Fallback if image is not available */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xl font-medium bg-slate-100 rounded-2xl">
              <div className="text-center p-6">
                <p className="mb-2">Illustration Placeholder</p>
                <p className="text-sm text-slate-400">Replace with your own image at:</p>
                <p className="text-sm font-mono bg-slate-200 p-1 rounded mt-1">/public/placeholder-login-illustration.png</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-8 right-8">
          <div className="h-24 w-24 rounded-full bg-violet-100"></div>
        </div>
        <div className="absolute bottom-12 left-12">
          <div className="h-16 w-16 rounded-full bg-emerald-100"></div>
        </div>
      </div>
    </div>
  )
}

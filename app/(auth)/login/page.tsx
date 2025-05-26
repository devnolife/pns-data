"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToastId } from "@/hooks/use-toast-id"

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

  const handleLogin = async (e) => {
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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
          <CardDescription>Masukkan kredensial Anda untuk mengakses akun Anda</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Kata Sandi</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Lupa kata sandi?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
            <div className="text-center text-sm">
              Belum memiliki akun?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Daftar
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

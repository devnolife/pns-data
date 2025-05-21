"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth-token="))
          ?.split("=")[1]

        if (token) {
          // Mock user data - in a real app, you would fetch this from your backend
          const userData = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "user" as const,
          }
          setUser(userData)

          // Set cookies for middleware
          document.cookie = `user-role=${userData.role}; path=/; max-age=86400`
        }
      } catch (err) {
        console.error("Authentication error:", err)
        setError("Failed to authenticate")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Set user data
      setUser(data.user)

      // Set cookies for authentication and middleware
      document.cookie = `auth-token=${data.token}; path=/; max-age=86400`
      document.cookie = `user-role=${data.user.role}; path=/; max-age=86400`

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/dashboard/admin")
      } else {
        router.push("/dashboard/user")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // After successful registration, redirect to login
      router.push("/login")
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear user data
    setUser(null)

    // Clear cookies
    document.cookie = "auth-token=; path=/; max-age=0"
    document.cookie = "user-role=; path=/; max-age=0"

    // Redirect to login
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

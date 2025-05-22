"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { apiClient, type User } from "@/lib/api-client"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("authToken")
        if (token) {
          // Verify token and get user data
          const userData = await apiClient.getCurrentUser()
          setUser(userData)
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        // Clear invalid token
        localStorage.removeItem("authToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { user, token } = await apiClient.login(email, password)
      localStorage.setItem("authToken", token)
      setUser(user)

      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/dashboard/admin")
      } else {
        router.push("/dashboard/user")
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const { user, token } = await apiClient.register(userData)
      localStorage.setItem("authToken", token)
      setUser(user)
      router.push("/dashboard/user")
    } catch (err: any) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      await apiClient.logout()
      localStorage.removeItem("authToken")
      setUser(null)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Logout failed")
      throw err
    } finally {
      setIsLoading(false)
    }
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

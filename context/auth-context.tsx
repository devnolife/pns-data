"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loginAction, registerUserAction, logoutAction, getCurrentUser } from "@/lib/actions/auth"

// User type based on Prisma schema
interface User {
  id: string
  username: string
  email: string
  name: string | null
  role: "USER" | "ADMIN" | "MODERATOR"
  avatar: string | null
  training: string | null
  angkatan: string | null
  phone: string | null
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    training: string;
    angkatan: string;
    phone: string;
  }) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
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
        setIsLoading(true)
        const userData = await getCurrentUser()
        if (userData) {
          setUser(userData as User)
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function using server action
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Create form data for server action
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const result = await loginAction(formData)

      if (result.error) {
        setError(result.error)
        throw new Error(result.error)
      }

      if (result.success && result.user) {
        setUser(result.user as User)

        const urlParams = new URLSearchParams(window.location.search)
        const callbackUrl = urlParams.get('callbackUrl')

        const redirectUrl = callbackUrl
          ? decodeURIComponent(callbackUrl)
          : result.redirectUrl || "/dashboard"

        window.location.href = redirectUrl
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Register function using server action
  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    training: string;
    angkatan: string;
    phone: string;
  }) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await registerUserAction(userData)

      if (result.error) {
        setError(result.error)
        throw new Error(result.error)
      }

      if (result.success && result.user) {
        // Don't set user immediately on register, let them login
        router.push("/login")
      }
    } catch (err: any) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function using server action
  const logout = async () => {
    setIsLoading(true)
    try {
      await logoutAction()
      setUser(null)
      // logoutAction already handles redirect to /login
    } catch (err: any) {
      setError(err.message || "Logout failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser()
      if (userData) {
        setUser(userData as User)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

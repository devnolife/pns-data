"use client"

import { AuthProvider } from "@/context/auth-context"
import type { ReactNode } from "react"

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

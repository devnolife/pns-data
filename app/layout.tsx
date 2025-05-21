import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { fontSans, fontHeading, fontMono } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { Analytics } from "@/components/analytics"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Digital Collection Management System",
    template: "%s | Digital Collection Management System",
  },
  description: "A modern platform for managing digital collections and reports",
  keywords: ["digital collection", "management system", "reports", "documents", "archive"],
  authors: [
    {
      name: "DCMS Team",
    },
  ],
  creator: "DCMS Team",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${fontHeading.variable} ${fontMono.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Suspense fallback={<div className="h-[64px]"></div>}>
                <Navigation />
              </Suspense>
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

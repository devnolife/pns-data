import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ToastProvider } from "@/components/providers/toast-provider"
import { AuthProviderWrapper } from "@/components/providers/auth-provider"

export const metadata: Metadata = {
  title: "PNS Data App",
  description: "Aplikasi Data PNS",
  generator: "Next.js",
  applicationName: "PNS Data",
  keywords: ["pns", "data", "indonesia", "aplikasi"],
  authors: [{ name: "Developer" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body>
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
        <ToastProvider />
      </body>
    </html>
  )
}

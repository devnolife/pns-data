import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DigiCollect. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

import type { ReactNode } from "react"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6 md:py-10">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

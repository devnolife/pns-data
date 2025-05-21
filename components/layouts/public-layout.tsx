import type { ReactNode } from "react"
import { Footer } from "@/components/common/footer"

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Public Collections",
      href: "/public-collections",
    },
    {
      title: "Guestbook",
      href: "/guestbook",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background"></header>
      <main className="flex-1">
        <div className="container py-6 md:py-10">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

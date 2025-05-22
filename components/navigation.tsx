"use client"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/common/logo"
import { MainNav } from "@/components/common/main-nav"
import { MobileNav } from "@/components/common/mobile-nav"
import { UserNav } from "@/components/common/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useMobile } from "@/hooks/use-mobile"

export function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()

  // Don't show navigation on auth pages
  if (pathname?.startsWith("/(auth)") || pathname?.startsWith("/auth")) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          {!isMobile && <MainNav />}
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
          {isMobile && <MobileNav />}
        </div>
      </div>
    </header>
  )
}

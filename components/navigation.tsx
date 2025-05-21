"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { MainNav } from "@/components/common/main-nav"
import { MobileNav } from "@/components/common/mobile-nav"
import { UserNav } from "@/components/common/user-nav"
import { Logo } from "@/components/common/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function Navigation() {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile nav when path changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Define navigation items based on user role
  const getNavItems = () => {
    // Public navigation items (for all users)
    const publicItems = [
      { title: "Home", href: "/" },
      { title: "Public Collections", href: "/public-collections" },
      { title: "Guestbook", href: "/guestbook" },
    ]

    // If no user is logged in, return public items only
    if (!user) return publicItems

    // User-specific navigation items
    if (user.role === "user") {
      return [
        { title: "Dashboard", href: "/dashboard/user" },
        { title: "Digital Collection", href: "/dashboard/user/digital-collection" },
        { title: "Upload Report", href: "/dashboard/user/upload-report" },
      ]
    }

    // Admin-specific navigation items
    if (user.role === "admin") {
      return [
        { title: "Dashboard", href: "/dashboard/admin" },
        { title: "Verify Reports", href: "/dashboard/admin/verify-reports" },
        { title: "Manage Folders", href: "/dashboard/admin/manage-folders" },
        { title: "Manage Users", href: "/dashboard/admin/manage-users" },
        { title: "Visitor Stats", href: "/dashboard/admin/number-of-visitors" },
      ]
    }

    // Fallback to public items
    return publicItems
  }

  const navItems = getNavItems()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Logo />
          {!isMobile && <MainNav items={navItems} />}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <UserNav user={user} />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}

          {isMobile && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
        </div>
      </div>

      {isMobile && isOpen && <MobileNav items={navItems} />}
    </header>
  )
}

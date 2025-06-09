"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/common/logo"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Beranda",
    href: "/",
    icon: "🏠"
  },
  {
    title: "Buku Tamu",
    href: "/guestbook",
    icon: "📝"
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [navItemsState, setNavItemsState] = useState(navItems)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('guestbookSession')) {
      setNavItemsState([...navItems, {
        title: "Koleksi Digital",
        href: "/public-collections",
        icon: "📚"
      }])
    } else {
      setNavItemsState(navItems)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-purple-200/50 shadow-lg">
      <div className="container flex h-20 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Desktop logo and title */}
          <div className="hidden md:flex">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Logo />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300">
                  Relasi CPNS
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Repositori Laporan Aktualisasi ✨
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile logo */}
          <div className="flex md:hidden">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Logo />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Relasi CPNS
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Repositori Laporan ✨
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="hidden gap-2 md:flex">
            {navItemsState.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105",
                  pathname === item.href
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
            >
              <span>🔐</span>
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span>✨</span>
              Daftar
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-3 py-2 text-base hover:bg-purple-50 hover:text-purple-600 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden rounded-xl transition-all duration-300"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-white/95 backdrop-blur-md border-r border-purple-200/50">
              <div className="px-7">
                <div className="flex items-center" onClick={() => setOpen(false)}>
                  <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                      <Logo />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Relasi CPNS
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        Repositori Laporan ✨
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              <nav className="mt-8 flex flex-col gap-3 px-7">
                {navItemsState.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                      pathname === item.href
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-300">
                      <span>🔐</span>
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                      <span>✨</span>
                      Daftar
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

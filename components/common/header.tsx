"use client"

import { useState } from "react"
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
  },
  {
    title: "Koleksi Publik",
    href: "/public-collections",
  },
  {
    title: "Buku Tamu",
    href: "/guestbook",
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Desktop logo and title */}
          <div className="hidden md:flex">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="hidden font-bold sm:inline-block">Sistem Manajemen Koleksi Digital</span>
            </Link>
          </div>

          {/* Mobile logo */}
          <div className="flex md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" className="hidden md:flex">
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button className="hidden md:flex">Daftar</Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <div className="flex items-center" onClick={() => setOpen(false)}>
                  <Link href="/" className="flex items-center">
                    <Logo />
                    <span className="ml-2 font-bold">SMKD</span>
                  </Link>
                </div>
              </div>
              <nav className="mt-8 flex flex-col gap-4 px-7">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full">Daftar</Button>
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

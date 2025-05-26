"use client"

import type { ReactNode } from "react"
import { ModernSidebar } from "@/components/layouts/modern-sidebar"
import { UserNav } from "@/components/common/user-nav"
import { Footer } from "@/components/common/footer"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Modern Sidebar */}
      <ModernSidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari..."
              className="w-full rounded-lg border-none bg-muted pl-9 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </Button>

            {/* User Navigation */}
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

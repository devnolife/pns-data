"use client"

import type { ReactNode } from "react"
import { ModernUserSidebar } from "@/components/layouts/modern-user-sidebar"
import { UserNav } from "@/components/common/user-nav"
import { Footer } from "@/components/common/footer"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UserLayoutProps {
  children: ReactNode
}

export function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern User Sidebar */}
      <ModernUserSidebar />

      {/* Main content with proper spacing */}
      <div className="flex flex-1 flex-col ml-4">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/20 bg-white/80 backdrop-blur-sm px-6 shadow-sm rounded-t-xl mt-4 mr-4">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari koleksi, laporan..."
              className="w-full rounded-lg border-none bg-white/60 pl-9 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-blue-50">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                2
              </span>
            </Button>

            {/* User Navigation */}
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 mr-4 mb-4 bg-white/30 backdrop-blur-sm rounded-b-xl rounded-tr-xl shadow-sm">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

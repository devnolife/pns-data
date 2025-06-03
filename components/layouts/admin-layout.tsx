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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Fixed Modern Sidebar with enhanced styling */}
      <div className="fixed left-0 top-0 z-40 h-screen">
        <div className="relative h-full">
          <ModernSidebar />
          {/* Vertical separator line */}
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/50 to-transparent"></div>
          {/* Subtle shadow overlay */}
          <div className="absolute -right-4 top-0 h-full w-4 bg-gradient-to-r from-transparent to-black/5 pointer-events-none"></div>
        </div>
      </div>

      {/* Main content with dynamic left margin based on sidebar width */}
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 240px)' }}
      >
        {/* Enhanced Header with separators */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-b border-border/50">
          {/* Top accent line */}
          <div className="h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>

          <div className="flex h-16 items-center gap-4 px-6">
            {/* Search with enhanced styling */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                type="search"
                placeholder="Cari..."
                className="w-full rounded-xl border-border/50 bg-background/50 pl-10 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all duration-200"
              />
            </div>

            {/* Vertical separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-2"></div>

            <div className="ml-auto flex items-center gap-3">
              {/* Notifications with enhanced styling */}
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-accent/50 transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm animate-pulse">
                  3
                </span>
              </Button>

              {/* Vertical separator */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>

              {/* User Navigation */}
              <UserNav />
            </div>
          </div>

          {/* Bottom separator with gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"></div>
        </header>

        {/* Scrollable Main Content with enhanced container */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-full p-6">
            {/* Content container with subtle background */}
            <div className="min-h-full bg-white/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-6">
              {children}
            </div>
          </div>
        </main>

        {/* Enhanced Footer */}
        <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <Footer />
        </div>
      </div>
    </div>
  )
}

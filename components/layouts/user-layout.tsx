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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Fixed Modern User Sidebar with enhanced styling */}
      <div className="fixed left-0 top-0 z-40 h-screen">
        <div className="relative h-full">
          <ModernUserSidebar />
          {/* Vertical separator line with blue accent */}
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-200/60 to-transparent"></div>
          {/* Subtle shadow overlay with blue tint */}
          <div className="absolute -right-6 top-0 h-full w-6 bg-gradient-to-r from-transparent to-blue-500/5 pointer-events-none"></div>
        </div>
      </div>

      {/* Main content with dynamic left margin based on sidebar width */}
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 240px)' }}
      >
        {/* Enhanced Header with blue theme separators */}
        <header className="sticky top-0 z-30 mt-4 mr-4 rounded-t-2xl overflow-hidden bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 border border-white/30 shadow-lg">
          {/* Top accent line with blue gradient */}
          <div className="h-1 bg-gradient-to-r from-blue-400/30 via-blue-500/60 to-indigo-500/30"></div>

          <div className="flex h-16 items-center gap-4 px-6">
            {/* Search with enhanced blue styling */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400/70" />
              <Input
                type="search"
                placeholder="Cari koleksi, laporan..."
                className="w-full rounded-xl border-blue-200/50 bg-white/60 pl-10 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400/30 focus-visible:border-blue-400/50 transition-all duration-200"
              />
            </div>

            {/* Decorative separator with blue gradient */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent mx-2"></div>

            <div className="ml-auto flex items-center gap-3">

              {/* Decorative separator */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>

              {/* User Navigation */}
              <UserNav />
            </div>
          </div>

          {/* Bottom separator with blue gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
        </header>

        {/* Scrollable Main Content with enhanced glass morphism */}
        <main className="flex-1 overflow-auto mr-4 mb-4">
          <div className="min-h-full p-6 flex items-center justify-center">
            {/* Content container with enhanced glass effect and proper centering */}
            <div className="w-full max-w-7xl bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/20 pointer-events-none"></div>
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Footer with glass effect */}
        <div className="mr-4 mb-4 rounded-b-2xl border-t border-white/30 bg-white/50 backdrop-blur-md shadow-lg">
          <Footer />
        </div>
      </div>
    </div>
  )
}

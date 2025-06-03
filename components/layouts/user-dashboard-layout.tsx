"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, FolderOpen, Upload, User, LogOut, Settings, Bell, Search, HardDrive } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface UserDashboardLayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Enhanced Fixed Sidebar with separators */}
        <div className="fixed left-0 top-0 z-40 h-screen">
          <div className="relative h-full">
            <Sidebar variant="floating" collapsible="icon" className="h-full bg-white/90 backdrop-blur-xl border-r border-blue-200/50 shadow-xl">
              <SidebarHeader className="border-b border-blue-200/30 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div className="flex items-center gap-2 px-4 py-3">
                  <Avatar className="h-9 w-9 border-2 border-blue-200/50 shadow-sm">
                    <AvatarImage src="/diverse-avatars.png" alt="User" />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-blue-900">{user?.name || "Pengguna"}</span>
                    <span className="text-xs text-blue-600/70">Dashboard Pengguna</span>
                  </div>
                </div>
                {/* Header bottom separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
              </SidebarHeader>

              <SidebarContent className="bg-white/50 backdrop-blur-sm">
                <SidebarGroup>
                  <SidebarGroupLabel className="text-blue-700 font-semibold">Navigasi</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive("/dashboard/user")}
                          tooltip="Dashboard"
                          className="rounded-xl hover:bg-blue-50/80 transition-all duration-200"
                        >
                          <Link href="/dashboard/user">
                            <Home className="h-5 w-5" />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive("/dashboard/user/digital-collection")}
                          tooltip="Koleksi Digital"
                          className="rounded-xl hover:bg-blue-50/80 transition-all duration-200"
                        >
                          <Link href="/dashboard/user/digital-collection">
                            <FolderOpen className="h-5 w-5" />
                            <span>Koleksi Digital</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive("/dashboard/user/upload-report")}
                          tooltip="Unggah Laporan"
                          className="rounded-xl hover:bg-blue-50/80 transition-all duration-200"
                        >
                          <Link href="/dashboard/user/upload-report">
                            <Upload className="h-5 w-5" />
                            <span>Unggah Laporan</span>
                            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 border-green-200">
                              Baru
                            </Badge>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive("/dashboard/user/my-files")}
                          tooltip="File Saya"
                          className="rounded-xl hover:bg-blue-50/80 transition-all duration-200"
                        >
                          <Link href="/dashboard/user/my-files">
                            <HardDrive className="h-5 w-5" />
                            <span>File Saya</span>
                            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 border-green-200">
                              Baru
                            </Badge>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />

                <SidebarGroup>
                  <SidebarGroupLabel className="text-blue-700 font-semibold">Akun</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive("/dashboard/user/profile")}
                          tooltip="Profil"
                          className="rounded-xl hover:bg-blue-50/80 transition-all duration-200"
                        >
                          <Link href="/dashboard/user/profile">
                            <User className="h-5 w-5" />
                            <span>Profil</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive("/dashboard/user/settings")}
                          tooltip="Pengaturan"
                          className="rounded-xl hover:bg-blue-50/80 transition-all duration-200"
                        >
                          <Link href="/dashboard/user/settings">
                            <Settings className="h-5 w-5" />
                            <span>Pengaturan</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter className="border-t border-blue-200/30 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                {/* Footer top separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent mb-2"></div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-xl transition-all duration-200"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Keluar</span>
                </Button>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>

            {/* Vertical separator line with blue accent */}
            <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-300/60 to-transparent"></div>
            {/* Subtle shadow overlay with blue tint */}
            <div className="absolute -right-6 top-0 h-full w-6 bg-gradient-to-r from-transparent to-blue-500/10 pointer-events-none"></div>
          </div>
        </div>

        {/* Main content with dynamic left margin based on sidebar width */}
        <div className="flex flex-1 flex-col ml-[280px] transition-all duration-300">
          {/* Enhanced Header with blue theme separators */}
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 border-b border-blue-200/50 shadow-lg">
            {/* Top accent line with blue gradient */}
            <div className="h-1 bg-gradient-to-r from-blue-400/30 via-blue-500/60 to-indigo-500/30"></div>

            <div className="flex h-16 items-center gap-4 px-4 md:px-6">
              <SidebarTrigger className="rounded-xl hover:bg-blue-50/80 transition-all duration-200" />

              {/* Vertical separator */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>

              <div className="relative hidden md:block max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400/70 h-4 w-4" />
                <Input
                  placeholder="Cari..."
                  className="pl-10 max-w-md rounded-xl border-blue-200/50 bg-white/60 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400/30 focus-visible:border-blue-400/50 transition-all duration-200"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-blue-50/80 transition-all duration-200">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="sr-only">Notifikasi</span>
                </Button>

                {/* Vertical separator */}
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>

                <ModeToggle />

                {/* Vertical separator */}
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>

                <Avatar className="h-8 w-8 border-2 border-blue-200/50 shadow-sm">
                  <AvatarImage src="/diverse-avatars.png" alt="User" />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Bottom separator with blue gradient */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
          </header>

          {/* Scrollable Main Content with enhanced glass morphism */}
          <main className="flex-1 overflow-auto">
            <div className="min-h-full p-6">
              {/* Content container with enhanced glass effect */}
              <div className="min-h-full bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/20 pointer-events-none"></div>
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

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
import { Home, FolderOpen, Upload, User, LogOut, Settings, Bell, Search } from "lucide-react"
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
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar variant="floating" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-3">
              <Avatar className="h-9 w-9 border-2 border-primary/10">
                <AvatarImage src="/diverse-avatars.png" alt="User" />
                <AvatarFallback className="bg-primary-100 text-primary-700">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || "Pengguna"}</span>
                <span className="text-xs text-muted-foreground">Dashboard Pengguna</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/user")} tooltip="Dashboard">
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
                    >
                      <Link href="/dashboard/user/upload-report">
                        <Upload className="h-5 w-5" />
                        <span>Unggah Laporan</span>
                        <Badge variant="secondary" className="ml-auto">
                          Baru
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Akun</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/user/profile")} tooltip="Profil">
                      <Link href="/dashboard/user/profile">
                        <User className="h-5 w-5" />
                        <span>Profil</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/user/settings")} tooltip="Pengaturan">
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
          <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger />
            <div className="relative hidden md:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Cari..." className="pl-10 max-w-md" />
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notifikasi</span>
              </Button>
              <ModeToggle />
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="/diverse-avatars.png" alt="User" />
                <AvatarFallback className="bg-primary-100 text-primary-700">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

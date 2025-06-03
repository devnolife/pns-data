"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  FileText,
  Upload,
  Users,
  BarChart3,
  LogOut,
  Menu,
  Bell,
  Settings,
  User,
  ChevronDown,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: user?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user",
      icon: LayoutDashboard,
      active:
        (user?.role === "ADMIN" && isActive("/dashboard/admin") && !isActive("/dashboard/admin/manage-users") && !isActive("/dashboard/admin/verify-reports") && !isActive("/dashboard/admin/manage-folders") && !isActive("/dashboard/admin/number-of-visitors") && !isActive("/dashboard/admin/settings")) ||
        (user?.role === "USER" && isActive("/dashboard/user") && !isActive("/dashboard/user/digital-collection") && !isActive("/dashboard/user/upload-report") && !isActive("/dashboard/user/verification-status") && !isActive("/dashboard/user/profile")),
    },
    {
      name: "Collections",
      href: "/dashboard/collections",
      icon: FileText,
      active: isActive("/dashboard/collections"),
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: Upload,
      active: isActive("/dashboard/reports"),
    },
    ...(user?.role === "ADMIN"
      ? [
        {
          name: "Users",
          href: "/dashboard/users",
          icon: Users,
          active: isActive("/dashboard/users"),
        },
        {
          name: "Statistics",
          href: "/dashboard/statistics",
          icon: BarChart3,
          active: isActive("/dashboard/statistics"),
        },
      ]
      : []),
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
      {/* Enhanced Fixed Header with modern separators */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 border-b border-border/50 shadow-lg">
        {/* Top accent line */}
        <div className="h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20"></div>

        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {isMobile && (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent/50 transition-all duration-200">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 p-0 bg-white/95 backdrop-blur-xl border-r border-border/50">
                    {/* Mobile menu header with separator */}
                    <div className="p-6 border-b border-border/30 bg-gradient-to-r from-primary/5 to-primary/10">
                      <h2 className="text-lg font-bold text-primary">Digital Collection System</h2>
                    </div>
                    <nav className="p-2">
                      <ul className="space-y-1">
                        {navItems.map((item) => (
                          <li key={item.name}>
                            <Link href={item.href}>
                              <Button
                                variant={item.active ? "default" : "ghost"}
                                className="w-full justify-start rounded-xl transition-all duration-200"
                              >
                                <item.icon className="h-4 w-4 mr-3" />
                                {item.name}
                              </Button>
                            </Link>
                          </li>
                        ))}
                        {/* Separator before logout */}
                        <li className="pt-2">
                          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-2"></div>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200"
                            onClick={handleLogout}
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Logout
                          </Button>
                        </li>
                      </ul>
                    </nav>
                  </SheetContent>
                </Sheet>
                {/* Vertical separator after mobile menu */}
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
              </>
            )}
            <Link href={user?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user"} className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">
              Digital Collection System
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent/50 transition-all duration-200">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Vertical separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-xl hover:bg-accent/50 transition-all duration-200">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src="/diverse-avatars.png" alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!isMobile && (
                    <>
                      <div className="text-sm font-medium text-left">
                        <div className="font-semibold">{user?.name || user?.username}</div>
                        <div className="text-xs text-muted-foreground">
                          {user?.role === "ADMIN" ? "Administrator" : user?.training}
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border border-border/50 shadow-xl">
                <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                <DropdownMenuItem className="rounded-lg hover:bg-accent/50 transition-all duration-200">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg hover:bg-accent/50 transition-all duration-200">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bottom separator with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"></div>
      </header>

      {/* Main Content with top margin for fixed header */}
      <div className="flex pt-16">
        {/* Enhanced Fixed Sidebar (desktop only) */}
        {!isMobile && (
          <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white/90 backdrop-blur-xl border-r border-border/50 overflow-y-auto shadow-lg">
            {/* Sidebar header with separator */}
            <div className="p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-primary/10">
              <h3 className="font-semibold text-primary">Navigation</h3>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant={item.active ? "default" : "ghost"}
                        className="w-full justify-start rounded-xl transition-all duration-200 hover:shadow-sm"
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar footer with separator */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/30 bg-gradient-to-r from-background/50 to-background/80">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </aside>
        )}

        {/* Scrollable Main Content with enhanced styling */}
        <main className={`flex-1 overflow-auto ${!isMobile ? 'ml-64' : ''}`}>
          <div className="min-h-[calc(100vh-4rem)] p-6">
            {/* Content container with glass effect */}
            <div className="min-h-full bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart,
  FileCheck,
  FolderPlus,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/context/auth-context"

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  isActive: boolean
  notifications?: number
  isCollapsed: boolean
  isNew?: boolean
}

const NavItem = ({ icon: Icon, label, href, isActive, notifications, isCollapsed, isNew }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "group relative mb-2 flex h-14 items-center rounded-2xl px-4 text-sm font-medium transition-all duration-200 ease-out",
              isActive
                ? "bg-gradient-to-r from-primary/80 via-primary to-primary/90 text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:shadow-sm",
              isCollapsed ? "justify-center" : "justify-start",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                isActive
                  ? "bg-white/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "animate-pulse")} />
            </div>
            {!isCollapsed && (
              <span
                className={cn(
                  "ml-3 transition-all duration-200",
                  isActive ? "font-bold text-primary-foreground" : "font-medium",
                )}
              >
                {label}
              </span>
            )}

            {/* Notification badge */}
            {notifications && notifications > 0 && (
              <div
                className={cn(
                  "absolute flex h-6 min-w-6 items-center justify-center rounded-full bg-destructive p-0.5 text-xs font-bold text-destructive-foreground shadow-sm transition-transform duration-200 group-hover:scale-110",
                  isCollapsed ? "right-1 top-1" : "right-3 top-1/2 -translate-y-1/2",
                )}
              >
                {notifications}
              </div>
            )}

            {/* New feature indicator */}
            {isNew && (
              <div
                className={cn(
                  "absolute flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm",
                  isCollapsed ? "-right-1 -top-1" : "right-3 top-1.5",
                )}
              >
                Baru
              </div>
            )}

            {/* Active indicator line */}
            {isActive && !isCollapsed && (
              <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white" />
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" className="font-medium">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export function ModernSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const isMobile = useMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Set initial collapsed state based on screen size
  useEffect(() => {
    setMounted(true)
    setIsCollapsed(isMobile)
  }, [isMobile])

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Effect to handle responsive behavior and communicate width changes
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      const sidebarWidth = isCollapsed ? '80px' : '240px'
      root.style.setProperty('--sidebar-width', sidebarWidth)
    }
  }, [isCollapsed, mounted])

  // Helper function to get user initials
  const getUserInitials = (name: string | null, username: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
    return username.substring(0, 2).toUpperCase()
  }

  // Helper function to get display name
  const getDisplayName = () => {
    if (user?.name) {
      return user.name
    }
    return user?.username || "Admin"
  }

  // Navigation items
  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: BarChart,
      label: "Statistik Pengunjung",
      href: "/dashboard/admin/number-of-visitors",
    },
    {
      icon: FileCheck,
      label: "Verifikasi Laporan",
      href: "/dashboard/admin/verify-reports",
    },
    {
      icon: FolderPlus,
      label: "Kelola Folder",
      href: "/dashboard/admin/manage-folders",
    },
    {
      icon: Users,
      label: "Kelola Pengguna",
      href: "/dashboard/admin/manage-users",
    },
    {
      icon: Bell,
      label: "Notifikasi",
      href: "/dashboard/admin/notifications",
    },
    {
      icon: Settings,
      label: "Pengaturan",
      href: "/dashboard/admin/settings",
    },
  ]

  if (!mounted) {
    return null
  }

  // Show loading state if user data is not available
  if (!user) {
    return (
      <div className={cn(
        "relative flex h-screen flex-col border-r bg-background shadow-lg transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
      )}>
        <div className="flex h-16 items-center justify-center border-b px-4 py-3">
          <div className="animate-pulse flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
            {!isCollapsed && <div className="h-4 w-24 rounded bg-gray-200"></div>}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col bg-white/90 backdrop-blur-xl border-r border-border/50 shadow-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
      )}
    >
      {/* Sidebar Header with enhanced styling */}
      <div className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex h-16 items-center justify-between px-4 py-3">
          {!isCollapsed && (
            <Link href="/dashboard/admin" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-all duration-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-primary">Relasi CPNS</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        {/* Header bottom separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
      </div>

      {/* User Profile with enhanced styling */}
      <div className="border-b border-border/20 bg-gradient-to-r from-background/50 to-background/80">
        <div
          className={cn("my-4 flex items-center gap-3 px-3 py-2", isCollapsed ? "flex-col justify-center" : "flex-row")}
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-10 w-10 border-2 border-primary/30 cursor-pointer hover:border-primary/50 transition-all duration-200 shadow-sm">
                  <AvatarImage src={(user.avatar || undefined) as string | undefined} alt={getDisplayName()} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getUserInitials(user.name, user.username)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium bg-white/95 backdrop-blur-sm border border-border/50">
                  <div className="text-center">
                    <p className="font-semibold">{getDisplayName()}</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold truncate text-primary" title={getDisplayName()}>
                {getDisplayName()}
              </span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
          )}
        </div>
        {/* Profile bottom separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-2"></div>
      </div>

      {/* Navigation with enhanced styling */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-4 bg-gradient-to-b from-background/30 to-background/50">
        {!isCollapsed && (
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Menu Utama</h3>
            <div className="h-px bg-gradient-to-r from-border/50 to-transparent mt-2 mb-3"></div>
          </div>
        )}

        <div className="space-y-1">
          {navItems.map((item, index) => (
            <div key={item.href}>
              <NavItem
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
              {/* Add subtle separators between certain items */}
              {(index === 1 || index === 3) && !isCollapsed && (
                <div className="h-px bg-gradient-to-r from-transparent via-border/20 to-transparent my-2 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button with enhanced styling */}
      <div className="border-t border-border/30 bg-gradient-to-r from-background/50 to-background/80">
        {/* Footer top separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-3"></div>

        <div className="p-3">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className={cn(
                    "group flex h-12 w-full items-center rounded-xl px-3 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive shadow-sm hover:shadow-md",
                    isCollapsed ? "justify-center" : "justify-start",
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground group-hover:text-destructive transition-all duration-200">
                    <LogOut className="h-5 w-5" />
                  </div>
                  {!isCollapsed && <span className="ml-2">Keluar</span>}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium bg-white/95 backdrop-blur-sm border border-border/50">
                  Keluar
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

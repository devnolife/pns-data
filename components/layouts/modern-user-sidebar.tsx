"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FolderOpen,
  Upload,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  UserCheck,
  HardDrive,
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
                ? "bg-gradient-to-r from-blue-500/80 via-blue-600 to-blue-500/90 text-white shadow-md"
                : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-700 hover:shadow-sm",
              isCollapsed ? "justify-center" : "justify-start",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "animate-pulse")} />
            </div>
            {!isCollapsed && (
              <span
                className={cn(
                  "ml-3 transition-all duration-200",
                  isActive ? "font-bold text-white" : "font-medium text-gray-700",
                )}
              >
                {label}
              </span>
            )}

            {/* Notification badge */}
            {notifications && notifications > 0 && (
              <div
                className={cn(
                  "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                  isActive ? "bg-white text-blue-600" : "bg-red-500 text-white",
                )}
              >
                {notifications > 99 ? "99+" : notifications}
              </div>
            )}

            {/* New badge */}
            {isNew && !isCollapsed && (
              <div className="ml-auto">
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  Baru
                </div>
              </div>
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" className="font-medium bg-white/95 backdrop-blur-sm border border-blue-200/50">
            <div className="flex items-center gap-2">
              <span>{label}</span>
              {notifications && notifications > 0 && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {notifications > 99 ? "99+" : notifications}
                </div>
              )}
              {isNew && (
                <div className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                  Baru
                </div>
              )}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export function ModernUserSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
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

  // Navigation items for users
  const navItems: Array<{
    icon: React.ElementType
    label: string
    href: string
    isNew?: boolean
  }> = [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard/user",
      },
      {
        icon: FolderOpen,
        label: "Koleksi Digital",
        href: "/dashboard/user/digital-collection",
      },
      {
        icon: Upload,
        label: "Unggah Laporan",
        href: "/dashboard/user/upload-report",
        isNew: true,
      },
      {
        icon: HardDrive,
        label: "File Saya",
        href: "/dashboard/user/my-files",
        isNew: true,
      },
      {
        icon: User,
        label: "Profil",
        href: "/dashboard/user/profile",
      },
      {
        label: "Status Verifikasi",
        href: "/dashboard/user/verification-status",
        icon: UserCheck
      }
    ]

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
    return user?.username || "User"
  }

  // Helper function to get role display
  const getRoleDisplay = () => {
    switch (user?.role) {
      case 'ADMIN':
        return 'Administrator'
      case 'MODERATOR':
        return 'Moderator'
      case 'USER':
      default:
        return 'Anggota'
    }
  }

  // Helper function to get training info
  const getTrainingInfo = () => {
    if (user?.training && user?.angkatan) {
      return `${user.training} - Angkatan ${user.angkatan}`
    }
    if (user?.training) {
      return user.training
    }
    if (user?.angkatan) {
      return `Angkatan ${user.angkatan}`
    }
    return null
  }

  // Effect to handle responsive behavior and communicate width changes
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      const sidebarWidth = isCollapsed ? '80px' : '240px'
      root.style.setProperty('--sidebar-width', sidebarWidth)
    }
  }, [isCollapsed, mounted])

  if (!mounted || isLoading) {
    return null
  }

  // Show loading state if user data is not available
  if (!user) {
    return (
      <div className={cn(
        "relative flex h-screen flex-col border-r border-white/20 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
      )}>
        <div className="flex h-16 items-center justify-center border-b border-white/20 px-4 py-3">
          <div className="animate-pulse flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
            {!isCollapsed && <div className="h-4 w-24 rounded bg-gray-200"></div>}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col bg-white/90 backdrop-blur-xl border-r border-blue-200/50 shadow-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
      )}
    >
      {/* Sidebar Header with enhanced blue styling */}
      <div className="border-b border-blue-200/30 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="flex h-16 items-center justify-between px-4 py-3">
          {!isCollapsed && (
            <Link href="/dashboard/user" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm group-hover:shadow-md transition-all duration-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-blue-800">PNS Digital</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        {/* Header bottom separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      </div>

      {/* User Profile with enhanced blue styling */}
      <div className="border-b border-blue-200/20 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
        <div
          className={cn("my-4 flex items-center gap-3 px-3 py-2", isCollapsed ? "flex-col justify-center" : "flex-row")}
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-10 w-10 border-2 border-blue-200/50 cursor-pointer hover:border-blue-300 transition-all duration-200 shadow-sm">
                  <AvatarImage src={(user.avatar || undefined) as string | undefined} alt={getDisplayName()} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {getUserInitials(user.name, user.username)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium bg-white/95 backdrop-blur-sm border border-blue-200/50">
                  <div className="text-center">
                    <p className="font-semibold text-blue-900">{getDisplayName()}</p>
                    <p className="text-xs text-blue-600/70">{getRoleDisplay()}</p>
                    {getTrainingInfo() && (
                      <p className="text-xs text-blue-500/70">{getTrainingInfo() || ''}</p>
                    )}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-blue-900 truncate" title={getDisplayName()}>
                {getDisplayName()}
              </span>
              <span className="text-xs text-blue-600/70">{getRoleDisplay()}</span>
              {getTrainingInfo() && (
                <span className="text-xs text-blue-500/70 truncate" title={getTrainingInfo() || ''}>
                  {getTrainingInfo() || ''}
                </span>
              )}
            </div>
          )}
        </div>
        {/* Profile bottom separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent mb-2"></div>
      </div>

      {/* Navigation with enhanced blue styling */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-4 bg-gradient-to-b from-blue-50/20 to-indigo-50/20">
        {!isCollapsed && (
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wider px-2">Menu Utama</h3>
            <div className="h-px bg-gradient-to-r from-blue-300/50 to-transparent mt-2 mb-3"></div>
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
                isNew={item.isNew}
              />
              {/* Add subtle separators between certain items */}
              {(index === 1 || index === 4) && !isCollapsed && (
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent my-2 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button with enhanced blue styling */}
      <div className="border-t border-blue-200/30 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 p-3">
        {/* Footer top separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent mb-2"></div>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-xl transition-all duration-200",
                  isCollapsed ? "justify-center px-2" : "justify-start gap-2"
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span>Keluar</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="font-medium bg-white/95 backdrop-blur-sm border border-blue-200/50">
                Keluar
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
} 

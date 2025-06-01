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
                  "absolute flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-500 p-0.5 text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-110",
                  isCollapsed ? "right-1 top-1" : "right-3 top-1/2 -translate-y-1/2",
                )}
              >
                {notifications}
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

export function ModernUserSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
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
  const navItems = [
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

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r border-white/20 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/20 px-4 py-3">
        {!isCollapsed && (
          <Link href="/dashboard/user" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-gray-800">PNS Digital</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      <div
        className={cn("my-4 flex items-center gap-3 px-3 py-2", isCollapsed ? "flex-col justify-center" : "flex-row")}
      >
        <Avatar className="h-10 w-10 border-2 border-blue-200">
          <AvatarImage src="/user-profile.png" alt="User" />
          <AvatarFallback className="bg-blue-100 text-blue-700">US</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">Akun Pengguna</span>
            <span className="text-xs text-gray-500">Anggota</span>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="mx-3 mb-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
          <div className="flex items-center gap-2 text-blue-700">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-medium">Statistik Cepat</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <div className="font-bold text-blue-600">12</div>
              <div className="text-gray-600">Koleksi</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">48</div>
              <div className="text-gray-600">Laporan</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
              isNew={item.isNew}
            />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto border-t border-white/20 p-3">
        <button
          onClick={handleLogout}
          className={cn(
            "group flex h-12 w-full items-center rounded-xl px-3 text-sm font-medium text-gray-600 transition-all hover:bg-red-50 hover:text-red-600",
            isCollapsed ? "justify-center" : "justify-start",
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 group-hover:text-red-600">
            <LogOut className="h-5 w-5" />
          </div>
          {!isCollapsed && <span className="ml-2">Keluar</span>}
        </button>
      </div>
    </div>
  )
} 

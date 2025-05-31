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
  const isMobile = useMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
    }
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

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b px-4 py-3">
        {!isCollapsed && (
          <Link href="/dashboard/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold">Relasi CPNS</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      <div
        className={cn("my-4 flex items-center gap-3 px-3 py-2", isCollapsed ? "flex-col justify-center" : "flex-row")}
      >
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarImage src="/abstract-profile.png" alt="Admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Admin User</span>
            <span className="text-xs text-muted-foreground">Super Admin</span>
          </div>
        )}
      </div>

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
            />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto border-t p-3">
        <button
          onClick={handleLogout}
          className={cn(
            "group flex h-12 w-full items-center rounded-xl px-3 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive",
            isCollapsed ? "justify-center" : "justify-start",
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground group-hover:text-destructive">
            <LogOut className="h-5 w-5" />
          </div>
          {!isCollapsed && <span className="ml-2">Keluar</span>}
        </button>
      </div>
    </div>
  )
}

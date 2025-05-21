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
    router.push("/login")
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active:
        isActive("/dashboard") &&
        !isActive("/dashboard/collections") &&
        !isActive("/dashboard/reports") &&
        !isActive("/dashboard/users") &&
        !isActive("/dashboard/statistics"),
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
    ...(user?.role === "admin"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-bold text-blue-700">Digital Collection System</h2>
                  </div>
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link href={item.href}>
                            <Button variant={item.active ? "default" : "ghost"} className="w-full justify-start">
                              <item.icon className="h-4 w-4 mr-2" />
                              {item.name}
                            </Button>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            <Link href="/dashboard" className="text-xl font-bold text-blue-700">
              Digital Collection System
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/diverse-avatars.png" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  {!isMobile && (
                    <>
                      <div className="text-sm font-medium text-left">
                        <div>{user?.name || user?.username}</div>
                        <div className="text-xs text-gray-500">
                          {user?.role === "admin" ? "Administrator" : user?.training}
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar (desktop only) */}
        {!isMobile && (
          <aside className="w-64 bg-white border-r min-h-[calc(100vh-60px)] sticky top-[60px]">
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button variant={item.active ? "default" : "ghost"} className="w-full justify-start">
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

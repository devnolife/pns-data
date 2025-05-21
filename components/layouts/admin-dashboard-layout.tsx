"use client"

import type React from "react"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, BarChart, ClipboardCheck, FolderPlus, Users, LogOut, Shield, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

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
                <AvatarImage src="/diverse-avatars.png" alt="Admin" />
                <AvatarFallback className="bg-primary-100 text-primary-700">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || "Admin"}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3 text-primary" /> Admin Dashboard
                </span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin")} tooltip="Dashboard">
                      <Link href="/dashboard/admin">
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/admin/number-of-visitors")}
                      tooltip="Visitor Statistics"
                    >
                      <Link href="/dashboard/admin/number-of-visitors">
                        <BarChart className="h-5 w-5" />
                        <span>Visitor Statistics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/admin/verify-reports")}
                      tooltip="Verify Reports"
                    >
                      <Link href="/dashboard/admin/verify-reports">
                        <ClipboardCheck className="h-5 w-5" />
                        <span>Verify Reports</span>
                        <Badge variant="secondary" className="ml-auto">
                          5
                        </Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/admin/add-collection")}
                      tooltip="Add Collection"
                    >
                      <Link href="/dashboard/admin/add-collection">
                        <FolderPlus className="h-5 w-5" />
                        <span>Add Collection</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive("/dashboard/admin/user-management")}
                      tooltip="User Management"
                    >
                      <Link href="/dashboard/admin/user-management">
                        <Users className="h-5 w-5" />
                        <span>User Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/admin/settings")} tooltip="Settings">
                      <Link href="/dashboard/admin/settings">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="outline" className="w-full" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </SidebarProvider>
  )
}

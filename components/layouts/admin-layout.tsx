"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart, FileCheck, FolderPlus, Users, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { Logo } from "@/components/common/logo"
import { UserNav } from "@/components/common/user-nav"
import { Footer } from "@/components/common/footer"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Number of Visitors",
      href: "/dashboard/admin/number-of-visitors",
      icon: BarChart,
    },
    {
      title: "Verify Reports",
      href: "/dashboard/admin/verify-reports",
      icon: FileCheck,
    },
    {
      title: "Manage Folders",
      href: "/dashboard/admin/manage-folders",
      icon: FolderPlus,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => logout()} tooltip="Logout">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <UserNav />
          </header>
          <main className="flex-1 p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}

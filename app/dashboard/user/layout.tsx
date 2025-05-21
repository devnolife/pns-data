import type React from "react"
import { UserLayout } from "@/components/layouts/user-layout"

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <UserLayout>{children}</UserLayout>
}

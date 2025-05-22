import type React from "react"
import { UserLayout } from "@/components/layouts/user-layout"

export default function DashboardUserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <UserLayout>{children}</UserLayout>
}

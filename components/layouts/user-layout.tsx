import type React from "react"
import { UserNav } from "@/components/user-nav"

interface UserLayoutProps {
  children: React.ReactNode
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <UserNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

export default UserLayout

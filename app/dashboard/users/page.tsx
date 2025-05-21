"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, UserCheck, UserX, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type User = {
  id: string
  name: string
  username: string
  email: string
  role: string
  training: string
  status: "active" | "inactive"
  lastLogin: string
}

export default function UsersPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, loading, router, user])

  useEffect(() => {
    // Mock API call to fetch users
    const fetchUsers = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        const mockUsers: User[] = [
          {
            id: "1",
            name: "Admin User",
            username: "adminpusjar",
            email: "admin@example.com",
            role: "admin",
            training: "N/A",
            status: "active",
            lastLogin: "2024-05-19T10:30:00",
          },
          {
            id: "2",
            name: "John Doe",
            username: "pesertapka01",
            email: "john@example.com",
            role: "user",
            training: "PKA",
            status: "active",
            lastLogin: "2024-05-18T14:45:00",
          },
          {
            id: "3",
            name: "Jane Smith",
            username: "pesertapkp01",
            email: "jane@example.com",
            role: "user",
            training: "PKP",
            status: "active",
            lastLogin: "2024-05-17T09:15:00",
          },
          {
            id: "4",
            name: "Robert Johnson",
            username: "pesertapkn01",
            email: "robert@example.com",
            role: "user",
            training: "PKN",
            status: "inactive",
            lastLogin: "2024-05-10T11:20:00",
          },
          {
            id: "5",
            name: "Sarah Williams",
            username: "cpns2024",
            email: "sarah@example.com",
            role: "user",
            training: "CPNS Latsar",
            status: "active",
            lastLogin: "2024-05-19T08:05:00",
          },
          {
            id: "6",
            name: "Michael Brown",
            username: "michael123",
            email: "michael@example.com",
            role: "user",
            training: "PKP",
            status: "active",
            lastLogin: "2024-05-16T16:30:00",
          },
          {
            id: "7",
            name: "Emily Davis",
            username: "emily456",
            email: "emily@example.com",
            role: "user",
            training: "PKA",
            status: "inactive",
            lastLogin: "2024-05-05T13:45:00",
          },
          {
            id: "8",
            name: "David Wilson",
            username: "david789",
            email: "david@example.com",
            role: "user",
            training: "CPNS Latsar",
            status: "active",
            lastLogin: "2024-05-18T10:10:00",
          },
        ]

        setUsers(mockUsers)
        setFilteredUsers(mockUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    // Filter users based on search term, role, and status
    let filtered = users

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredUsers(filtered)
  }, [searchTerm, roleFilter, statusFilter, users])

  const handleDeleteUser = () => {
    if (!selectedUser) return

    // In a real app, this would be a fetch call to your API
    setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))
    setDeleteDialogOpen(false)

    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been deleted from the system.`,
    })
  }

  const handleToggleUserStatus = (user: User) => {
    // In a real app, this would be a fetch call to your API
    const newStatus = user.status === "active" ? "inactive" : "active"

    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus as "active" | "inactive" } : u)))

    toast({
      title: `User ${newStatus}`,
      description: `${user.name} has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    })
  }

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users and their access permissions</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users by name, username, or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
            <CardDescription>
              Showing {filteredUsers.length} of {users.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Username</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Training</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Last Login</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </Badge>
                      </td>
                      <td className="p-4">{user.training}</td>
                      <td className="p-4">
                        <Badge variant={user.status === "active" ? "success" : "secondary"}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-4">{new Date(user.lastLogin).toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                              {user.status === "active" ? (
                                <>
                                  <UserX className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedUser(user)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

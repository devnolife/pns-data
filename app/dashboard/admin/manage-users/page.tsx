"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminDashboardLayout from "@/components/layouts/admin-dashboard-layout"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, UserCheck, UserX, Filter, Loader2 } from "lucide-react"

type User = {
  id: string
  name: string
  username: string
  email: string
  role: string
  training: string
  class?: string
  status: "active" | "inactive"
  lastLogin: string
}

export default function ManageUsersPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    role: "user",
    training: "",
    class: "",
    password: "",
  })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard/user")
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
            class: "PKA-01",
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
            class: "PKP-01",
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
            class: "PKN-01",
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
            class: "CPNS-01",
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
            class: "PKP-02",
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
            class: "PKA-02",
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
            class: "CPNS-02",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      // Validate form
      if (!formData.name || !formData.username || !formData.email || !formData.password) {
        throw new Error("All fields are required")
      }

      // In a real app, this would be a fetch call to your API
      const newUser: User = {
        id: `user-${Math.random().toString(36).substring(2)}`,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        training: formData.training || "N/A",
        class: formData.class,
        status: "active",
        lastLogin: "N/A",
      }

      // Add new user to state
      setUsers((prev) => [...prev, newUser])

      // Reset form and close dialog
      setFormData({
        name: "",
        username: "",
        email: "",
        role: "user",
        training: "",
        class: "",
        password: "",
      })
      setNewUserDialogOpen(false)

      toast({
        title: "User created",
        description: "The new user has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      if (!selectedUser) return

      // Validate form
      if (!formData.name || !formData.username || !formData.email) {
        throw new Error("Name, username, and email are required")
      }

      // In a real app, this would be a fetch call to your API
      const updatedUser: User = {
        ...selectedUser,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        training: formData.training || "N/A",
        class: formData.class,
      }

      // Update user in state
      setUsers((prev) => prev.map((user) => (user.id === selectedUser.id ? updatedUser : user)))

      // Reset form and close dialog
      setFormData({
        name: "",
        username: "",
        email: "",
        role: "user",
        training: "",
        class: "",
        password: "",
      })
      setSelectedUser(null)
      setEditUserDialogOpen(false)

      toast({
        title: "User updated",
        description: "The user has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

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

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      training: user.training,
      class: user.class || "",
      password: "",
    })
    setEditUserDialogOpen(true)
  }

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-600 mt-1">Manage system users and their access permissions</p>
          </div>
          <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateUser}>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>Add a new user to the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="training">Training Program</Label>
                      <Select
                        value={formData.training}
                        onValueChange={(value) => handleSelectChange("training", value)}
                      >
                        <SelectTrigger id="training">
                          <SelectValue placeholder="Select training" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CPNS Latsar">CPNS Latsar</SelectItem>
                          <SelectItem value="PKP">PKP</SelectItem>
                          <SelectItem value="PKA">PKA</SelectItem>
                          <SelectItem value="PKN">PKN</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Input
                      id="class"
                      name="class"
                      placeholder="Enter class (optional)"
                      value={formData.class}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setNewUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create User"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-center text-gray-500">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
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
                        <td className="p-4">
                          {user.lastLogin === "N/A" ? "Never" : new Date(user.lastLogin).toLocaleString()}
                        </td>
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
                              <DropdownMenuItem onClick={() => openEditDialog(user)}>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
          <DialogContent>
            <form onSubmit={handleEditUser}>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>Update user information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-username">Username</Label>
                    <Input
                      id="edit-username"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                      <SelectTrigger id="edit-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-training">Training Program</Label>
                    <Select value={formData.training} onValueChange={(value) => handleSelectChange("training", value)}>
                      <SelectTrigger id="edit-training">
                        <SelectValue placeholder="Select training" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CPNS Latsar">CPNS Latsar</SelectItem>
                        <SelectItem value="PKP">PKP</SelectItem>
                        <SelectItem value="PKA">PKA</SelectItem>
                        <SelectItem value="PKN">PKN</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-class">Class</Label>
                  <Input
                    id="edit-class"
                    name="class"
                    placeholder="Enter class (optional)"
                    value={formData.class}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-password">Password</Label>
                  <Input
                    id="edit-password"
                    name="password"
                    type="password"
                    placeholder="Enter new password (leave blank to keep current)"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">Leave blank to keep the current password</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedUser && (
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant={selectedUser.role === "admin" ? "default" : "outline"} className="mr-2">
                      {selectedUser.role === "admin" ? "Admin" : "User"}
                    </Badge>
                    <Badge variant={selectedUser.status === "active" ? "success" : "secondary"}>
                      {selectedUser.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteUser}>
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  )
}

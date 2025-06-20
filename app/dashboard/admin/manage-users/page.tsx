"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
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
import { useToastId } from "@/hooks/use-toast-id"
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, UserCheck, UserX, Filter, Loader2, Users, Settings, Key, CheckSquare, Square, BarChart3 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

type User = {
  id: string
  name: string | null
  username: string
  email: string
  role: string
  training: string | null
  angkatan: string | null
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
}

type UserStats = {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  recentUsers: number
  roleDistribution: {
    admin: number
    user: number
    moderator: number
  }
  trainingPrograms: Array<{
    training: string
    count: number
  }>
}

export default function ManageUsersPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { success, error } = useToastId()

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false)
  const [statsDialogOpen, setStatsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [formLoading, setFormLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [batchLoading, setBatchLoading] = useState(false)
  const [userStats, setUserStats] = useState<UserStats | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    role: "USER",
    training: "NONE",
    angkatan: "",
    password: "",
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "ADMIN") {
      router.push("/dashboard/user")
    }
  }, [isAuthenticated, isLoading, router, user])

  useEffect(() => {
    if (isAuthenticated && user?.role === "ADMIN") {
      fetchUsers()
    }
  }, [isAuthenticated, user, roleFilter, statusFilter, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)

      // Build query parameters
      const params = new URLSearchParams({
        page: '1',
        limit: '50'
      })

      if (roleFilter !== "all") {
        params.append('role', roleFilter)
      }

      if (statusFilter !== "all") {
        params.append('status', statusFilter)
      }

      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/users?${params.toString()}`)
      const result = await response.json()


      if (result.success) {
        setUsers(result.users)
        setFilteredUsers(result.users)
      } else {
        error("fetchUsers", { description: `Gagal mengambil data pengguna: ${result.error}` })
      }
    } catch (err) {
      console.error("Error fetching users:", err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error("fetchUsers", { description: `Gagal mengambil data pengguna: ${errorMessage}` })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    // Convert "NONE" back to empty string for training field
    const actualValue = (name === "training" && value === "NONE") ? "" : value
    setFormData((prev) => ({ ...prev, [name]: actualValue }))
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      // Validate form
      if (!formData.name || !formData.username || !formData.email || !formData.password) {
        throw new Error("All fields are required")
      }

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          training: formData.training === "NONE" ? undefined : formData.training || undefined,
          angkatan: formData.angkatan || undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Refresh users list
        await fetchUsers()

        // Reset form and close dialog
        setFormData({
          name: "",
          username: "",
          email: "",
          role: "USER",
          training: "NONE", // Use "NONE" for Select component
          angkatan: "",
          password: "",
        })
        setNewUserDialogOpen(false)

        success("userCreate", { description: "Pengguna baru berhasil dibuat." })
      } else {
        error("userCreate", { description: result.message || "Gagal membuat pengguna baru" })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create user"
      error("userCreate", { description: errorMessage })
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

      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          role: formData.role,
          training: formData.training === "NONE" ? undefined : formData.training || undefined,
          angkatan: formData.angkatan || undefined,
          ...(formData.password && { password: formData.password }),
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Refresh users list
        await fetchUsers()

        // Reset form and close dialog
        setFormData({
          name: "",
          username: "",
          email: "",
          role: "USER",
          training: "NONE", // Use "NONE" for Select component
          angkatan: "",
          password: "",
        })
        setSelectedUser(null)
        setEditUserDialogOpen(false)

        success("userUpdate", { description: "Pengguna berhasil diperbarui." })
      } else {
        error("userUpdate", { description: result.message || "Gagal memperbarui pengguna" })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update user"
      error("userUpdate", { description: errorMessage })
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        // Refresh users list
        await fetchUsers()
        setDeleteDialogOpen(false)

        success("userDelete", { description: `${selectedUser.name || selectedUser.username} berhasil dihapus dari sistem.` })
      } else {
        error("userDelete", { description: result.message || "Gagal menghapus pengguna" })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete user"
      error("userDelete", { description: errorMessage })
    }
  }

  const handleToggleUserStatus = async (user: User) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}/toggle-status`, {
        method: 'POST',
      })

      const result = await response.json()

      if (result.success) {
        // Refresh users list
        await fetchUsers()

        success("userToggle", { description: `${user.name || user.username} berhasil ${result.status === 'active' ? 'diaktifkan' : 'dinonaktifkan'}.` })
      } else {
        error("userToggle", { description: result.message || "Gagal mengubah status pengguna" })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to toggle user status"
      error("userToggle", { description: errorMessage })
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name || "",
      username: user.username,
      email: user.email,
      role: user.role,
      training: user.training || "NONE", // Convert null/empty to "NONE" for Select component
      angkatan: user.angkatan || "",
      password: "",
    })
    setEditUserDialogOpen(true)
  }

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/admin/users/stats')
      const result = await response.json()

      if (result.success) {
        setUserStats(result.stats)
      } else {
        console.error('Failed to fetch user stats:', result.error)
      }
    } catch (err) {
      console.error("Error fetching user stats:", err)
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleBatchOperation = async (action: string) => {
    if (selectedUsers.length === 0) {
      error("batchOperation", { description: "Pilih setidaknya satu user untuk operasi batch" })
      return
    }

    setBatchLoading(true)
    try {
      const response = await fetch('/api/admin/users/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          userIds: selectedUsers
        }),
      })

      const result = await response.json()

      if (result.success) {
        await fetchUsers()
        setSelectedUsers([])
        success("batchOperation", { description: result.message })
      } else {
        error("batchOperation", { description: result.message || `Gagal melakukan operasi ${action}` })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to ${action} users`
      error("batchOperation", { description: errorMessage })
    } finally {
      setBatchLoading(false)
    }
  }

  const openChangePasswordDialog = (user: User) => {
    setSelectedUser(user)
    setPasswordData({ newPassword: "", confirmPassword: "" })
    setChangePasswordDialogOpen(true)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      error("changePassword", { description: "Password tidak cocok" })
      return
    }

    if (passwordData.newPassword.length < 8) {
      error("changePassword", { description: "Password minimal 8 karakter" })
      return
    }

    setFormLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: passwordData.newPassword
        }),
      })

      const result = await response.json()

      if (result.success) {
        setChangePasswordDialogOpen(false)
        setPasswordData({ newPassword: "", confirmPassword: "" })
        setSelectedUser(null)
        success("changePassword", { description: "Password berhasil diubah" })
      } else {
        error("changePassword", { description: result.message || "Gagal mengubah password" })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to change password"
      error("changePassword", { description: errorMessage })
    } finally {
      setFormLoading(false)
    }
  }

  const openStatsDialog = async () => {
    setStatsDialogOpen(true)
    await fetchUserStats()
  }

  if (isLoading || !isAuthenticated || user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">👥 Kelola Pengguna</h1>
            <p className="mt-2 text-white/90">Kelola pengguna sistem dan izin akses mereka</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={openStatsDialog}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistik
            </Button>
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Users className="h-8 w-8 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8 flex justify-start items-center">
          <div className="flex items-center gap-4">
            <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-white top-10 left-96">
                <form onSubmit={handleCreateUser}>
                  <DialogHeader>
                    <DialogTitle>Buat Pengguna Baru</DialogTitle>
                    <DialogDescription>Tambahkan pengguna baru ke sistem</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Masukkan nama lengkap"
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
                          placeholder="Masukkan username"
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
                        placeholder="Masukkan alamat email"
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
                            <SelectValue placeholder="Pilih role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="USER">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="training">Program Pelatihan</Label>
                        <Select
                          value={formData.training}
                          onValueChange={(value) => handleSelectChange("training", value)}
                        >
                          <SelectTrigger id="training">
                            <SelectValue placeholder="Pilih pelatihan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CPNS Latsar">CPNS Latsar</SelectItem>
                            <SelectItem value="PKP">PKP</SelectItem>
                            <SelectItem value="PKA">PKA</SelectItem>
                            <SelectItem value="PKN">PKN</SelectItem>
                            <SelectItem value="NONE">Tidak Ada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="angkatan">Angkatan</Label>
                      <Input
                        id="angkatan"
                        name="angkatan"
                        placeholder="Masukkan angkatan (opsional)"
                        value={formData.angkatan}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setNewUserDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={formLoading}>
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Membuat...
                        </>
                      ) : (
                        "Buat Pengguna"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Batch Operations */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border">
                <span className="text-sm text-blue-700 font-medium">
                  {selectedUsers.length} dipilih
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBatchOperation('activate')}
                  disabled={batchLoading}
                  className="h-8"
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  Aktifkan
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBatchOperation('deactivate')}
                  disabled={batchLoading}
                  className="h-8"
                >
                  <UserX className="h-3 w-3 mr-1" />
                  Nonaktifkan
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBatchOperation('delete')}
                  disabled={batchLoading}
                  className="h-8"
                >
                  {batchLoading ? (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Trash2 className="h-3 w-3 mr-1" />
                  )}
                  Hapus
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari pengguna berdasarkan nama, username, atau email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pengguna Sistem</CardTitle>
            <CardDescription>
              Menampilkan {filteredUsers.length} dari {users.length} pengguna
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 w-8">
                        <Checkbox
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-4">Nama</th>
                      <th className="text-left p-4">Username</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Pelatihan</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Dibuat</th>
                      <th className="text-right p-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-4 text-center text-gray-500">
                          Tidak ada pengguna yang ditemukan sesuai kriteria.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                            />
                          </td>
                          <td className="p-4 font-medium">{user.name || user.username}</td>
                          <td className="p-4">{user.username}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                              {user.role === "ADMIN" ? "Admin" : user.role === "MODERATOR" ? "Moderator" : "User"}
                            </Badge>
                          </td>
                          <td className="p-4">{user.training || "Tidak Ada"}</td>
                          <td className="p-4">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {new Date(user.created_at).toLocaleDateString('id-ID')}
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Pengguna
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openChangePasswordDialog(user)}>
                                  <Key className="h-4 w-4 mr-2" />
                                  Ubah Password
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                                  {user.status === "active" ? (
                                    <>
                                      <UserX className="h-4 w-4 mr-2" />
                                      Nonaktifkan
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Aktifkan
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
                                  Hapus
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
            )}
          </CardContent>
        </Card>

        {/* Change Password Dialog */}
        <Dialog open={changePasswordDialogOpen} onOpenChange={setChangePasswordDialogOpen}>
          <DialogContent className="max-w-4xl bg-white top-10 left-96">
            <form onSubmit={handleChangePassword}>
              <DialogHeader>
                <DialogTitle>Ubah Password Pengguna</DialogTitle>
                <DialogDescription>
                  Ubah password untuk {selectedUser?.name || selectedUser?.username}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Masukkan password baru (min. 8 karakter)"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setChangePasswordDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengubah...
                    </>
                  ) : (
                    "Ubah Password"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* User Statistics Dialog */}
        <Dialog open={statsDialogOpen} onOpenChange={setStatsDialogOpen}>
          <DialogContent className="max-w-4xl top-10 left-96">
            <DialogHeader>
              <DialogTitle>Statistik Pengguna</DialogTitle>
              <DialogDescription>
                Ringkasan statistik pengguna sistem
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {userStats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.totalUsers}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pengguna Aktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{userStats.activeUsers}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pengguna Tidak Aktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">{userStats.inactiveUsers}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.roleDistribution.admin}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">User</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.roleDistribution.user}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Moderator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.roleDistribution.moderator}</div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
          <DialogContent className="max-w-4xl bg-white top-10 left-96">
            <form onSubmit={handleEditUser}>
              <DialogHeader>
                <DialogTitle>Edit Pengguna</DialogTitle>
                <DialogDescription>Perbarui informasi pengguna</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nama Lengkap</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      placeholder="Masukkan nama lengkap"
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
                      placeholder="Masukkan username"
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
                    placeholder="Masukkan alamat email"
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
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-training">Program Pelatihan</Label>
                    <Select value={formData.training} onValueChange={(value) => handleSelectChange("training", value)}>
                      <SelectTrigger id="edit-training">
                        <SelectValue placeholder="Pilih pelatihan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CPNS Latsar">CPNS Latsar</SelectItem>
                        <SelectItem value="PKP">PKP</SelectItem>
                        <SelectItem value="PKA">PKA</SelectItem>
                        <SelectItem value="PKN">PKN</SelectItem>
                        <SelectItem value="NONE">Tidak Ada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-angkatan">Angkatan</Label>
                  <Input
                    id="edit-angkatan"
                    name="angkatan"
                    placeholder="Masukkan angkatan (opsional)"
                    value={formData.angkatan}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-password">Password</Label>
                  <Input
                    id="edit-password"
                    name="password"
                    type="password"
                    placeholder="Masukkan password baru (kosongkan jika tidak ingin mengubah)"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">Kosongkan untuk tetap menggunakan password saat ini</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditUserDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memperbarui...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-4xl bg-white top-10 left-96">
            <DialogHeader>
              <DialogTitle>Hapus Pengguna</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedUser && (
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="font-medium">{selectedUser.name || selectedUser.username}</p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant={selectedUser.role === "ADMIN" ? "default" : "outline"} className="mr-2">
                      {selectedUser.role === "ADMIN" ? "Admin" : "User"}
                    </Badge>
                    <Badge variant={selectedUser.status === "active" ? "default" : "secondary"}>
                      {selectedUser.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Batal
              </Button>
              <Button type="button" variant="destructive" onClick={handleDeleteUser}>
                Hapus Pengguna
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

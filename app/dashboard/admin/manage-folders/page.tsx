"use client"

import { useState } from "react"
import {
  FolderPlus,
  Folder,
  FolderOpen,
  MoreVertical,
  Edit2,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Users,
  Calendar,
  Star,
  Archive,
  Lock,
  Unlock,
  Share2,
  Copy,
  Move,
  Sparkles,
  Zap,
  FileText,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface FolderItem {
  id: string
  name: string
  description: string
  type: "folder" | "collection"
  items: number
  size: string
  lastModified: string
  owner: string
  isPrivate: boolean
  isStarred: boolean
  color: string
  tags: string[]
}

const mockFolders: FolderItem[] = [
  {
    id: "1",
    name: "📊 Laporan Keuangan 2025",
    description: "Koleksi lengkap laporan keuangan tahunan",
    type: "collection",
    items: 45,
    size: "2.3 GB",
    lastModified: "2 jam yang lalu",
    owner: "Admin User",
    isPrivate: false,
    isStarred: true,
    color: "blue",
    tags: ["keuangan", "2025", "penting"],
  },
  {
    id: "2",
    name: "🎯 Project Archive",
    description: "Arsip project yang sudah selesai",
    type: "folder",
    items: 128,
    size: "5.7 GB",
    lastModified: "1 hari yang lalu",
    owner: "Sarah Chen",
    isPrivate: true,
    isStarred: false,
    color: "purple",
    tags: ["arsip", "project"],
  },
  {
    id: "3",
    name: "🚀 Digital Innovation",
    description: "Inovasi digital dan teknologi terbaru",
    type: "collection",
    items: 67,
    size: "1.8 GB",
    lastModified: "3 hari yang lalu",
    owner: "Tech Team",
    isPrivate: false,
    isStarred: true,
    color: "green",
    tags: ["teknologi", "inovasi", "digital"],
  },
  {
    id: "4",
    name: "📚 Knowledge Base",
    description: "Database pengetahuan dan dokumentasi",
    type: "folder",
    items: 234,
    size: "3.2 GB",
    lastModified: "1 minggu yang lalu",
    owner: "Documentation Team",
    isPrivate: false,
    isStarred: false,
    color: "orange",
    tags: ["dokumentasi", "pengetahuan"],
  },
]

export default function ManageFoldersPage() {
  const [folders, setFolders] = useState(mockFolders)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newFolder, setNewFolder] = useState({
    name: "",
    description: "",
    type: "folder" as "folder" | "collection",
    isPrivate: false,
    color: "blue",
    tags: "",
  })

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCreateFolder = () => {
    const folder: FolderItem = {
      id: Date.now().toString(),
      name: newFolder.name,
      description: newFolder.description,
      type: newFolder.type,
      items: 0,
      size: "0 MB",
      lastModified: "Baru saja",
      owner: "Admin User",
      isPrivate: newFolder.isPrivate,
      isStarred: false,
      color: newFolder.color,
      tags: newFolder.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    }
    setFolders([...folders, folder])
    setNewFolder({
      name: "",
      description: "",
      type: "folder",
      isPrivate: false,
      color: "blue",
      tags: "",
    })
    setIsCreateDialogOpen(false)
  }

  const toggleStar = (id: string) => {
    setFolders(
      folders.map((folder) =>
        folder.id === id ? { ...folder, isStarred: !folder.isStarred } : folder
      )
    )
  }

  const deleteFolder = (id: string) => {
    setFolders(folders.filter((folder) => folder.id !== id))
  }

  const getColorClass = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      green: "from-green-500 to-emerald-500",
      orange: "from-orange-500 to-red-500",
      pink: "from-pink-500 to-rose-500",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kelola Folder 📁</h1>
            <p className="mt-2 text-white/90">Atur koleksi digital Anda seperti seorang profesional!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <FolderPlus className="h-8 w-8 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Folder</p>
                <p className="text-2xl font-bold">{folders.length}</p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                <Folder className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Item</p>
                <p className="text-2xl font-bold">{folders.reduce((acc, folder) => acc + folder.items, 0)}</p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-green-100/50 dark:shadow-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Penyimpanan</p>
                <p className="text-2xl font-bold">13.0 GB</p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                <Archive className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Favorit</p>
                <p className="text-2xl font-bold">{folders.filter((f) => f.isStarred).length}</p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-3">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari folder, tag, atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 rounded-full pl-10"
            />
          </div>
          <Button variant="outline" className="rounded-full">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                <FolderPlus className="mr-2 h-4 w-4" />
                Buat Folder Baru
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-md border-0 rounded-3xl shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
              style={{
                position: 'fixed',
                top: '10%',
                left: '30%',
                transform: 'translate(-50%, -50%)',
                margin: 0,
                zIndex: 50
              }}
            >
              <div className="relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-3xl opacity-60" />

                {/* Content */}
                <div className="relative p-8">
                  <DialogHeader className="text-center mb-8">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <FolderPlus className="h-8 w-8 text-white" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ✨ Buat Folder Digital Baru
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 mt-2">
                      Buat folder koleksi digital yang terorganisir dengan rapi dan modern
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Nama Folder */}
                    <div className="space-y-3">
                      <Label htmlFor="folder-name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        📁 Nama Folder
                      </Label>
                      <Input
                        id="folder-name"
                        placeholder="Masukkan nama folder yang menarik..."
                        value={newFolder.name}
                        onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                        className="rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300"
                      />
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-3">
                      <Label htmlFor="folder-description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        📝 Deskripsi Folder
                      </Label>
                      <Textarea
                        id="folder-description"
                        placeholder="Jelaskan isi dan tujuan folder ini..."
                        value={newFolder.description}
                        onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
                        className="rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300 resize-none"
                        rows={3}
                      />
                    </div>

                    {/* Tipe dan Tema */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Tipe Folder */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          🗂️ Tipe Folder
                        </Label>
                        <div className="grid grid-cols-1 gap-3">
                          <Button
                            type="button"
                            variant={newFolder.type === "folder" ? "default" : "outline"}
                            className={`rounded-2xl h-12 transition-all duration-300 ${newFolder.type === "folder"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                              : "border-2 border-gray-200 hover:border-blue-300 bg-white/60"
                              }`}
                            onClick={() => setNewFolder({ ...newFolder, type: "folder" })}
                          >
                            <Folder className="mr-2 h-5 w-5" />
                            Folder Biasa
                          </Button>
                          <Button
                            type="button"
                            variant={newFolder.type === "collection" ? "default" : "outline"}
                            className={`rounded-2xl h-12 transition-all duration-300 ${newFolder.type === "collection"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                              : "border-2 border-gray-200 hover:border-purple-300 bg-white/60"
                              }`}
                            onClick={() => setNewFolder({ ...newFolder, type: "collection" })}
                          >
                            <Archive className="mr-2 h-5 w-5" />
                            Koleksi Khusus
                          </Button>
                        </div>
                      </div>

                      {/* Tema Warna */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          🎨 Tema Warna
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: "blue", color: "#3b82f6", label: "Biru" },
                            { name: "purple", color: "#8b5cf6", label: "Ungu" },
                            { name: "green", color: "#10b981", label: "Hijau" },
                            { name: "orange", color: "#f97316", label: "Oranye" },
                            { name: "pink", color: "#ec4899", label: "Pink" },
                            { name: "red", color: "#ef4444", label: "Merah" }
                          ].map((colorOption) => (
                            <button
                              key={colorOption.name}
                              type="button"
                              title={`Pilih tema ${colorOption.label}`}
                              className={`relative h-12 w-full rounded-2xl border-4 transition-all duration-300 hover:scale-105 ${newFolder.color === colorOption.name
                                ? "border-gray-800 shadow-lg scale-105"
                                : "border-gray-300 hover:border-gray-400"
                                }`}
                              style={{ backgroundColor: colorOption.color }}
                              onClick={() => setNewFolder({ ...newFolder, color: colorOption.name })}
                            >
                              {newFolder.color === colorOption.name && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-gray-800 rounded-full" />
                                  </div>
                                </div>
                              )}
                              <span className="sr-only">{colorOption.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                      <Label htmlFor="folder-tags" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        🏷️ Tag (Pisahkan dengan koma)
                      </Label>
                      <Input
                        id="folder-tags"
                        placeholder="contoh: penting, arsip, 2025, dokumen"
                        value={newFolder.tags}
                        onChange={(e) => setNewFolder({ ...newFolder, tags: e.target.value })}
                        className="rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300"
                      />
                    </div>

                    {/* Pengaturan Privasi */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="private-folder" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            🔒 Folder Privat
                          </Label>
                          <p className="text-xs text-gray-600">
                            Hanya Anda yang dapat melihat dan mengakses folder ini
                          </p>
                        </div>
                        <Switch
                          id="private-folder"
                          checked={newFolder.isPrivate}
                          onCheckedChange={(checked) => setNewFolder({ ...newFolder, isPrivate: checked })}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        className="flex-1 rounded-2xl h-12 border-2 border-gray-300 hover:border-gray-400 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 transition-all duration-300"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Batal
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCreateFolder}
                        disabled={!newFolder.name.trim()}
                        className="flex-1 rounded-2xl h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Buat Folder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Folders Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFolders.map((folder) => (
            <Card
              key={folder.id}
              className="group cursor-pointer border-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`rounded-2xl bg-gradient-to-r ${getColorClass(
                        folder.color
                      )} p-3 text-white shadow-lg`}
                    >
                      {folder.type === "collection" ? (
                        <Archive className="h-6 w-6" />
                      ) : (
                        <Folder className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStar(folder.id)}
                        className="h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Star
                          className={cn("h-4 w-4", folder.isStarred && "fill-yellow-400 text-yellow-400")}
                        />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteFolder(folder.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{folder.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{folder.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {folder.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {folder.tags.length > 3 && (
                      <Badge variant="outline" className="rounded-full text-xs">
                        +{folder.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>{folder.items} items</span>
                      <span>{folder.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className="text-xs">{folder.owner.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{folder.owner}</span>
                      {folder.isPrivate && <Lock className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredFolders.map((folder) => (
                <div key={folder.id} className="group flex items-center justify-between p-6 hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-xl bg-gradient-to-r ${getColorClass(
                        folder.color
                      )} p-2 text-white shadow-sm`}
                    >
                      {folder.type === "collection" ? (
                        <Archive className="h-5 w-5" />
                      ) : (
                        <Folder className="h-5 w-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{folder.name}</h3>
                        {folder.isStarred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        {folder.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{folder.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {folder.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="text-right">
                      <p>{folder.items} items</p>
                      <p>{folder.size}</p>
                    </div>
                    <div className="text-right">
                      <p>{folder.owner}</p>
                      <p>{folder.lastModified}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteFolder(folder.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredFolders.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6">
              <FolderOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Tidak ada folder ditemukan</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? "Coba sesuaikan kata kunci pencarian Anda" : "Buat folder pertama Anda untuk memulai!"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Buat Folder
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

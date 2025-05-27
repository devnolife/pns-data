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
            <h1 className="text-3xl font-bold">Manage Folders 📁</h1>
            <p className="mt-2 text-white/90">Organize your digital collections like a pro!</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Folders</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
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
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
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
                <p className="text-sm font-medium text-muted-foreground">Starred</p>
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
              placeholder="Search folders, tags, or descriptions..."
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
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Create New Folder
                </DialogTitle>
                <DialogDescription>
                  Set up your new digital collection with style!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="folder-name">Name</Label>
                  <Input
                    id="folder-name"
                    placeholder="Enter folder name..."
                    value={newFolder.name}
                    onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder-description">Description</Label>
                  <Textarea
                    id="folder-description"
                    placeholder="Describe what this folder contains..."
                    value={newFolder.description}
                    onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={newFolder.type === "folder" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewFolder({ ...newFolder, type: "folder" })}
                        className="flex-1 rounded-xl"
                      >
                        <Folder className="mr-2 h-4 w-4" />
                        Folder
                      </Button>
                      <Button
                        type="button"
                        variant={newFolder.type === "collection" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewFolder({ ...newFolder, type: "collection" })}
                        className="flex-1 rounded-xl"
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Collection
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <div className="flex gap-1">
                      {["blue", "purple", "green", "orange", "pink"].map((color) => (
                        <button
                          key={color}
                          type="button"
                          title={`Select ${color} theme`}
                          aria-label={`Select ${color} theme`}
                          className={`h-8 w-8 rounded-full border-2 ${newFolder.color === color ? "border-foreground" : "border-muted"
                            }`}
                          style={{
                            backgroundColor:
                              color === "blue"
                                ? "#3b82f6"
                                : color === "purple"
                                  ? "#8b5cf6"
                                  : color === "green"
                                    ? "#10b981"
                                    : color === "orange"
                                      ? "#f97316"
                                      : "#ec4899",
                          }}
                          onClick={() => setNewFolder({ ...newFolder, color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder-tags">Tags (comma-separated)</Label>
                  <Input
                    id="folder-tags"
                    placeholder="e.g., important, archive, 2025"
                    value={newFolder.tags}
                    onChange={(e) => setNewFolder({ ...newFolder, tags: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="private-folder" className="text-sm font-medium">
                    Private Folder
                  </Label>
                  <Switch
                    id="private-folder"
                    checked={newFolder.isPrivate}
                    onCheckedChange={(checked) => setNewFolder({ ...newFolder, isPrivate: checked })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCreateFolder}
                    disabled={!newFolder.name}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create
                  </Button>
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
            <h3 className="mt-4 text-lg font-semibold">No folders found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Create your first folder to get started!"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Folder
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

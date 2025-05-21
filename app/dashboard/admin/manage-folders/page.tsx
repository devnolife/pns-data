"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminDashboardLayout from "@/components/layouts/admin-dashboard-layout"
import { CreateFolderForm } from "@/components/admin/create-folder-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Folder, Search, Plus, MoreHorizontal, AlertTriangle, Trash2, Clock } from "lucide-react"

interface FolderType {
  id: string
  name: string
  reportType: string
  year: string
  batch: string
  description: string
  itemCount: number
  createdAt: string
  isExpired?: boolean
}

export default function ManageFoldersPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [folders, setFolders] = useState<FolderType[]>([])
  const [filteredFolders, setFilteredFolders] = useState<FolderType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false)
  const [editFolderDialogOpen, setEditFolderDialogOpen] = useState(false)
  const [deleteFolderDialogOpen, setDeleteFolderDialogOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null)
  const [expiredFoldersDialogOpen, setExpiredFoldersDialogOpen] = useState(false)
  const [expiredFolders, setExpiredFolders] = useState<FolderType[]>([])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard/user")
    }
  }, [isAuthenticated, loading, router, user])

  useEffect(() => {
    // Mock API call to fetch folders
    const fetchFolders = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        const currentYear = new Date().getFullYear()
        const mockFolders: FolderType[] = [
          {
            id: "1",
            name: "CPNS Latsar Batch 1 2024",
            reportType: "LATSAR",
            year: "2024",
            batch: "1",
            description: "Reports from CPNS Latsar Batch 1 2024",
            itemCount: 24,
            createdAt: "2024-01-15T10:30:00",
          },
          {
            id: "2",
            name: "PKP Leadership Module 2023",
            reportType: "PKP",
            year: "2023",
            batch: "3",
            description: "Leadership module reports from PKP 2023",
            itemCount: 18,
            createdAt: "2023-08-22T14:45:00",
          },
          {
            id: "3",
            name: "PKA Research Projects 2023",
            reportType: "PKA",
            year: "2023",
            batch: "2",
            description: "Research project reports from PKA 2023",
            itemCount: 15,
            createdAt: "2023-06-10T09:15:00",
          },
          {
            id: "4",
            name: "PKN Data Analysis 2024",
            reportType: "PKN",
            year: "2024",
            batch: "1",
            description: "Data analysis reports from PKN 2024",
            itemCount: 12,
            createdAt: "2024-03-05T11:20:00",
          },
          {
            id: "5",
            name: "CPNS Latsar Batch 2 2023",
            reportType: "LATSAR",
            year: "2023",
            batch: "2",
            description: "Reports from CPNS Latsar Batch 2 2023",
            itemCount: 30,
            createdAt: "2023-05-18T10:10:00",
          },
          {
            id: "6",
            name: "PKP Management Module 2022",
            reportType: "PKP",
            year: "2022",
            batch: "4",
            description: "Management module reports from PKP 2022",
            itemCount: 22,
            createdAt: "2022-11-14T16:30:00",
          },
          {
            id: "7",
            name: "PKA Case Studies 2019",
            reportType: "PKA",
            year: "2019",
            batch: "1",
            description: "Case study reports from PKA 2019",
            itemCount: 17,
            createdAt: "2019-04-20T13:45:00",
            isExpired: true,
          },
          {
            id: "8",
            name: "PKN Research Methods 2019",
            reportType: "PKN",
            year: "2019",
            batch: "2",
            description: "Research methodology reports from PKN 2019",
            itemCount: 14,
            createdAt: "2019-07-12T15:20:00",
            isExpired: true,
          },
        ]

        // Mark folders older than 5 years as expired
        const fiveYearsAgo = currentYear - 5
        mockFolders.forEach((folder) => {
          if (Number.parseInt(folder.year) <= fiveYearsAgo) {
            folder.isExpired = true
          }
        })

        setFolders(mockFolders)
        setFilteredFolders(mockFolders)
        setExpiredFolders(mockFolders.filter((folder) => folder.isExpired))
      } catch (error) {
        console.error("Error fetching folders:", error)
        toast({
          title: "Error",
          description: "Failed to fetch folders. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchFolders()
  }, [toast])

  useEffect(() => {
    // Filter folders based on search term
    if (searchTerm) {
      const filtered = folders.filter(
        (folder) =>
          folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          folder.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          folder.year.includes(searchTerm) ||
          folder.batch.includes(searchTerm),
      )
      setFilteredFolders(filtered)
    } else {
      setFilteredFolders(folders)
    }
  }, [searchTerm, folders])

  const handleCreateFolder = async (folderData: {
    name: string
    reportType: string
    year: string
    batch: string
    description: string
  }) => {
    // In a real app, this would be a fetch call to your API
    const newFolder: FolderType = {
      id: `folder-${Math.random().toString(36).substring(2)}`,
      ...folderData,
      itemCount: 0,
      createdAt: new Date().toISOString(),
    }

    setFolders((prev) => [...prev, newFolder])
    setCreateFolderDialogOpen(false)
  }

  const handleEditFolder = async (folderData: {
    name: string
    reportType: string
    year: string
    batch: string
    description: string
  }) => {
    if (!selectedFolder) return

    // In a real app, this would be a fetch call to your API
    const updatedFolder = {
      ...selectedFolder,
      ...folderData,
    }

    setFolders((prev) => prev.map((folder) => (folder.id === selectedFolder.id ? updatedFolder : folder)))
    setEditFolderDialogOpen(false)
    setSelectedFolder(null)
  }

  const handleDeleteFolder = async () => {
    if (!selectedFolder) return

    // In a real app, this would be a fetch call to your API
    setFolders((prev) => prev.filter((folder) => folder.id !== selectedFolder.id))
    setDeleteFolderDialogOpen(false)
    setSelectedFolder(null)

    toast({
      title: "Folder deleted",
      description: "The folder has been deleted successfully.",
    })
  }

  const handleDeleteExpiredFolders = async () => {
    // In a real app, this would be a fetch call to your API
    setFolders((prev) => prev.filter((folder) => !folder.isExpired))
    setExpiredFoldersDialogOpen(false)

    toast({
      title: "Expired folders deleted",
      description: "All expired folders have been deleted successfully.",
    })
  }

  const getReportTypeBadge = (reportType: string) => {
    switch (reportType) {
      case "LATSAR":
      case "CPNS":
        return <Badge className="bg-blue-100 text-blue-800">{reportType}</Badge>
      case "PKP":
        return <Badge className="bg-green-100 text-green-800">{reportType}</Badge>
      case "PKA":
        return <Badge className="bg-purple-100 text-purple-800">{reportType}</Badge>
      case "PKN":
        return <Badge className="bg-orange-100 text-orange-800">{reportType}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{reportType}</Badge>
    }
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Folders</h1>
            <p className="text-gray-600 mt-1">Create, edit, and delete folders for digital collections</p>
          </div>
          <div className="flex gap-2">
            {expiredFolders.length > 0 && (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setExpiredFoldersDialogOpen(true)}
              >
                <Clock className="h-4 w-4" />
                <span className="hidden md:inline">Expired Folders</span>
                <Badge variant="destructive" className="ml-1">
                  {expiredFolders.length}
                </Badge>
              </Button>
            )}
            <Button onClick={() => setCreateFolderDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Folder
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search folders by name, type, year, or batch..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolders.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No folders found matching your criteria.</p>
            </div>
          ) : (
            filteredFolders.map((folder) => (
              <Card key={folder.id} className={`overflow-hidden ${folder.isExpired ? "border-red-300 bg-red-50" : ""}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Folder className={`h-5 w-5 mr-2 ${folder.isExpired ? "text-red-500" : "text-blue-500"}`} />
                      <CardTitle className="text-lg">{folder.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedFolder(folder)
                            setEditFolderDialogOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedFolder(folder)
                            setDeleteFolderDialogOpen(true)
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getReportTypeBadge(folder.reportType)}
                    <Badge variant="outline">Year: {folder.year}</Badge>
                    <Badge variant="outline">Batch: {folder.batch}</Badge>
                    {folder.isExpired && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Expired
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{folder.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span>{folder.itemCount} items</span>
                    <span className="text-gray-500">Created: {new Date(folder.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Create Folder Dialog */}
      <Dialog open={createFolderDialogOpen} onOpenChange={setCreateFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Create a new folder to organize digital collections.</DialogDescription>
          </DialogHeader>
          <CreateFolderForm onSubmit={handleCreateFolder} onCancel={() => setCreateFolderDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Folder Dialog */}
      <Dialog open={editFolderDialogOpen} onOpenChange={setEditFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
            <DialogDescription>Update the folder details.</DialogDescription>
          </DialogHeader>
          {selectedFolder && (
            <CreateFolderForm
              initialData={{
                name: selectedFolder.name,
                reportType: selectedFolder.reportType,
                year: selectedFolder.year,
                batch: selectedFolder.batch,
                description: selectedFolder.description,
              }}
              onSubmit={handleEditFolder}
              onCancel={() => setEditFolderDialogOpen(false)}
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Folder Dialog */}
      <Dialog open={deleteFolderDialogOpen} onOpenChange={setDeleteFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Folder</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this folder? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedFolder && (
            <div className="py-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <div className="flex items-center mb-2">
                  <Folder className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">{selectedFolder.name}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {getReportTypeBadge(selectedFolder.reportType)}
                  <Badge variant="outline">Year: {selectedFolder.year}</Badge>
                  <Badge variant="outline">Batch: {selectedFolder.batch}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{selectedFolder.description}</p>
                <div className="text-sm text-gray-500">Contains {selectedFolder.itemCount} items</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteFolder}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expired Folders Dialog */}
      <Dialog open={expiredFoldersDialogOpen} onOpenChange={setExpiredFoldersDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Expired Folders</DialogTitle>
            <DialogDescription>
              The following folders are more than 5 years old and marked as expired. You can delete them to free up
              space.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3">Folder Name</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Year</th>
                    <th className="text-left p-3">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredFolders.map((folder) => (
                    <tr key={folder.id} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center">
                          <Folder className="h-4 w-4 text-red-500 mr-2" />
                          {folder.name}
                        </div>
                      </td>
                      <td className="p-3">{getReportTypeBadge(folder.reportType)}</td>
                      <td className="p-3">{folder.year}</td>
                      <td className="p-3">{folder.itemCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExpiredFoldersDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteExpiredFolders}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All Expired Folders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  )
}

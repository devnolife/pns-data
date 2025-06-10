import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorState } from "@/components/common/error-state"
import {
  getGuestbookEntriesAction,
  deleteGuestbookEntryAction,
  approveGuestbookEntryAction
} from "@/lib/actions/guestbook"
import {
  Trash2,
  CheckCircle,
  Search,
  Users,
  Calendar,
  Mail,
  Building2,
  MessageSquare
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface GuestbookEntry {
  id: string
  name: string
  email?: string
  message: string
  institution: string
  membership: string
  visitPurpose: string
  createdAt: Date
  is_approved: boolean
}

interface GuestbookAdminProps {
  className?: string
}

export function GuestbookAdmin({ className = "" }: GuestbookAdminProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const loadEntries = async (page = 1, search = "") => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await getGuestbookEntriesAction(page, 20, search)

      if (result.error) {
        setError(result.error)
      } else if (result.success && result.entries) {
        setEntries(result.entries as GuestbookEntry[])
        if (result.pagination) {
          setTotalPages(result.pagination.totalPages)
          setCurrentPage(result.pagination.page)
        }
      }
    } catch (err) {
      setError('Failed to load guestbook entries')
      console.error('Error loading entries:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEntries(currentPage, searchTerm)
  }, [currentPage])

  const handleSearch = () => {
    setCurrentPage(1)
    loadEntries(1, searchTerm)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    setProcessingId(id)
    try {
      const result = await deleteGuestbookEntryAction(id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Success",
          description: "Entry deleted successfully"
        })
        loadEntries(currentPage, searchTerm)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive"
      })
    } finally {
      setProcessingId(null)
    }
  }

  const handleApprove = async (id: string) => {
    setProcessingId(id)
    try {
      const result = await approveGuestbookEntryAction(id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Success",
          description: "Entry approved successfully"
        })
        loadEntries(currentPage, searchTerm)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve entry",
        variant: "destructive"
      })
    } finally {
      setProcessingId(null)
    }
  }

  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.email && entry.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return <LoadingState message="Loading guestbook entries..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => loadEntries(currentPage, searchTerm)} />
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Guestbook Management
          </CardTitle>
          <CardDescription>
            Manage and review guestbook entries from visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search entries..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{entries.length}</p>
                <p className="text-sm text-gray-600">Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {entries.filter(e => e.is_approved).length}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {entries.filter(e =>
                    new Date(e.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
                <p className="text-sm text-gray-600">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No entries found</h3>
              <p className="text-gray-600">No guestbook entries match your search criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                      {entry.email && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {entry.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={entry.is_approved ? "default" : "secondary"}>
                      {entry.is_approved ? "Approved" : "Pending"}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span><strong>Institution:</strong> {entry.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span><strong>Membership:</strong> {entry.membership}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Visit Purpose:</strong></p>
                  <p className="text-sm">{entry.visitPurpose}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1"><strong>Message:</strong></p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{entry.message}</p>
                </div>

                <div className="flex justify-end gap-2">
                  {!entry.is_approved && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(entry.id)}
                      disabled={processingId === entry.id}
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(entry.id)}
                    disabled={processingId === entry.id}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <span className="py-2 px-4 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
} 

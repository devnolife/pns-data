"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface CreateFolderFormProps {
  onSubmit: (folderData: {
    name: string
    reportType: string
    year: string
    batch: string
    description: string
  }) => Promise<void>
  onCancel: () => void
  initialData?: {
    name: string
    reportType: string
    year: string
    batch: string
    description: string
  }
  isEdit?: boolean
}

export function CreateFolderForm({ onSubmit, onCancel, initialData, isEdit = false }: CreateFolderFormProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString())

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    reportType: initialData?.reportType || "",
    year: initialData?.year || currentYear.toString(),
    batch: initialData?.batch || "",
    description: initialData?.description || "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit(formData)
      toast({
        title: isEdit ? "Folder updated" : "Folder created",
        description: isEdit ? "The folder has been updated successfully." : "The folder has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} folder. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Folder Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter folder name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reportType">Type of Report</Label>
        <Select value={formData.reportType} onValueChange={(value) => handleSelectChange("reportType", value)} required>
          <SelectTrigger id="reportType">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PKN">PKN</SelectItem>
            <SelectItem value="PKP">PKP</SelectItem>
            <SelectItem value="PKA">PKA</SelectItem>
            <SelectItem value="LATSAR">Latsar CPNS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)} required>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="batch">Batch</Label>
          <Select value={formData.batch} onValueChange={(value) => handleSelectChange("batch", value)} required>
            <SelectTrigger id="batch">
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I">I</SelectItem>
              <SelectItem value="II">II</SelectItem>
              <SelectItem value="III">III</SelectItem>
              <SelectItem value="IV">IV</SelectItem>
              <SelectItem value="V">V</SelectItem>
              <SelectItem value="VI">VI</SelectItem>
              <SelectItem value="VII">VII</SelectItem>
              <SelectItem value="VIII">VIII</SelectItem>
              <SelectItem value="IX">IX</SelectItem>
              <SelectItem value="X">X</SelectItem>
              <SelectItem value="XI">XI</SelectItem>
              <SelectItem value="XII">XII</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter folder description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Create Folder"
          )}
        </Button>
      </div>
    </form>
  )
}

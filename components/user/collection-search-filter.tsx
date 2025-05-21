"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

interface CollectionSearchFilterProps {
  onSearch: (params: { query: string; category: string; year: string; batch: string }) => void
  categories: string[]
  years: string[]
  batches: string[]
}

export function CollectionSearchFilter({ onSearch, categories, years, batches }: CollectionSearchFilterProps) {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "all",
    year: "all",
    batch: "all",
  })

  const handleChange = (field: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = { ...prev, [field]: value }
      return newParams
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchParams)
  }

  const handleReset = () => {
    setSearchParams({
      query: "",
      category: "all",
      year: "all",
      batch: "all",
    })
    onSearch({
      query: "",
      category: "all",
      year: "all",
      batch: "all",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search collections..."
            className="pl-10"
            value={searchParams.query}
            onChange={(e) => handleChange("query", e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={searchParams.category} onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={searchParams.year} onValueChange={(value) => handleChange("year", value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={searchParams.batch} onValueChange={(value) => handleChange("batch", value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  Batch {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" variant="default">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>

          <Button type="button" variant="outline" onClick={handleReset}>
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </form>
  )
}

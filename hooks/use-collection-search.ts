import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { searchPublicDocumentsAction } from '@/lib/actions/documents'

export type SearchResult = {
  collections: any[]
  reports: any[]
  query: string
  isPublicSearch: boolean
}

export type SearchFilters = {
  type?: 'collections' | 'reports' | 'all'
  year?: string
  batch?: string
  category?: string
}

export function useCollectionSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({ type: 'all' })
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const search = useCallback(async () => {
    if (!debouncedSearchTerm.trim()) {
      setResults(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await searchPublicDocumentsAction(debouncedSearchTerm, filters.type)

      if (result.success && result.data) {
        // Apply additional filters
        let filteredResults = { ...result.data }

        if (filters.year) {
          filteredResults.reports = filteredResults.reports.filter(
            (report: any) => report.year === filters.year
          )
        }

        if (filters.batch) {
          filteredResults.reports = filteredResults.reports.filter(
            (report: any) => report.batch === filters.batch
          )
        }

        if (filters.category) {
          filteredResults.reports = filteredResults.reports.filter(
            (report: any) => report.category === filters.category
          )
          filteredResults.collections = filteredResults.collections.filter(
            (collection: any) => collection.category === filters.category
          )
        }

        setResults(filteredResults)
      } else {
        setError(result.error || 'Failed to search documents')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchTerm, filters])

  useEffect(() => {
    search()
  }, [search])

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ type: 'all' })
    setSearchTerm('')
    setResults(null)
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilters,
    resetFilters,
    results,
    loading,
    error,
    search
  }
} 

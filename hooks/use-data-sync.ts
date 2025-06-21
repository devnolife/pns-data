import { useEffect, useCallback } from 'react'

interface UseDataSyncOptions {
  onDataUpdate?: () => void
  refreshInterval?: number // in milliseconds
}

export function useDataSync({ onDataUpdate, refreshInterval = 30000 }: UseDataSyncOptions = {}) {
  // Function to notify other pages about data changes
  const notifyDataUpdate = useCallback(() => {
    const timestamp = Date.now().toString()
    localStorage.setItem('data-updated', timestamp)
    
    // Trigger storage event for same-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'data-updated',
      newValue: timestamp
    }))
  }, [])

  // Function to check if data should be refreshed
  const shouldRefresh = useCallback(() => {
    const lastRefresh = localStorage.getItem('dashboard-last-refresh')
    const now = Date.now()
    
    return !lastRefresh || now - parseInt(lastRefresh) > refreshInterval
  }, [refreshInterval])

  // Function to mark data as refreshed
  const markAsRefreshed = useCallback(() => {
    localStorage.setItem('dashboard-last-refresh', Date.now().toString())
  }, [])

  useEffect(() => {
    if (!onDataUpdate) return

    const handleFocus = () => {
      if (shouldRefresh()) {
        onDataUpdate()
        markAsRefreshed()
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'data-updated' && e.newValue) {
        onDataUpdate()
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && shouldRefresh()) {
        onDataUpdate()
        markAsRefreshed()
      }
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Set initial timestamp
    markAsRefreshed()

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [onDataUpdate, shouldRefresh, markAsRefreshed])

  return {
    notifyDataUpdate,
    shouldRefresh,
    markAsRefreshed
  }
} 

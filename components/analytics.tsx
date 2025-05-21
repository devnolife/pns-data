"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would typically add your analytics tracking code
    // For example, Google Analytics or a custom analytics solution
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

    // Example: Track page view
    console.log(`Page viewed: ${url}`)

    // You could send this data to your backend API
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ path: url }),
    // })
  }, [pathname, searchParams])

  return null
}

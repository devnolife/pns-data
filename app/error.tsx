"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Something went wrong</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
        We apologize for the inconvenience. An error has occurred.
      </p>
      {error.digest && <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Error ID: {error.digest}</p>}
      <div className="mt-8 space-x-4">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}

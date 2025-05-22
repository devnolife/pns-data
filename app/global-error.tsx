"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Application Error</h1>
          <p className="mt-4 text-gray-600 max-w-md">
            A critical error has occurred. We've been notified and are working to fix the issue.
          </p>
          {error.digest && <p className="mt-2 text-sm text-gray-500">Error ID: {error.digest}</p>}
          <div className="mt-8">
            <Button onClick={reset}>Try Again</Button>
          </div>
        </div>
      </body>
    </html>
  )
}

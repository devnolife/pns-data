"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Suspense, useEffect, useState } from "react"

export default function NotFound() {
  // Use useState to avoid direct rendering of components that might use useSearchParams
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 space-x-4">
        {mounted ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/public-collections">Browse Collections</Link>
            </Button>
          </Suspense>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

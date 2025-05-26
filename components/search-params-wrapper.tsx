"use client"

import type React from "react"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParamsWrapperProps {
  children: (params: URLSearchParams) => React.ReactNode
  fallback?: React.ReactNode
}

function SearchParamsContent({ children }: { children: (params: URLSearchParams) => React.ReactNode }) {
  const searchParams = useSearchParams()
  return <>{children(searchParams)}</>
}

export function SearchParamsWrapper({ children, fallback = <div>Loading...</div> }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  )
}

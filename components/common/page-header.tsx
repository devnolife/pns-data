import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  heading: string
  subheading?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ heading, subheading, children, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-4 pt-6 md:pb-8 md:pt-10", className)}>
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h1>
        {subheading && <p className="text-muted-foreground">{subheading}</p>}
      </div>
      {children}
    </div>
  )
}

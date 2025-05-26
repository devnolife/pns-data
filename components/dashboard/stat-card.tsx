import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const statCardVariants = cva(
  "relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary: "bg-primary/10 border-primary/20 text-primary-foreground",
        success: "bg-green-50 border-green-100 dark:bg-green-950/30 dark:border-green-900",
        warning: "bg-yellow-50 border-yellow-100 dark:bg-yellow-950/30 dark:border-yellow-900",
        danger: "bg-red-50 border-red-100 dark:bg-red-950/30 dark:border-red-900",
        info: "bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: string | number
    isPositive?: boolean
  }
}

export function StatCard({ title, value, description, icon, trend, variant, className, ...props }: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)} {...props}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <p
              className={cn(
                "flex items-center text-xs font-medium",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        {icon && <div className="text-muted-foreground/50">{icon}</div>}
      </div>
    </div>
  )
}

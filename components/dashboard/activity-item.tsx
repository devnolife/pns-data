import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const activityItemVariants = cva("flex items-center gap-4 rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-background",
      highlight: "bg-muted/50 border-primary/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ActivityItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof activityItemVariants> {
  title: string
  description: string
  timestamp: string
  icon?: React.ReactNode
}

export function ActivityItem({ title, description, timestamp, icon, variant, className, ...props }: ActivityItemProps) {
  return (
    <div className={cn(activityItemVariants({ variant }), className)} {...props}>
      {icon && <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">{icon}</div>}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-sm text-muted-foreground">{timestamp}</div>
    </div>
  )
}

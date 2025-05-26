import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface ActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export function ActionCard({ title, description, icon, href, className, ...props }: ActionCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "default", size: "sm" }),
          "mt-2 w-full justify-center transition-transform group-hover:translate-y-0",
        )}
      >
        Lihat Detail
      </Link>
    </div>
  )
}

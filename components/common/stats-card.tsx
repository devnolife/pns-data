import { cn } from "@/lib/utils"

interface StatsCardProps {
  value: string
  label: string
  className?: string
}

export function StatsCard({ value, label, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border bg-background p-6 text-center shadow-sm",
        className,
      )}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

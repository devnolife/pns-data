import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WelcomeBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string
  role?: string
}

export function WelcomeBanner({ username = "Admin", role = "Administrator", className, ...props }: WelcomeBannerProps) {
  const currentTime = new Date()
  const hour = currentTime.getHours()

  let greeting = "Selamat pagi"
  if (hour >= 12 && hour < 17) {
    greeting = "Selamat siang"
  } else if (hour >= 17) {
    greeting = "Selamat malam"
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm",
        "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
        className,
      )}
      {...props}
    >
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {username}!
        </h1>
        <p className="text-muted-foreground">
          Anda masuk sebagai <span className="font-medium text-primary">{role}</span>
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="default">
          <Link href="/dashboard/admin/verify-reports">Verifikasi Laporan</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/admin/number-of-visitors">Lihat Statistik</Link>
        </Button>
      </div>
      <div className="absolute right-4 top-4 h-24 w-24 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full text-primary"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
    </div>
  )
}

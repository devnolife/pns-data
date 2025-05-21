"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MainNavProps {
  items: {
    title: string
    href: string
  }[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex gap-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

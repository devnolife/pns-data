import Image from "next/image"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  imageSrc: string
  className?: string
}

export function TestimonialCard({ quote, author, role, imageSrc, className }: TestimonialCardProps) {
  return (
    <div className={cn("flex flex-col rounded-lg border bg-background p-6 shadow-sm", className)}>
      <div className="mb-4 text-lg italic text-muted-foreground">"{quote}"</div>
      <div className="mt-auto flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={imageSrc || "/placeholder.svg"} alt={author} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}

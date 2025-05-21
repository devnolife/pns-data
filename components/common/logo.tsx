import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
        <span className="text-primary-foreground font-bold text-sm">DC</span>
      </div>
      <span className="font-bold inline-block">DCMS</span>
    </Link>
  )
}

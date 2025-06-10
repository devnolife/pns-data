import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  message?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingState({
  message = "Loading...",
  className = "",
  size = "md"
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="flex items-center gap-3 text-primary">
        <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
        <p className="font-medium">{message}</p>
      </div>
    </div>
  )
}

interface ModernLoadingStateProps {
  message?: string
  className?: string
}

export function ModernLoadingState({
  message = "Loading amazing content...",
  className = ""
}: ModernLoadingStateProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-pink-400 opacity-20"></div>
      </div>
      {message && (
        <p className="ml-4 text-lg font-medium text-gray-600">{message}</p>
      )}
    </div>
  )
} 

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className = ""
}: ErrorStateProps) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

interface ModernErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ModernErrorState({
  title = "Oops! Something went wrong 😢",
  message,
  onRetry,
  className = ""
}: ModernErrorStateProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6 ${className}`}>
      <Card className="max-w-md bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600 mb-2">{title}</CardTitle>
          <CardDescription className="text-gray-600">{message}</CardDescription>
        </CardHeader>
        {onRetry && (
          <CardContent className="text-center">
            <Button
              onClick={onRetry}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-2xl px-6 py-3 font-bold gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again ✨
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
} 

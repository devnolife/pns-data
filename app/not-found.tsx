import { headers } from "next/headers"

export default function NotFound() {
  // Force this to be a Server Component by using a server-only API
  headers()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 space-x-4">
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Go Home
        </a>
        <a
          href="/public-collections"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Browse Collections
        </a>
      </div>
    </div>
  )
}

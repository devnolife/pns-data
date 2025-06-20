import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { FileProtectionMiddleware } from "./lib/security/file-protection"

// Define the routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/guestbook", "/public-collections"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ PERBAIKAN: Enhanced file protection with better cover image handling
  if (pathname.startsWith("/uploads/")) {
    // Special handling for cover images
    if (pathname.startsWith("/uploads/covers/")) {
      // Allow direct access to cover images with minimal restrictions
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
      const hasImageExtension = imageExtensions.some(ext =>
        pathname.toLowerCase().endsWith(ext)
      )

      if (hasImageExtension) {
        console.log(`🖼️ Cover image request allowed: ${pathname}`)
        return NextResponse.next()
      }
    }

    // For other uploads, use file protection
    const protectionResponse = await FileProtectionMiddleware.protectFileAccess(request)
    if (protectionResponse) {
      return protectionResponse
    }
  }

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If the route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check if this is a dashboard route
  const isDashboardRoute = pathname.startsWith("/dashboard")

  if (isDashboardRoute) {
    // Get the authentication token from the cookies
    const token = request.cookies.get("token")?.value

    // If no token exists, redirect to login
    if (!token) {
      const url = new URL("/login", request.url)
      // Use encodeURIComponent instead of encodeURI for better compatibility
      url.searchParams.set("callbackUrl", encodeURIComponent(pathname))
      return NextResponse.redirect(url)
    }
  }

  // Allow access to the route
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

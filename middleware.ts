import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

// Define the routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/guestbook", "/public-collections"]

const JWT_SECRET = process.env.JWT_SECRET!

function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (error) {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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

    // If no token exists or token is invalid, redirect to login
    if (!token || !verifyToken(token)) {
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

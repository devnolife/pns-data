import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define the routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/guestbook", "/public-collections"]

// Define the routes that require admin role
const adminRoutes = [
  "/dashboard/admin",
  "/dashboard/admin/number-of-visitors",
  "/dashboard/admin/verify-reports",
  "/dashboard/admin/manage-folders",
  "/dashboard/admin/manage-users",
  "/dashboard/admin/notifications",
  "/dashboard/admin/settings",
]

// Define the routes that require user role
const userRoutes = [
  "/dashboard/user",
  "/dashboard/user/digital-collection",
  "/dashboard/user/upload-report",
  "/dashboard/user/profile",
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If the route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Get the authentication token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // If no token exists, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Get the user role from the cookies
  const role = request.cookies.get("user-role")?.value

  if (!role) {
    // If role is missing, redirect to login
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If it's an admin route but the user is not an admin, redirect to user dashboard
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/user", request.url))
  }

  // Check if the route is a user route
  const isUserRoute = userRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If it's a user route but the user is an admin, redirect to admin dashboard
  if (isUserRoute && role === "admin") {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url))
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

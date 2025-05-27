import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export interface AuthUser {
  id: string
  username: string
  role: string
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from cookie
  const tokenFromCookie = request.cookies.get('token')?.value
  if (tokenFromCookie) {
    return tokenFromCookie
  }

  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  return null
}

export function requireAuth(request: NextRequest): AuthUser | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }

  return verifyToken(token)
}

export function requireRole(user: AuthUser | null, allowedRoles: string[]): boolean {
  if (!user) {
    return false
  }

  return allowedRoles.includes(user.role)
} 

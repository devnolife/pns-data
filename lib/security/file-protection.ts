import { NextRequest, NextResponse } from 'next/server'
import { SECURITY_CONFIG, SecurityUtils } from './config'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Access log store (in production, use proper logging service)
const accessLogs: Array<{
  ip: string
  userAgent: string
  path: string
  timestamp: number
  blocked: boolean
  reason?: string
}> = []

export class FileProtectionMiddleware {
  // Check rate limits for file access
  static checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
    const now = Date.now()
    const hourlyKey = `${ip}:${Math.floor(now / (60 * 60 * 1000))}`
    const dailyKey = `${ip}:${Math.floor(now / (24 * 60 * 60 * 1000))}`

    // Clean up old entries
    for (const [key, data] of rateLimitStore.entries()) {
      if (data.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }

    // Check hourly limit
    const hourlyData = rateLimitStore.get(hourlyKey) || { count: 0, resetTime: now + (60 * 60 * 1000) }
    if (hourlyData.count >= SECURITY_CONFIG.FILE_ACCESS.RATE_LIMIT.MAX_REQUESTS_PER_HOUR) {
      return { allowed: false, reason: 'Hourly rate limit exceeded' }
    }

    // Check daily limit
    const dailyData = rateLimitStore.get(dailyKey) || { count: 0, resetTime: now + (24 * 60 * 60 * 1000) }
    if (dailyData.count >= SECURITY_CONFIG.FILE_ACCESS.RATE_LIMIT.MAX_REQUESTS_PER_DAY) {
      return { allowed: false, reason: 'Daily rate limit exceeded' }
    }

    // Update counters
    hourlyData.count++
    dailyData.count++
    rateLimitStore.set(hourlyKey, hourlyData)
    rateLimitStore.set(dailyKey, dailyData)

    return { allowed: true }
  }

  // Log access attempt
  static logAccess(request: NextRequest, blocked: boolean, reason?: string) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const path = request.nextUrl.pathname

    const logEntry = {
      ip,
      userAgent,
      path,
      timestamp: Date.now(),
      blocked,
      reason
    }

    accessLogs.push(logEntry)

    // Keep only last 1000 entries (in production, use proper log rotation)
    if (accessLogs.length > 1000) {
      accessLogs.splice(0, accessLogs.length - 1000)
    }

    SecurityUtils.logSecurityEvent(blocked ? 'unauthorized_access' : 'file_access', logEntry)
  }

  // Validate file path security
  static validateFilePath(filePath: string): { valid: boolean; reason?: string } {
    // Check for path traversal attempts
    if (filePath.includes('..') || filePath.includes('\\')) {
      return { valid: false, reason: 'Path traversal attempt detected' }
    }

    // Ensure path starts with uploads/
    if (!filePath.startsWith('uploads/')) {
      return { valid: false, reason: 'Invalid file path - must be in uploads directory' }
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /\.(exe|bat|cmd|sh|ps1|vbs|scr)$/i, // Executable files
      /\.(php|asp|jsp|cgi)$/i, // Server-side scripts
      /\.(htaccess|htpasswd|config)$/i, // Configuration files
      /\.(sql|db|sqlite)$/i, // Database files
    ]

    if (suspiciousPatterns.some(pattern => pattern.test(filePath))) {
      return { valid: false, reason: 'Suspicious file type detected' }
    }

    return { valid: true }
  }

  // Check if request is from a suspicious source
  static checkSuspiciousActivity(request: NextRequest): { suspicious: boolean; reason?: string } {
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''

    // Check for bot/crawler patterns
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /wget/i,
      /curl/i
    ]

    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      return { suspicious: true, reason: 'Bot/crawler detected' }
    }

    // Check for missing or suspicious user agent
    if (!userAgent || userAgent.length < 10) {
      return { suspicious: true, reason: 'Missing or suspicious user agent' }
    }

    // Check for direct access (no referer from our domain)
    if (referer && !referer.includes(request.nextUrl.hostname)) {
      return { suspicious: true, reason: 'External referer detected' }
    }

    return { suspicious: false }
  }

  // Main protection handler
  static async protectFileAccess(request: NextRequest): Promise<NextResponse | null> {
    const { pathname } = request.nextUrl
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'

    // Only protect uploads directory
    if (!pathname.startsWith('/uploads/')) {
      return null // Let other middleware handle
    }

    // Check rate limits
    const rateLimitCheck = this.checkRateLimit(ip)
    if (!rateLimitCheck.allowed) {
      this.logAccess(request, true, rateLimitCheck.reason)
      return new NextResponse('Rate limit exceeded', {
        status: 429,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // Validate file path
    const pathValidation = this.validateFilePath(pathname.substring(1)) // Remove leading slash
    if (!pathValidation.valid) {
      this.logAccess(request, true, pathValidation.reason)
      return new NextResponse('Invalid file path', {
        status: 400,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // Check for suspicious activity
    const suspiciousCheck = this.checkSuspiciousActivity(request)
    if (suspiciousCheck.suspicious) {
      this.logAccess(request, true, suspiciousCheck.reason)
      return new NextResponse('Access denied', {
        status: 403,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // Block direct file access - redirect to secure API
    this.logAccess(request, true, 'Direct file access blocked')
    return new NextResponse(
      'Direct file access not allowed. Use secure API endpoints for file access.',
      {
        status: 403,
        headers: {
          ...SecurityUtils.getSecurityHeaders(true),
          'Content-Type': 'text/plain'
        }
      }
    )
  }

  // Get access statistics
  static getAccessStats() {
    const now = Date.now()
    const oneHourAgo = now - (60 * 60 * 1000)
    const oneDayAgo = now - (24 * 60 * 60 * 1000)

    const recentLogs = accessLogs.filter(log => log.timestamp > oneDayAgo)
    const hourlyLogs = accessLogs.filter(log => log.timestamp > oneHourAgo)

    return {
      total: accessLogs.length,
      last24Hours: recentLogs.length,
      lastHour: hourlyLogs.length,
      blocked: recentLogs.filter(log => log.blocked).length,
      blockedLastHour: hourlyLogs.filter(log => log.blocked).length,
      topIPs: this.getTopIPs(recentLogs),
      topReasons: this.getTopBlockReasons(recentLogs.filter(log => log.blocked))
    }
  }

  // Get top IPs by access count
  private static getTopIPs(logs: typeof accessLogs) {
    const ipCounts = new Map<string, number>()

    logs.forEach(log => {
      ipCounts.set(log.ip, (ipCounts.get(log.ip) || 0) + 1)
    })

    return Array.from(ipCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }))
  }

  // Get top block reasons
  private static getTopBlockReasons(blockedLogs: typeof accessLogs) {
    const reasonCounts = new Map<string, number>()

    blockedLogs.forEach(log => {
      if (log.reason) {
        reasonCounts.set(log.reason, (reasonCounts.get(log.reason) || 0) + 1)
      }
    })

    return Array.from(reasonCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([reason, count]) => ({ reason, count }))
  }
}

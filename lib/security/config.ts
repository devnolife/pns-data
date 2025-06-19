// Security configuration for document viewing and file access

export const SECURITY_CONFIG = {
  // File access restrictions
  FILE_ACCESS: {
    // Maximum file size for viewing (50MB)
    MAX_FILE_SIZE: 50 * 1024 * 1024,

    // Allowed MIME types for public viewing
    ALLOWED_MIME_TYPES: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml'
    ],

    // Token expiration times
    TOKEN_EXPIRY: {
      PUBLIC: 2 * 60 * 60 * 1000, // 2 hours for public access
      AUTHENTICATED: 6 * 60 * 60 * 1000, // 6 hours for authenticated users
      ADMIN: 3 * 60 * 60 * 1000 // 3 hours for admin users
    },

    // Rate limiting
    RATE_LIMIT: {
      MAX_REQUESTS_PER_HOUR: 100,
      MAX_REQUESTS_PER_DAY: 500
    }
  },

  // Document viewer security
  DOCUMENT_VIEWER: {
    // Blocked keyboard shortcuts
    BLOCKED_SHORTCUTS: [
      { ctrl: true, key: 'c' }, // Copy
      { ctrl: true, key: 'a' }, // Select All
      { ctrl: true, key: 'v' }, // Paste
      { ctrl: true, key: 'x' }, // Cut
      { ctrl: true, key: 's' }, // Save
      { ctrl: true, key: 'p' }, // Print
      { key: 'F12' }, // Developer Tools
      { ctrl: true, shift: true, key: 'I' }, // Developer Tools
      { ctrl: true, shift: true, key: 'J' }, // Console
      { ctrl: true, shift: true, key: 'C' }, // Inspect Element
      { ctrl: true, key: 'u' }, // View Source
      { key: 'PrintScreen' }, // Screenshot
      { alt: true, key: 'PrintScreen' }, // Alt + PrintScreen
      { key: 'F5' }, // Refresh
      { ctrl: true, key: 'r' }, // Refresh
      { ctrl: true, key: 'f' }, // Find
      { ctrl: true, key: '+' }, // Zoom In
      { ctrl: true, key: '-' }, // Zoom Out
      { ctrl: true, key: '0' }, // Reset Zoom
    ],

    // Watermark settings
    WATERMARK: {
      ENABLED: true,
      TEXT: 'VIEW ONLY • PUBLIC ACCESS',
      OPACITY: 0.15,
      ROTATION: -45,
      DENSITY: 20 // Number of watermarks
    },

    // Security headers for document viewing
    SECURITY_HEADERS: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; frame-src 'self'; media-src 'self' blob:; font-src 'self' data:; worker-src 'self' blob:; child-src 'self' blob:;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Download-Options': 'noopen',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },

  // Public access restrictions
  PUBLIC_ACCESS: {
    // Features disabled for public users
    DISABLED_FEATURES: [
      'download',
      'print',
      'copy',
      'save',
      'share',
      'export',
      'screenshot'
    ],

    // Session limits
    SESSION: {
      MAX_DURATION: 4 * 60 * 60 * 1000, // 4 hours
      IDLE_TIMEOUT: 30 * 60 * 1000, // 30 minutes
      MAX_CONCURRENT_SESSIONS: 3
    },

    // Access logging
    LOGGING: {
      ENABLED: true,
      LOG_LEVEL: 'INFO',
      INCLUDE_IP: true,
      INCLUDE_USER_AGENT: true,
      RETENTION_DAYS: 30
    }
  },

  // PDF specific security
  PDF_SECURITY: {
    // PDF viewer restrictions
    VIEWER_PARAMS: {
      toolbar: 0,
      navpanes: 0,
      scrollbar: 1,
      view: 'FitH',
      zoom: 'page-fit',
      print: 0,
      download: 0
    },

    // Iframe sandbox attributes
    SANDBOX_ATTRIBUTES: [
      'allow-same-origin',
      'allow-scripts'
    ]
  },

  // Image security
  IMAGE_SECURITY: {
    // Prevent image saving
    DISABLE_RIGHT_CLICK: true,
    DISABLE_DRAG: true,
    DISABLE_SELECTION: true,

    // Image processing
    MAX_RESOLUTION: {
      WIDTH: 1920,
      HEIGHT: 1080
    }
  },

  // Audit and monitoring
  AUDIT: {
    // Events to log
    LOGGED_EVENTS: [
      'file_access',
      'document_view',
      'security_violation',
      'token_generation',
      'token_expiry',
      'unauthorized_access'
    ],

    // Alert thresholds
    ALERT_THRESHOLDS: {
      FAILED_ACCESS_ATTEMPTS: 5,
      SECURITY_VIOLATIONS_PER_HOUR: 10,
      UNUSUAL_ACCESS_PATTERNS: true
    }
  }
}

// Security utility functions
export const SecurityUtils = {
  // Check if a keyboard event should be blocked
  isBlockedKeyboardEvent: (event: KeyboardEvent): boolean => {
    return SECURITY_CONFIG.DOCUMENT_VIEWER.BLOCKED_SHORTCUTS.some(shortcut => {
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
      const altMatch = shortcut.alt ? event.altKey : !event.altKey
      const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase()

      return ctrlMatch && shiftMatch && altMatch && keyMatch
    })
  },

  // Generate security headers for file serving
  getSecurityHeaders: (isPublic: boolean = true): Record<string, string> => {
    const headers = { ...SECURITY_CONFIG.DOCUMENT_VIEWER.SECURITY_HEADERS }

    if (isPublic) {
      // Less restrictive for file viewing but still secure
      headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'self'; frame-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; media-src 'self' blob:;"
    }

    return headers
  },

  // Validate file type for viewing
  isAllowedFileType: (mimeType: string): boolean => {
    return SECURITY_CONFIG.FILE_ACCESS.ALLOWED_MIME_TYPES.includes(mimeType)
  },

  // Check file size limits
  isFileSizeAllowed: (fileSize: number): boolean => {
    return fileSize <= SECURITY_CONFIG.FILE_ACCESS.MAX_FILE_SIZE
  },

  // Generate watermark positions
  generateWatermarkPositions: (count: number = 20): Array<{ top: string; left: string }> => {
    const positions = []
    const cols = Math.ceil(Math.sqrt(count))
    const rows = Math.ceil(count / cols)

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols

      positions.push({
        top: `${(row / rows) * 100}%`,
        left: `${(col / cols) * 100}%`
      })
    }

    return positions
  },

  // Log security event
  logSecurityEvent: (event: string, details: any = {}) => {
    if (SECURITY_CONFIG.AUDIT.LOGGED_EVENTS.includes(event)) {
      console.log(`[SECURITY] ${event}:`, {
        timestamp: new Date().toISOString(),
        event,
        ...details
      })
    }
  }
}

export default SECURITY_CONFIG

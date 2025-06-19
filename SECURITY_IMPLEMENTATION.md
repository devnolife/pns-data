# Document Security Implementation

This document outlines the comprehensive security measures implemented to ensure that users can only view documents but cannot download them in the public collections system.

## 🔒 Security Features Implemented

### 1. Server-Side File Protection

#### Middleware Protection (`middleware.ts`)
- **Direct File Access Blocking**: All requests to `/uploads/` are intercepted and blocked
- **Rate Limiting**: Prevents abuse with configurable limits per IP
- **Access Logging**: All access attempts are logged with IP, user agent, and timestamp
- **Path Traversal Protection**: Prevents `../` attacks and malicious path manipulation

#### Secure File API (`/api/secure-file`)
- **Token-Based Access**: All file access requires valid, time-limited tokens
- **File Type Validation**: Only approved MIME types can be viewed
- **File Size Limits**: Prevents serving of oversized files
- **Security Headers**: Comprehensive security headers for all responses

### 2. Client-Side Security Measures

#### Enhanced Document Viewer (`SecureDocumentViewer`)
- **Keyboard Shortcut Blocking**: Prevents copy (Ctrl+C), save (Ctrl+S), print (Ctrl+P), etc.
- **Right-Click Disabled**: Context menus are completely disabled
- **Text Selection Disabled**: Content cannot be selected or highlighted
- **Developer Tools Protection**: F12, Ctrl+Shift+I, and other dev tool shortcuts blocked
- **Print Screen Detection**: Attempts to detect and block screenshot functionality

#### Secure File Viewer (`SecureFileViewer`)
- **PDF Viewer Restrictions**: Uses iframe with sandbox attributes and disabled toolbar
- **Image Protection**: Prevents drag, right-click, and selection on images
- **Watermark Overlay**: Visual watermarks indicating view-only access
- **Security Alerts**: Real-time notifications when blocked actions are attempted

### 3. Visual Security Indicators

#### Watermarking System
- **Diagonal Watermarks**: "VIEW ONLY • PUBLIC ACCESS" text across content
- **Corner Badges**: Security status indicators in all corners
- **Transparency Control**: Configurable opacity to balance security and readability
- **Dynamic Positioning**: Watermarks positioned to prevent easy removal

#### Security Warnings
- **Access Restriction Notices**: Clear messaging about view-only limitations
- **Real-time Alerts**: Immediate feedback when security violations are detected
- **Status Indicators**: Visual cues showing current security mode

### 4. Access Control & Authentication

#### Token Management
- **Time-Limited Tokens**: Automatic expiration (2 hours for public, 6 hours for authenticated)
- **Single-Use Validation**: Tokens are validated against specific file paths
- **Secure Generation**: Cryptographically secure token creation with nonces

#### Rate Limiting
- **Per-IP Limits**: 100 requests/hour, 500 requests/day per IP address
- **Automatic Cleanup**: Old rate limit entries are automatically purged
- **Escalating Restrictions**: Repeated violations result in longer blocks

### 5. Audit & Monitoring

#### Security Event Logging
- **Comprehensive Logging**: All file access, security violations, and token operations
- **IP Tracking**: Source IP addresses for all requests
- **User Agent Analysis**: Detection of bots, crawlers, and suspicious clients
- **Access Statistics**: Real-time monitoring of system usage and security events

#### Admin Dashboard Integration
- **Security Statistics API**: `/api/security/stats` for admin monitoring
- **Real-time Alerts**: Configurable thresholds for security violations
- **Access Reports**: Detailed logs of all file access attempts

## 🛡️ Security Configuration

### File Access Restrictions
```typescript
FILE_ACCESS: {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ],
  TOKEN_EXPIRY: {
    PUBLIC: 2 * 60 * 60 * 1000, // 2 hours
    AUTHENTICATED: 6 * 60 * 60 * 1000, // 6 hours
  }
}
```

### Blocked Keyboard Shortcuts
- **Copy/Paste**: Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A
- **Save/Print**: Ctrl+S, Ctrl+P
- **Developer Tools**: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
- **View Source**: Ctrl+U
- **Screenshots**: PrintScreen, Alt+PrintScreen
- **Find/Zoom**: Ctrl+F, Ctrl+Plus, Ctrl+Minus

### Security Headers
```typescript
'Content-Security-Policy': "default-src 'self'; script-src 'none'; object-src 'none';"
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'SAMEORIGIN'
'X-Download-Options': 'noopen'
'Cache-Control': 'no-cache, no-store, must-revalidate'
```

## 🚀 Implementation Details

### File Structure
```
lib/security/
├── config.ts              # Security configuration and utilities
├── file-protection.ts     # Middleware for file protection
components/security/
├── secure-document-viewer.tsx  # Protected document viewer
├── secure-file-viewer.tsx      # Protected file viewer
app/api/
├── secure-file/           # Secure file serving API
├── security/stats/        # Security monitoring API
```

### Usage Example
```typescript
// In your component
import { SecureDocumentViewer } from '@/components/security/secure-document-viewer'

<SecureDocumentViewer
  content={document.content}
  title={document.title}
  isPublicAccess={true}
  showWatermark={true}
  allowCopy={false}
/>
```

## 🔧 Configuration Options

### Environment Variables
```env
# Security settings (optional - defaults provided)
SECURITY_TOKEN_EXPIRY_PUBLIC=7200000    # 2 hours in milliseconds
SECURITY_TOKEN_EXPIRY_AUTH=21600000     # 6 hours in milliseconds
SECURITY_RATE_LIMIT_HOURLY=100          # Requests per hour per IP
SECURITY_RATE_LIMIT_DAILY=500           # Requests per day per IP
```

### Customization
The security system is highly configurable through `lib/security/config.ts`:
- Adjust rate limits and token expiry times
- Modify blocked keyboard shortcuts
- Configure watermark appearance
- Set file size and type restrictions

## ⚠️ Security Considerations

### Limitations
1. **Client-Side Bypass**: Determined users with technical knowledge may bypass some client-side restrictions
2. **Browser Variations**: Some security measures may work differently across browsers
3. **Mobile Devices**: Touch-based interactions may have different security implications

### Best Practices
1. **Regular Updates**: Keep security configurations updated based on new threats
2. **Monitoring**: Regularly review access logs and security statistics
3. **Testing**: Periodically test security measures across different browsers and devices
4. **User Education**: Inform users about the security measures and their purpose

### Additional Recommendations
1. **Server-Side Validation**: Always validate on the server side, never trust client-side only
2. **Regular Audits**: Conduct security audits of the file protection system
3. **Backup Monitoring**: Implement additional monitoring for unusual access patterns
4. **Legal Notices**: Consider adding legal notices about unauthorized access attempts

## 📊 Monitoring & Analytics

### Security Dashboard
Access security statistics through the admin panel:
- Real-time access attempts
- Blocked requests by reason
- Top accessing IP addresses
- Security violation trends

### Log Analysis
Security events are logged with the following information:
- Timestamp and IP address
- User agent and referer
- Requested file path
- Action taken (allowed/blocked)
- Reason for blocking (if applicable)

## 🔄 Maintenance

### Regular Tasks
1. **Log Rotation**: Implement proper log rotation for production environments
2. **Token Cleanup**: Expired tokens are automatically cleaned up
3. **Rate Limit Reset**: Rate limits reset automatically based on time windows
4. **Security Updates**: Regular updates to blocked patterns and security rules

This implementation provides a robust, multi-layered security system that significantly reduces the ability for users to download or copy protected documents while maintaining a good user experience for legitimate viewing purposes.

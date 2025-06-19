import { useState, useEffect } from 'react'
import { validatePublicAccessAction } from '@/lib/actions/guestbook'

interface PublicAccessState {
  hasAccess: boolean
  isLoading: boolean
  error: string | null
  expiresIn: number | null
  sessionToken: string | null
}

export function usePublicAccess() {
  const [state, setState] = useState<PublicAccessState>({
    hasAccess: false,
    isLoading: true,
    error: null,
    expiresIn: null,
    sessionToken: null
  })

  const checkAccess = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Check localStorage first (backward compatibility)
      const hasFilledGuestbook = localStorage.getItem('hasFilledGuestbook')

      // Get session data
      const sessionData = localStorage.getItem('guestbookSession')
      let sessionToken = null

      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData)
          sessionToken = parsed.token

          // Check if session is expired locally first
          if (parsed.expires && Date.now() > parsed.expires) {
            // Session expired locally
            localStorage.removeItem('guestbookSession')
            localStorage.removeItem('hasFilledGuestbook')
            setState(prev => ({
              ...prev,
              hasAccess: false,
              isLoading: false,
              error: 'Session expired. Please fill the guestbook again.',
              sessionToken: null
            }))
            return
          }
        } catch (e) {
          console.error('Error parsing session data:', e)
        }
      }

      // If we have a session token, validate it with the server
      if (sessionToken) {
        const validation = await validatePublicAccessAction(sessionToken)

        setState(prev => ({
          ...prev,
          hasAccess: validation.hasAccess,
          isLoading: false,
          error: validation.hasAccess ? null : validation.reason || 'Access denied',
          expiresIn: validation.expiresIn || null,
          sessionToken: validation.hasAccess ? sessionToken : null
        }))
      } else if (hasFilledGuestbook === 'true') {
        // Backward compatibility - if old localStorage flag exists but no session
        setState(prev => ({
          ...prev,
          hasAccess: true,
          isLoading: false,
          sessionToken: null
        }))
      } else {
        // No access
        setState(prev => ({
          ...prev,
          hasAccess: false,
          isLoading: false,
          error: 'Please fill the guestbook to access public collections',
          sessionToken: null
        }))
      }
    } catch (error) {
      console.error('Error checking public access:', error)
      setState(prev => ({
        ...prev,
        hasAccess: false,
        isLoading: false,
        error: 'Failed to validate access. Please try again.',
        sessionToken: null
      }))
    }
  }

  const grantAccess = (sessionToken: string, userName?: string) => {
    // Set session data
    const sessionData = {
      token: sessionToken,
      timestamp: Date.now(),
      name: userName,
      expires: Date.now() + (3 * 60 * 60 * 1000) // 3 hours
    }

    localStorage.setItem('guestbookSession', JSON.stringify(sessionData))
    localStorage.setItem('hasFilledGuestbook', 'true') // Backward compatibility

    // Set session cookie
    document.cookie = `guest_session=${sessionToken}; path=/; max-age=${3 * 60 * 60}; SameSite=Lax`

    // Update state
    setState(prev => ({
      ...prev,
      hasAccess: true,
      sessionToken,
      error: null,
      expiresIn: 3 // 3 hours
    }))
  }

  const revokeAccess = () => {
    // Clear localStorage
    localStorage.removeItem('guestbookSession')
    localStorage.removeItem('hasFilledGuestbook')

    // Clear cookie
    document.cookie = 'guest_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    // Update state
    setState({
      hasAccess: false,
      isLoading: false,
      error: null,
      expiresIn: null,
      sessionToken: null
    })
  }

  useEffect(() => {
    // Add small delay for better UX
    const timer = setTimeout(checkAccess, 500)
    return () => clearTimeout(timer)
  }, [])

  return {
    ...state,
    checkAccess,
    grantAccess,
    revokeAccess,
    refresh: checkAccess
  }
} 

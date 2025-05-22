"use client"

import { useState, useEffect } from "react"

// Mobile breakpoint in pixels
const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect if the current viewport is mobile-sized
 * @returns boolean indicating if the viewport is mobile-sized
 */
export function useMobile(): boolean {
  // Initialize with undefined to prevent hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Function to check if the screen is mobile-sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on mount
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Return false during SSR, then the actual value once mounted
  return isMobile ?? false
}

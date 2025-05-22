import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string or Date object into a readable format
 * @param date - The date to format (string or Date object)
 * @param options - Intl.DateTimeFormatOptions for customizing the format
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  if (!date) return "N/A"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid date"
    }

    return new Intl.DateTimeFormat("en-US", options).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Error"
  }
}

/**
 * Formats a date as a relative time (e.g., "2 days ago")
 * @param date - The date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date | undefined): string {
  if (!date) return "N/A"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid date"
    }

    const now = new Date()
    const diffInMs = now.getTime() - dateObj.getTime()
    const diffInSecs = Math.floor(diffInMs / 1000)
    const diffInMins = Math.floor(diffInSecs / 60)
    const diffInHours = Math.floor(diffInMins / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInSecs < 60) {
      return "just now"
    } else if (diffInMins < 60) {
      return `${diffInMins} minute${diffInMins > 1 ? "s" : ""} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    } else {
      return formatDate(date)
    }
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return "Error"
  }
}

/**
 * Formats a date for display in a form input (YYYY-MM-DD)
 * @param date - The date to format
 * @returns Date string in YYYY-MM-DD format
 */
export function formatDateForInput(date: string | Date | undefined): string {
  if (!date) return ""

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return ""
    }

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, "0")
    const day = String(dateObj.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  } catch (error) {
    console.error("Error formatting date for input:", error)
    return ""
  }
}

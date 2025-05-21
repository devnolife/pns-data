import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string into a localized date format
 * @param dateString - The date string to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", options).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

/**
 * Formats a number with thousand separators
 * @param num - The number to format
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(
  num: number,
  options: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
  },
): string {
  try {
    return new Intl.NumberFormat("en-US", options).format(num)
  } catch (error) {
    console.error("Error formatting number:", error)
    return num.toString()
  }
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str - The string to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

/**
 * Gets initials from a name (e.g., "John Doe" -> "JD")
 * @param name - The name to get initials from
 * @param maxInitials - Maximum number of initials to return
 * @returns Initials string
 */
export function getInitials(name: string, maxInitials = 2): string {
  if (!name) return ""

  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .filter(Boolean)
    .slice(0, maxInitials)
    .join("")
}

/**
 * Debounces a function call
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

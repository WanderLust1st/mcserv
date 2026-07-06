import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Copy text to clipboard with promise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
      return false
    }
  }
  return false
}

/**
 * Format player count with color
 */
export function formatPlayerCount(count: number, max: number): string {
  const percentage = Math.min((count / max) * 100, 100)

  if (percentage >= 90) {
    return `🔴 ${count}/${max} (${percentage.toFixed(0)}%)`
  } else if (percentage >= 70) {
    return `🟡 ${count}/${max} (${percentage.toFixed(0)}%)`
  } else {
    return `🟢 ${count}/${max} (${percentage.toFixed(0)}%)`
  }
}

/**
 * Generate a random color for gradients
 */
export function getRandomColor(): string {
  const colors = [
    "#a855f7", // neon purple
    "#3b82f6", // neon blue
    "#06b6d4", // neon cyan
    "#ec4899", // neon pink
    "#f97316", // neon orange
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + "..."
}

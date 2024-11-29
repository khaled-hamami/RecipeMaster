import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string.
 *
 * This function merges class names using `twMerge` and `clsx`.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined.
 * @returns {string} The combined class names as a single string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
//
//
//
//
//
//
//
//

/**
 * Converts a Buffer to a Base64 encoded string.
 *
 * @param {Buffer} image - The image data as a Buffer.
 * @returns {string} - The Base64 encoded image string prefixed with 'data:image/png;base64,'.
 */
export const convertImageToBase64 = (image: Buffer): string => {
  return `data:image/png;base64,${image.toString("base64")}`
}
//
//
//
//
//
//
/**
 * Truncates a given text to a specified maximum length and appends ellipsis if necessary.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length of the truncated text.
 * @returns {string} - The truncated text with ellipsis if it exceeds the maximum length.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

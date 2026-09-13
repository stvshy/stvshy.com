import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const preloadedImages = new Map<string, Promise<void>>()

// Kicks off fetch+decode for a full-res image so it's already cached/decoded
// by the time the preview modal opens (called once a section revealing it opens).
export function preloadImage(src: string) {
  if (typeof window === 'undefined') return Promise.resolve()

  const existing = preloadedImages.get(src)
  if (existing) return existing

  const promise = new Promise<void>((resolve) => {
    const img = new window.Image()
    img.decoding = 'async'
    img.fetchPriority = 'high'

    img.onload = () => {
      if (img.decode) {
        img.decode().catch(() => {}).finally(resolve)
      } else {
        resolve()
      }
    }

    img.onerror = () => resolve()
    img.src = src
  })

  preloadedImages.set(src, promise)
  return promise
}

export function isImagePreloaded(src: string) {
  return preloadedImages.has(src)
}

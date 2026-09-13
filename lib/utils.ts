import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const preloadedImageSrcs = new Set<string>()

// Kicks off the fastest possible fetch+decode for a full-res image so it's
// already cached by the time the preview modal opens (called on hover/focus/
// pointerdown, i.e. before the click that actually opens the modal).
export function preloadImage(src: string) {
  if (typeof window === 'undefined' || preloadedImageSrcs.has(src)) return
  preloadedImageSrcs.add(src)

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  link.fetchPriority = 'high'
  document.head.appendChild(link)

  const image = new window.Image()
  image.decoding = 'async'
  image.fetchPriority = 'high'
  image.src = src
  image.decode?.().catch(() => {})
}

export function isImagePreloaded(src: string) {
  return preloadedImageSrcs.has(src)
}

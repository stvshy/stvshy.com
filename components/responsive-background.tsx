"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const MeshGradient = dynamic(
  () => import("@/components/mesh-gradient").then((module) => module.MeshGradient),
  { ssr: false }
)

const DesktopSpaceBackground = dynamic(
  () => import("@/components/desktop-space-background").then((module) => module.DesktopSpaceBackground),
  { ssr: false }
)

export function ResponsiveBackground() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(mediaQuery.matches)
    update()
    mediaQuery.addEventListener("change", update)
    return () => mediaQuery.removeEventListener("change", update)
  }, [])

  if (isDesktop === null) return null
  return isDesktop ? <DesktopSpaceBackground /> : <MeshGradient />
}
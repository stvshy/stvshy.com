"use client"

import { useEffect, useRef } from "react"

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      time += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Cyan blob
      const cx1 = canvas.width * 0.3 + Math.sin(time * 0.7) * canvas.width * 0.15
      const cy1 = canvas.height * 0.4 + Math.cos(time * 0.5) * canvas.height * 0.15
      const gradient1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, canvas.width * 0.4)
      gradient1.addColorStop(0, "rgba(0, 242, 234, 0.08)")
      gradient1.addColorStop(0.5, "rgba(0, 242, 234, 0.03)")
      gradient1.addColorStop(1, "rgba(0, 242, 234, 0)")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Magenta blob
      const cx2 = canvas.width * 0.7 + Math.cos(time * 0.6) * canvas.width * 0.15
      const cy2 = canvas.height * 0.6 + Math.sin(time * 0.8) * canvas.height * 0.1
      const gradient2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, canvas.width * 0.35)
      gradient2.addColorStop(0, "rgba(255, 0, 80, 0.06)")
      gradient2.addColorStop(0.5, "rgba(255, 0, 80, 0.02)")
      gradient2.addColorStop(1, "rgba(255, 0, 80, 0)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Third subtle blob for depth
      const cx3 = canvas.width * 0.5 + Math.sin(time * 0.4) * canvas.width * 0.2
      const cy3 = canvas.height * 0.3 + Math.cos(time * 0.3) * canvas.height * 0.2
      const gradient3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, canvas.width * 0.3)
      gradient3.addColorStop(0, "rgba(0, 242, 234, 0.04)")
      gradient3.addColorStop(1, "rgba(0, 242, 234, 0)")
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}

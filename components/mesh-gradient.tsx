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
    let width = 0
    let height = 0

    const resize = () => {
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight
      width = nextWidth
      height = nextHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(nextWidth * dpr)
      canvas.height = Math.floor(nextHeight * dpr)
      canvas.style.width = `${nextWidth}px`
      canvas.style.height = `${nextHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      time += 0.0025

      ctx.save()
      ctx.clearRect(0, 0, width, height)
      // Subtle base wash so edges/sides never drop to pure black
      ctx.globalCompositeOperation = "source-over"
      ctx.filter = "blur(120px)"
      const wash = ctx.createLinearGradient(0, height * 0.4, width, height * 0.6)
      wash.addColorStop(0, "rgba(211, 60, 225, 0.025)")
      wash.addColorStop(1, "rgba(54, 132, 233, 0.03)")
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, width, height)

      const rightBias = ctx.createRadialGradient(
        width * 0.9,
        height * 0.55,
        0,
        width * 0.9,
        height * 0.55,
        Math.max(width, height) * 0.65
      )
      rightBias.addColorStop(0, "rgba(54, 132, 233, 0.028)")
      rightBias.addColorStop(1, "rgba(54, 132, 233, 0)")
      ctx.fillStyle = rightBias
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = "lighter"
      ctx.filter = "blur(80px)"

      const driftX = Math.sin(time * 0.16) * width * 0.035
      const driftY = Math.cos(time * 0.15) * height * 0.035

      // Pink blob
      const cx1 = width * 0.66 + Math.cos(time * 0.7) * width * 0.18 + driftX * 0.9
      const cy1 = height * 0.62 + Math.sin(time * 0.98) * height * 0.16 + driftY * 0.9
      const gradient1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, width * 0.42)
      gradient1.addColorStop(0, "rgba(211, 60, 225, 0.15)")
      gradient1.addColorStop(0.5, "rgba(211, 60, 225, 0.06)")
      gradient1.addColorStop(1, "rgba(211, 60, 225, 0)")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, width, height)

      // Blue blob (more prominent)
      const cx2 = width * 0.18 + Math.sin(time * 0.85) * width * 0.16 + driftX
      const cy2 = height * 0.32 + Math.cos(time * 0.62) * height * 0.18 + driftY
      const gradient2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, width * 0.48)
      gradient2.addColorStop(0, "rgba(54, 132, 233, 0.14)")
      gradient2.addColorStop(0.5, "rgba(54, 132, 233, 0.055)")
      gradient2.addColorStop(1, "rgba(54, 132, 233, 0)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, width, height)

      // Third subtle blob for depth
      const cx3 = width * 0.48 + Math.sin(time * 0.45) * width * 0.2 + driftX * 0.6
      const cy3 = height * 0.28 + Math.cos(time * 0.33) * height * 0.18 + driftY * 0.6
      const gradient3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, width * 0.32)
      gradient3.addColorStop(0, "rgba(211, 60, 225, 0.06)")
      gradient3.addColorStop(1, "rgba(211, 60, 225, 0)")
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, width, height)

      // Darken overall for a deeper, glassy look
      ctx.filter = "none"
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = "rgba(0, 0, 0, 0.34)"
      ctx.fillRect(0, 0, width, height)

      // Edge vignette (more black at the edges)
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.25,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      )
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)")
      vignette.addColorStop(0.65, "rgba(0, 0, 0, 0.03)")
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.22)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      // Extra darkness at the top-center (without heavy corners)
      const topShadeY = Math.min(height * 0.12, 140)
      const topShadeRadius = Math.min(Math.max(width, height) * 0.28, 320)
      const topShade = ctx.createRadialGradient(
        width * 0.5,
        topShadeY,
        0,
        width * 0.5,
        topShadeY,
        topShadeRadius
      )
      topShade.addColorStop(0, "rgba(0, 0, 0, 0.32)")
      topShade.addColorStop(0.55, "rgba(0, 0, 0, 0.14)")
      topShade.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = topShade
      ctx.fillRect(0, 0, width, height)

      ctx.restore()

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

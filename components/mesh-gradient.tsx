"use client"

import { useEffect, useRef } from "react"

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return

    let animationId = 0
    let time = 0
    let width = 0
    let height = 0
    let isPaused = false

    let lastTime = 0
    const isMobile = window.innerWidth < 768
    const targetFps = isMobile ? 30 : 60
    const fpsInterval = 1000 / targetFps

    let wash: CanvasGradient | null = null
    let rightBias: CanvasGradient | null = null
    let vignette: CanvasGradient | null = null
    let topShade: CanvasGradient | null = null

    const rebuildStaticGradients = () => {
      wash = ctx.createLinearGradient(0, height * 0.4, width, height * 0.6)
      wash.addColorStop(0, "rgba(211, 60, 225, 0.025)")
      wash.addColorStop(1, "rgba(54, 132, 233, 0.03)")

      rightBias = ctx.createRadialGradient(
        width * 0.9,
        height * 0.55,
        0,
        width * 0.9,
        height * 0.55,
        Math.max(width, height) * 0.65
      )
      rightBias.addColorStop(0, "rgba(54, 132, 233, 0.028)")
      rightBias.addColorStop(1, "rgba(54, 132, 233, 0)")

      vignette = ctx.createRadialGradient(
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

      const topShadeY = Math.min(height * 0.14, 160)
      const topShadeRadius = Math.min(Math.max(width, height) * 0.42, 560)
      topShade = ctx.createRadialGradient(width * 0.5, topShadeY, 0, width * 0.5, topShadeY, topShadeRadius)
      topShade.addColorStop(0, "rgba(0, 0, 0, 0.38)")
      topShade.addColorStop(0.55, "rgba(0, 0, 0, 0.17)")
      topShade.addColorStop(1, "rgba(0, 0, 0, 0)")
    }

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

      rebuildStaticGradients()
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })

    const onVisibilityChange = () => {
      isPaused = document.hidden
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate)
      if (isPaused) return

      if (!lastTime) lastTime = currentTime
      const deltaTime = currentTime - lastTime

      if (deltaTime < fpsInterval) return
      lastTime = currentTime - (deltaTime % fpsInterval)

      const timeMultiplier = isMobile ? deltaTime / 16.66 : 1
      time = (time + 0.0025 * timeMultiplier) % 100

      ctx.clearRect(0, 0, width, height)

      ctx.globalCompositeOperation = "source-over"
      ctx.filter = "blur(120px)"
      if (wash) {
        ctx.fillStyle = wash
        ctx.fillRect(0, 0, width, height)
      }

      if (rightBias) {
        ctx.fillStyle = rightBias
        ctx.fillRect(0, 0, width, height)
      }

      ctx.globalCompositeOperation = "lighter"
      ctx.filter = "blur(80px)"

      const driftX = Math.sin(time * 0.16) * width * 0.035
      const driftY = Math.cos(time * 0.15) * height * 0.035

      const cx1 = width * 0.92 + Math.cos(time * 0.7) * width * 0.1 + driftX * 0.65
      const cy1 = height * 0.62 + Math.sin(time * 0.98) * height * 0.16 + driftY * 0.9
      const gradient1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, width * 0.5)
      gradient1.addColorStop(0, "rgba(211, 60, 225, 0.15)")
      gradient1.addColorStop(0.5, "rgba(211, 60, 225, 0.06)")
      gradient1.addColorStop(1, "rgba(211, 60, 225, 0)")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, width, height)

      const cyanOrbitX = Math.sin(time * 0.85) * width * 0.06
      const cyanOrbitY = (Math.cos(time * 0.62) - 1) * height * 0.07 + height * 0.18
      const cyanCounterDrift = Math.sin(time * 0.37) * height * 0.02
      const cx2 = width * 0.2 + cyanOrbitX + driftX * 0.5
      const cy2 = height * 0.32 + cyanOrbitY + driftY + cyanCounterDrift
      const gradient2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, width * 0.6)
      gradient2.addColorStop(0, "rgba(40, 128, 243, 0.43)")
      gradient2.addColorStop(0.5, "rgba(54, 132, 233, 0.055)")
      gradient2.addColorStop(1, "rgba(54, 132, 233, 0)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, width, height)

      const cx3 = width * 0.7 + Math.sin(time * 0.45) * width * 0.12 + driftX * 0.4
      const cy3 = height * 0.28 + Math.cos(time * 0.33) * height * 0.18 + driftY * 0.6
      const gradient3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, width * 0.4)
      gradient3.addColorStop(0, "rgba(218, 32, 235, 0.21)")
      gradient3.addColorStop(1, "rgba(211, 60, 225, 0)")
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, width, height)

      ctx.filter = "none"
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = "rgba(0, 0, 0, 0.34)"
      ctx.fillRect(0, 0, width, height)

      if (vignette) {
        ctx.fillStyle = vignette
        ctx.fillRect(0, 0, width, height)
      }

      if (topShade) {
        ctx.fillStyle = topShade
        ctx.fillRect(0, 0, width, height)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibilityChange)
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
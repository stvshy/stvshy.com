"use client"

import { useEffect, useRef } from "react"

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: false })
    if (!ctx) return

    let animationId: number
    let time = 0
    let width = 0
    let height = 0
    let isVisible = true

    // FPS control
    let lastTime = 0
    const isMobile = window.innerWidth < 768
    const targetFps = isMobile ? 30 : 60
    const fpsInterval = 1000 / targetFps

    // Na mobile renderujemy w niższej rozdzielczości – gradient jest blurowany i tak
    const qualityScale = isMobile ? 0.5 : 1

    // Pre-kalkulowane stałe (unikamy powtarzania obliczeń w każdej klatce)
    const TIME_STEP = 0.0025
    const FRAME_BASE = 16.66

    let resizeScheduled = false

    const resize = () => {
      resizeScheduled = false
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight
      width = nextWidth
      height = nextHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2) * qualityScale
      canvas.width = Math.floor(nextWidth * dpr)
      canvas.height = Math.floor(nextHeight * dpr)
      canvas.style.width = `${nextWidth}px`
      canvas.style.height = `${nextHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const scheduleResize = () => {
      if (!resizeScheduled) {
        resizeScheduled = true
        requestAnimationFrame(resize)
      }
    }

    // Visibility API – pauzuje animację gdy karta jest niewidoczna
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
      if (isVisible) {
        lastTime = 0 // reset aby uniknąć skoku w animacji
        animationId = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(animationId)
      }
    }

    resize()
    window.addEventListener("resize", scheduleResize, { passive: true })
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const animate = (currentTime: number) => {
      if (!isVisible) return
      animationId = requestAnimationFrame(animate)

      if (!lastTime) lastTime = currentTime
      const deltaTime = currentTime - lastTime

      if (deltaTime < fpsInterval) return
      lastTime = currentTime - (deltaTime % fpsInterval)

      const timeMultiplier = isMobile ? deltaTime / FRAME_BASE : 1
      time = (time + TIME_STEP * timeMultiplier) % 100

      // Pre-obliczenia wspólne dla wielu gradientów
      const w = width
      const h = height
      const maxDim = Math.max(w, h)
      const minDim = Math.min(w, h)

      const driftX = Math.sin(time * 0.16) * w * 0.035
      const driftY = Math.cos(time * 0.15) * h * 0.035

      ctx.save()
      ctx.clearRect(0, 0, w, h)

      // ── Warstwa 1: Wash + Right Bias (łączymy w jednym bloku filtra) ──
      ctx.globalCompositeOperation = "source-over"
      ctx.filter = "blur(120px)"

      const wash = ctx.createLinearGradient(0, h * 0.4, w, h * 0.6)
      wash.addColorStop(0, "rgba(211,60,225,0.025)")
      wash.addColorStop(1, "rgba(54,132,233,0.03)")
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, w, h)

      const rbCx = w * 0.9
      const rbCy = h * 0.55
      const rightBias = ctx.createRadialGradient(rbCx, rbCy, 0, rbCx, rbCy, maxDim * 0.65)
      rightBias.addColorStop(0, "rgba(54,132,233,0.028)")
      rightBias.addColorStop(1, "rgba(54,132,233,0)")
      ctx.fillStyle = rightBias
      ctx.fillRect(0, 0, w, h)

      // ── Warstwa 2: Trzy animowane bloby (wspólny filter) ──
      ctx.globalCompositeOperation = "lighter"
      ctx.filter = "blur(80px)"

      // Blob 1 – magenta (prawy dolny)
      const cx1 = w * 0.92 + Math.cos(time * 0.7) * w * 0.1 + driftX * 0.65
      const cy1 = h * 0.62 + Math.sin(time * 0.98) * h * 0.16 + driftY * 0.9
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w * 0.5)
      g1.addColorStop(0, "rgba(211,60,225,0.15)")
      g1.addColorStop(0.5, "rgba(211,60,225,0.06)")
      g1.addColorStop(1, "rgba(211,60,225,0)")
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      // Blob 2 – niebieski (lewy)
      const cyanOrbitX = Math.sin(time * 0.85) * w * 0.06
      const cyanOrbitY = (Math.cos(time * 0.62) - 1) * h * 0.07 + h * 0.18
      const cyanCounterDrift = Math.sin(time * 0.37) * h * 0.02
      const cx2 = w * 0.2 + cyanOrbitX + driftX * 0.5
      const cy2 = h * 0.32 + cyanOrbitY + driftY + cyanCounterDrift
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w * 0.6)
      g2.addColorStop(0, "rgba(40,128,243,0.43)")
      g2.addColorStop(0.5, "rgba(54,132,233,0.055)")
      g2.addColorStop(1, "rgba(54,132,233,0)")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // Blob 3 – magenta (górny prawy)
      const cx3 = w * 0.7 + Math.sin(time * 0.45) * w * 0.12 + driftX * 0.4
      const cy3 = h * 0.28 + Math.cos(time * 0.33) * h * 0.18 + driftY * 0.6
      const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, w * 0.4)
      g3.addColorStop(0, "rgba(218,32,235,0.21)")
      g3.addColorStop(1, "rgba(211,60,225,0)")
      ctx.fillStyle = g3
      ctx.fillRect(0, 0, w, h)

      // ── Warstwa 3: Overlays (bez filtra – oszczędzamy GPU) ──
      ctx.filter = "none"
      ctx.globalCompositeOperation = "source-over"

      // Ciemny overlay
      ctx.fillStyle = "rgba(0,0,0,0.34)"
      ctx.fillRect(0, 0, w, h)

      // Vignette
      const halfW = w * 0.5
      const halfH = h * 0.5
      const vignette = ctx.createRadialGradient(
        halfW, halfH, minDim * 0.25,
        halfW, halfH, maxDim * 0.75
      )
      vignette.addColorStop(0, "rgba(0,0,0,0)")
      vignette.addColorStop(0.65, "rgba(0,0,0,0.03)")
      vignette.addColorStop(1, "rgba(0,0,0,0.22)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)

      // Top shade
      const topShadeY = Math.min(h * 0.14, 160)
      const topShadeRadius = Math.min(maxDim * 0.42, 560)
      const topShade = ctx.createRadialGradient(halfW, topShadeY, 0, halfW, topShadeY, topShadeRadius)
      topShade.addColorStop(0, "rgba(0,0,0,0.38)")
      topShade.addColorStop(0.55, "rgba(0,0,0,0.17)")
      topShade.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = topShade
      ctx.fillRect(0, 0, w, h)

      ctx.restore()
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", scheduleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: "strict" }}
      aria-hidden="true"
    />
  )
}
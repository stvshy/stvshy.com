"use client"

import { useEffect, useState } from "react"

type Star = {
  left: string
  top: string
  size: number
  opacity: number
  delay: number
}

const starsFar: Star[] = [
  { left: "6%", top: "14%", size: 1, opacity: 0.35, delay: -7 },
  { left: "14%", top: "72%", size: 1, opacity: 0.28, delay: -19 },
  { left: "23%", top: "28%", size: 1, opacity: 0.32, delay: -12 },
  { left: "31%", top: "12%", size: 1, opacity: 0.25, delay: -25 },
  { left: "39%", top: "81%", size: 1, opacity: 0.30, delay: -5 },
  { left: "49%", top: "20%", size: 1, opacity: 0.35, delay: -17 },
  { left: "57%", top: "68%", size: 1, opacity: 0.28, delay: -31 },
  { left: "66%", top: "17%", size: 1, opacity: 0.32, delay: -9 },
  { left: "74%", top: "77%", size: 1, opacity: 0.25, delay: -22 },
  { left: "83%", top: "31%", size: 1, opacity: 0.30, delay: -14 },
  { left: "91%", top: "63%", size: 1, opacity: 0.35, delay: -28 },
  { left: "97%", top: "16%", size: 1, opacity: 0.25, delay: -3 },
]

const starsMid: Star[] = [
  { left: "10%", top: "42%", size: 1.5, opacity: 0.50, delay: -11 },
  { left: "19%", top: "87%", size: 1.5, opacity: 0.38, delay: -24 },
  { left: "35%", top: "46%", size: 1.5, opacity: 0.45, delay: -6 },
  { left: "46%", top: "61%", size: 1.5, opacity: 0.40, delay: -18 },
  { left: "62%", top: "36%", size: 1.5, opacity: 0.48, delay: -29 },
  { left: "79%", top: "54%", size: 1.5, opacity: 0.42, delay: -15 },
  { left: "88%", top: "87%", size: 1.5, opacity: 0.48, delay: -8 },
]

function StarLayer({
  stars,
  duration,
  className = "",
}: {
  stars: Star[]
  duration: number
  className?: string
}) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white animate-star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${duration + (index % 5) * 4}s`,
            animationDelay: `${star.delay}s`,
            ["--x" as string]: `${((index % 3) - 1) * 1}px`,
            ["--y" as string]: `${((index % 4) - 2) * 1}px`,
          }}
        />
      ))}
    </div>
  )
}

export function DesktopSpaceBackground() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    const update = () => {
      setEnabled(mediaQuery.matches)
    }

    update()

    mediaQuery.addEventListener("change", update)

    return () => {
      mediaQuery.removeEventListener("change", update)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static high-quality background */}
      <picture>
        <source
          srcSet="/images/space-bg.avif"
          type="image/avif"
        />

        <source
          srcSet="/images/space-bg.webp"
          type="image/webp"
        />

        <img
          src="/images/space-bg.webp"
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            select-none
          "
          draggable={false}
        />
      </picture>

      {/* Very subtle darkening layer for UI readability */}
      <div
        className="
          absolute
          inset-0
          bg-[#050711]/25
        "
      />

      {/* Far stars */}
      <StarLayer
        stars={starsFar}
        duration={90}
        className="animate-star-drift-slow"
      />

      {/* Mid stars */}
      <StarLayer
        stars={starsMid}
        duration={55}
        className="animate-star-drift"
      />
    </div>
  )
}
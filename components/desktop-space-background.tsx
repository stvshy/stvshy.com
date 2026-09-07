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
  { left: "8%", top: "24%", size: 2, opacity: 0.85, delay: -2 },
  { left: "26%", top: "58%", size: 2, opacity: 0.75, delay: -5 },
  { left: "72%", top: "23%", size: 2, opacity: 0.80, delay: -3 },
  { left: "85%", top: "39%", size: 2, opacity: 0.90, delay: -6 },
  { left: "94%", top: "74%", size: 2, opacity: 0.75, delay: -1 },
  { left: "4%", top: "51%", size: 2, opacity: 0.95, delay: -4 },
  { left: "16%", top: "18%", size: 2.5, opacity: 0.90, delay: -9 },
  { left: "22%", top: "76%", size: 2, opacity: 0.85, delay: -7 },
  { left: "78%", top: "68%", size: 2, opacity: 0.90, delay: -2 },
  { left: "90%", top: "12%", size: 2.5, opacity: 0.95, delay: -5 },
  { left: "97%", top: "46%", size: 2, opacity: 0.85, delay: -8 },
]

function StarLayer({ stars }: { stars: Star[] }) {
  return (
    <div
      className="absolute inset-0"
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
            ["--star-opacity" as string]: star.opacity,
            animationDuration: `${3.2 + (index % 7) * 0.65}s`,
            animationDelay: `${star.delay}s`,
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

      <div
        className="space-readability-shade absolute inset-y-0 left-1/2 w-full max-w-[1100px] -translate-x-1/2"
      />

      {/* Far stars */}
      <StarLayer stars={starsFar} />

      {/* Mid stars */}
      <StarLayer stars={starsMid} />
      <div className="absolute inset-0">
        <span className="space-meteor space-meteor-first" />
        <span className="space-meteor space-meteor-second" />
      </div>
      <div className="space-center-shade absolute inset-y-0 left-1/2 w-full max-w-[1100px] -translate-x-1/2" />
    </div>
  )
}
"use client"

import Image from "next/image"
import mobileBackground from "@/public/images/background-mobile.webp"

export function MobileSpaceBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src={mobileBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center select-none opacity-40"
        draggable={false}
      />
    </div>
  )
}

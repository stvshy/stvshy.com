"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

type ImagePreviewProps = {
  image: { src: string; alt: string }
  dialogLabel: string
  closeLabel: string
  onClose: () => void
}

export default function ImagePreview({ image, dialogLabel, closeLabel, onClose }: ImagePreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const isTripifyMap = image.src.includes("tripify-map")

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 md:bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose()
        if (event.key === "Tab") {
          event.preventDefault()
          closeRef.current?.focus()
        }
      }}
      style={{ touchAction: "none" }}
    >
      <TransformWrapper
        minScale={1}
        maxScale={5}
        centerOnInit
        centerZoomedOut
        limitToBounds
        disablePadding
        wheel={{ disabled: true }}
        pinch={{ step: 0.6 }}
        panning={{ disabled: !isZoomed, excluded: ["preview-close-btn"] }}
        doubleClick={{ mode: "reset", animationTime: 260, animationType: "easeOut" }}
        onTransformed={(_, state) => setIsZoomed(state.scale > 1.01)}
      >
        <TransformComponent
          wrapperClass="!w-[100vw] !h-[100dvh]"
          contentClass="!w-full !h-full !flex !items-center !justify-center"
          wrapperStyle={{ touchAction: "none" }}
          contentStyle={{ touchAction: "none" }}
        >
          <div className="relative inline-flex items-start justify-start" onClick={(event) => event.stopPropagation()}>
            <img
              src={image.src}
              alt={image.alt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className={`w-auto max-w-[95vw] rounded-xl object-contain ${
                isTripifyMap ? "max-h-[90dvh] md:max-h-[96dvh]" : "max-h-[90dvh]"
              }`}
              style={{ touchAction: "none" }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="preview-close-btn absolute right-4 top-4 z-10 inline-flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition-colors hover:bg-background"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
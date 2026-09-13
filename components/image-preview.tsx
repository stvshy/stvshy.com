"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { BsChevronExpand } from "react-icons/bs"
import { TransformComponent, TransformWrapper, type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch"

type ImagePreviewProps = {
  image: { src: string; alt: string }
  dialogLabel: string
  closeLabel: string
  resetZoomLabel: string
  onClose: () => void
}

const PRESS_RESET_MS = 260

export default function ImagePreview({ image, dialogLabel, closeLabel, resetZoomLabel, onClose }: ImagePreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [pressedControl, setPressedControl] = useState<"close" | "reset" | null>(null)
  const [isImageReady, setIsImageReady] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null)
  const pressTimeoutRef = useRef<number | null>(null)
  const isTripifyMap = image.src.includes("tripify-map3")
  const isDiploma = image.src.includes("dyplom")

  const triggerPress = (control: "close" | "reset") => {
    setPressedControl(control)
    if (pressTimeoutRef.current !== null) window.clearTimeout(pressTimeoutRef.current)
    pressTimeoutRef.current = window.setTimeout(() => {
      setPressedControl(null)
      pressTimeoutRef.current = null
    }, PRESS_RESET_MS)
  }

  const handleResetZoom = (event: React.MouseEvent) => {
    event.stopPropagation()
    transformRef.current?.resetTransform(280, "easeOut")
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
      if (pressTimeoutRef.current !== null) window.clearTimeout(pressTimeoutRef.current)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 md:bg-black/70"
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
        ref={transformRef}
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
              onLoad={() => setIsImageReady(true)}
              className={`w-auto max-w-[calc(100vw-2rem)] rounded-xl object-contain transition-opacity duration-150 ${
                isImageReady ? "opacity-100" : "opacity-0"
              } ${
                isDiploma
                  ? "max-h-[94dvh] md:max-h-[96dvh]"
                  : isTripifyMap
                    ? "max-h-[90dvh] md:max-h-[96dvh]"
                    : "max-h-[90dvh]"
              }`}
              style={{ touchAction: "none" }}
            />
            <button
              ref={closeRef}
              type="button"
              onTouchStart={() => triggerPress("close")}
              onClick={onClose}
              aria-label={closeLabel}
              className={`preview-close-btn absolute right-2 top-2 z-10 inline-flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition-all duration-150 hover:bg-background hover:scale-95 active:scale-90 ${
                isZoomed ? "max-md:hidden" : ""
              } ${pressedControl === "close" ? "scale-90 border-[var(--dev-accent,#8b60e8)]/60 bg-background" : ""}`}
            >
              <X className={`size-4 transition-transform duration-150 ${pressedControl === "close" ? "scale-90" : ""}`} />
            </button>
          </div>
        </TransformComponent>
      </TransformWrapper>
      {isZoomed && (
        <div
          className="fixed bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 md:hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onTouchStart={() => triggerPress("reset")}
            onClick={handleResetZoom}
            aria-label={resetZoomLabel}
            className={`preview-close-btn inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-lg transition-all duration-150 hover:bg-background active:scale-90 ${
              pressedControl === "reset" ? "scale-90 border-[var(--dev-accent,#8b60e8)]/60 bg-background" : ""
            }`}
          >
            <BsChevronExpand className={`size-5 rotate-45 transition-transform duration-150 ${pressedControl === "reset" ? "scale-90" : ""}`} />
          </button>
          <button
            type="button"
            onTouchStart={() => triggerPress("close")}
            onClick={(event) => {
              event.stopPropagation()
              onClose()
            }}
            aria-label={closeLabel}
            className={`preview-close-btn inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-lg transition-all duration-150 hover:bg-background active:scale-90 ${
              pressedControl === "close" ? "scale-90 border-[var(--dev-accent,#8b60e8)]/60 bg-background" : ""
            }`}
          >
            <X className={`size-5 transition-transform duration-150 ${pressedControl === "close" ? "scale-90" : ""}`} />
          </button>
        </div>
      )}
    </div>
  )
}
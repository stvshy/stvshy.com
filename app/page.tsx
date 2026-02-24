"use client"

import { useEffect, useState } from "react"
import { Mail, X } from "lucide-react"
import { BsInstagram } from "react-icons/bs"
import { MeshGradient } from "@/components/mesh-gradient"
import { ProfileHeader } from "@/components/profile-header"
import { TabMusic } from "@/components/tab-music"
import { TabDev } from "@/components/tab-dev"
import { TabAbout } from "@/components/tab-about"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [activeTab, setActiveTab] = useState("about")
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)
  const isTripifyMapPreview = previewImage?.src.includes("tripify-map")

  useEffect(() => {
    if (!previewImage) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [previewImage])

  const contactHoverClassName =
    activeTab === "dev"
      ? "hover:border-[var(--dev-accent)]/45 hover:bg-[var(--dev-accent)]/10 hover:text-[var(--dev-accent)] hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
      : activeTab === "music"
        ? "hover:border-[#b817e4]/45 hover:bg-[#b817e4]/10 hover:text-[#b817e4] hover:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
        : "hover:border-foreground/30 hover:bg-foreground/10 hover:text-foreground hover:shadow-[0_0_20px_rgba(240,240,240,0.08)]"

  const instagramHoverClassName =
    activeTab === "dev"
      ? "hover:border-[var(--dev-accent)]/55 hover:text-[var(--dev-accent)] hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
      : activeTab === "music"
        ? "hover:border-[#b817e4]/55 hover:text-[#b817e4] hover:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
        : "hover:border-foreground/45 hover:text-foreground hover:shadow-[0_0_20px_rgba(240,240,240,0.08)]"

  return (
    <main className="relative flex min-h-svh flex-col items-center bg-background">
      <MeshGradient />

      <div className="page-scale-desktop relative z-10 flex w-full max-w-md flex-col gap-8 px-5 py-12 pb-8">
        <ProfileHeader />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full -mt-[10px]">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-xl border border-border">
            <TabsTrigger
              value="dev"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-neon-magenta/10 data-[state=active]:text-neon-magenta data-[state=active]:shadow-none data-[state=inactive]:hover:bg-background/10 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-muted-foreground/70"
            >
              <img
                src="/images/dev-icon3-4.png"
                alt="Dev icon"
                className="mr-1.5 size-4"
              />
              Dev
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-background/10 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-muted-foreground/70"
            >
              <img
                src="/images/about-icon5.png"
                alt="About icon"
                className="mr-1.5 size-4"
              />
              About
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-[#b817e4]/10 data-[state=active]:text-[#b817e4] data-[state=active]:shadow-none data-[state=inactive]:hover:bg-background/10 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-muted-foreground/70"
            >
              <img
                src="/images/music-icon2.png"
                alt="Music note"
                className="mr-1.5 size-4"
              />
              Music
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dev" className="mt-1">
            <TabDev
              onOpenImagePreview={(imageSrc, imageAlt) =>
                setPreviewImage({ src: imageSrc, alt: imageAlt })
              }
            />
          </TabsContent>
          <TabsContent value="about" className="mt-1">
            <TabAbout
              onOpenImagePreview={(imageSrc, imageAlt) =>
                setPreviewImage({ src: imageSrc, alt: imageAlt })
              }
            />
          </TabsContent>
          <TabsContent value="music" className="mt-1">
            <TabMusic />
          </TabsContent>
        </Tabs>

        {/* Contact Button */}
        <Button
          asChild
          className={`w-full rounded-xl border border-border bg-card text-sm text-foreground backdrop-blur-xl transition-all duration-300 ${contactHoverClassName}`}
          size="lg"
        >
          <a href="mailto:matisp637@gmail.com">
            <Mail className="size-4" />
            Contact Me
          </a>
        </Button>

        {activeTab === "about" && (
          <div className="-mt-4.5">
            <Button
              asChild
              size="lg"
              className={`w-full rounded-xl border border-foreground/12 bg-transparent text-sm text-foreground shadow-none transition-all duration-300 hover:bg-transparent ${instagramHoverClassName}`}
            >
              <a
                href="https://instagram.com/stvshy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram profile"
              >
                <BsInstagram className="size-4" />
                Instagram
              </a>
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center -mt-1 -mb-1">
          <p className="text-[11px] text-muted-foreground/50">
            {"© 2026 stvshy. All rights reserved."}
          </p>
        </footer>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 md:bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setPreviewImage(null)}
          style={{ touchAction: "pinch-zoom" }}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            style={{ touchAction: "pinch-zoom" }}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              aria-label="Close image preview"
              className="absolute right-2 top-2 z-10 inline-flex size-8 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition-colors hover:bg-background"
            >
              <X className="size-4" />
            </button>

            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className={`w-auto max-w-[95vw] rounded-xl object-contain ${
                isTripifyMapPreview
                  ? "max-h-[90vh] md:max-h-[96vh]"
                  : "max-h-[90vh]"
              }`}
              style={{ touchAction: "pinch-zoom" }}
            />
          </div>
        </div>
      )}
    </main>
  )
}

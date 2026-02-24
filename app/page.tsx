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

type Language = "en" | "pl"

const pageText = {
  en: {
    tabs: {
      dev: "Dev",
      about: "About",
      music: "Music",
    },
    contact: "Contact Me",
    instagram: "Instagram",
    instagramAria: "Open Instagram profile",
    footer: "© 2026 stvshy. All rights reserved.",
    previewDialogLabel: "Image preview",
    previewCloseLabel: "Close image preview",
    switchLanguageLabel: "Switch language to Polish",
  },
  pl: {
    tabs: {
      dev: "Dev",
      about: "O mnie",
      music: "Muzyka",
    },
    contact: "Skontaktuj się",
    instagram: "Instagram",
    instagramAria: "Otwórz profil na Instagramie",
    footer: "© 2026 stvshy. Wszelkie prawa zastrzeżone.",
    previewDialogLabel: "Podgląd obrazu",
    previewCloseLabel: "Zamknij podgląd obrazu",
    switchLanguageLabel: "Przełącz język na angielski",
  },
} as const

export default function Page() {
  const [activeTab, setActiveTab] = useState("about")
  const [language, setLanguage] = useState<Language>("en")
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)
  const isTripifyMapPreview = previewImage?.src.includes("tripify-map")
  const text = pageText[language]
  const nextLanguage: Language = language === "en" ? "pl" : "en"

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

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("language")
    if (storedLanguage === "en" || storedLanguage === "pl") {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem("language", language)
  }, [language])

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
        <ProfileHeader language={language} />

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
              {text.tabs.dev}
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
              {text.tabs.about}
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
              {text.tabs.music}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dev" className="mt-1">
            <TabDev
              language={language}
              onOpenImagePreview={(imageSrc, imageAlt) =>
                setPreviewImage({ src: imageSrc, alt: imageAlt })
              }
            />
          </TabsContent>
          <TabsContent value="about" className="mt-1">
            <TabAbout
              language={language}
              onOpenImagePreview={(imageSrc, imageAlt) =>
                setPreviewImage({ src: imageSrc, alt: imageAlt })
              }
            />
          </TabsContent>
          <TabsContent value="music" className="mt-1">
            <TabMusic language={language} />
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
            {text.contact}
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
                aria-label={text.instagramAria}
              >
                <BsInstagram className="size-4" />
                {text.instagram}
              </a>
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center -mt-1 -mb-1">
          <p className="text-[11px] text-muted-foreground/50">
            {text.footer}
          </p>
        </footer>

        <div className="-mt-3 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setLanguage(nextLanguage)}
            aria-label={text.switchLanguageLabel}
            className="inline-flex size-8 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-card/90 text-sm shadow-[0_0_14px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-foreground/35"
          >
            <span aria-hidden="true" className="leading-none">
              {language === "en" ? "🇵🇱" : "🇬🇧"}
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setLanguage(nextLanguage)}
        aria-label={text.switchLanguageLabel}
        className="fixed bottom-6 right-6 z-40 hidden size-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-card/90 text-xl shadow-[0_0_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-foreground/35 hover:shadow-[0_0_24px_rgba(240,240,240,0.1)] md:inline-flex"
      >
        <span aria-hidden="true" className="leading-none">
          {language === "en" ? "🇵🇱" : "🇬🇧"}
        </span>
      </button>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 md:bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={text.previewDialogLabel}
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
              aria-label={text.previewCloseLabel}
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

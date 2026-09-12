"use client"

import { useEffect, useRef, useState } from "react"
import { Mail } from "lucide-react"
import { BsInstagram } from "react-icons/bs"
import { ProfileHeader } from "@/components/profile-header"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ResponsiveBackground } from "@/components/responsive-background"
import { TabMusic } from "@/components/tab-music"
import { TabDev } from "@/components/tab-dev"
import { TabAbout } from "@/components/tab-about"
import dynamic from "next/dynamic"

const ImagePreview = dynamic(() => import("@/components/image-preview"), {
  ssr: false,
})

type Language = "en" | "pl"

interface ClientPageProps {
  initialSection?: string
  initialLang: Language
  compactDevMode?: boolean
}
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

export default function ClientPage({ initialSection, initialLang, compactDevMode = false }: ClientPageProps) {
  const [activeTab, setActiveTab] = useState(initialSection || (compactDevMode ? "dev" : "about"))
  const [language, setLanguage] = useState<Language>(initialLang)
  const [isProfessionalMode] = useState(!!initialSection)
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)
  const [isLangPressed, setIsLangPressed] = useState(false)
  const langPressTimeoutRef = useRef<number | null>(null)
  const text = pageText[language]

  const triggerLangPress = () => {
    setIsLangPressed(true)
    if (langPressTimeoutRef.current !== null) {
      window.clearTimeout(langPressTimeoutRef.current)
    }
    langPressTimeoutRef.current = window.setTimeout(() => {
      setIsLangPressed(false)
      langPressTimeoutRef.current = null
    }, 200)
  }
  const nextLanguage: Language = language === "en" ? "pl" : "en"
const updateUrl = (tab: string, lang: string) => {
    const tabPart = tab === "about" ? "" : `/${tab}` 
    const langPart = lang === "pl" ? "/pl" : ""     // "en" jest domyślny, więc go nie pokazujemy
    const newPath = `${tabPart}${langPart}` || "/"
    window.history.replaceState(null, "", newPath)
  }

  const handleTabChange = (value: string) => {
  if (compactDevMode && value === "music") return
  setActiveTab(value)
  updateUrl(value, language)
}
  const handleLanguageChange = () => {
    const newLang = nextLanguage
    setLanguage(newLang)
    updateUrl(activeTab, newLang)
    
  }
  // Ta funkcja zdejmuje focus z opóźnieniem, żeby "przebić" systemowe kliknięcie
  const handleTouchUnfocus = (e: React.TouchEvent<HTMLElement>) => {
    const target = e.currentTarget
    setTimeout(() => {
      target.blur()
    }, 100)
  }
  useEffect(() => {
    return () => {
      if (langPressTimeoutRef.current !== null) window.clearTimeout(langPressTimeoutRef.current)
    }
  }, [])



  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem("language", language)
  }, [language])

  const contactHoverClassName =
    compactDevMode && activeTab === "about"
      ? "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[#b817e4]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#b817e4]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#b817e4] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(184,23,228,0.18)] active:border-[#b817e4]/45 active:bg-[#b817e4]/10 active:text-[#b817e4] active:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
    : activeTab === "dev"
      ? "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--dev-accent)]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--dev-accent)]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[var(--dev-accent)] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:border-[var(--dev-accent)]/45 active:bg-[var(--dev-accent)]/10 active:text-[var(--dev-accent)] active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
      : activeTab === "music"
        ? "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[#b817e4]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#b817e4]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#b817e4] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(184,23,228,0.18)] active:border-[#b817e4]/45 active:bg-[#b817e4]/10 active:text-[#b817e4] active:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
        : "[@media(hover:hover)_and_(pointer:fine)]:hover:border-foreground/30 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-foreground/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(240,240,240,0.08)] active:border-foreground/30 active:bg-foreground/10 active:text-foreground active:shadow-[0_0_20px_rgba(240,240,240,0.08)]"

  const instagramHoverClassName =
    activeTab === "dev"
      ? "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--dev-accent)]/55 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[var(--dev-accent)] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:border-[var(--dev-accent)]/55 active:text-[var(--dev-accent)] active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
      : activeTab === "music"
        ? "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[#b817e4]/55 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#b817e4] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(184,23,228,0.18)] active:border-[#b817e4]/55 active:text-[#b817e4] active:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
        : "[@media(hover:hover)_and_(pointer:fine)]:hover:border-foreground/45 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(240,240,240,0.08)] active:border-foreground/45 active:text-foreground active:shadow-[0_0_20px_rgba(240,240,240,0.08)]"

  const mobileLangButtonClassName = `inline-flex size-5 items-center justify-center overflow-hidden rounded-full bg-card/90 text-sm shadow-[0_0_14px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:brightness-110 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_16px_4px_rgba(255,255,255,0.28)] active:brightness-110 active:shadow-[0_0_16px_4px_rgba(255,255,255,0.28)] ${isLangPressed ? "!brightness-110 !shadow-[0_0_16px_4px_rgba(255,255,255,0.28)]" : ""}`

  const desktopLangButtonClassName = `fixed bottom-6 right-6 z-40 hidden size-7 items-center justify-center overflow-hidden rounded-full bg-card/90 text-xl shadow-[0_0_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:brightness-110 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_12px_3px_rgba(255,255,255,0.22)] active:brightness-110 active:shadow-[0_0_12px_3px_rgba(255,255,255,0.22)] md:inline-flex ${isLangPressed ? "!brightness-110 !shadow-[0_0_12px_3px_rgba(255,255,255,0.22)]" : ""}`

  return (
    <main className="relative flex min-h-svh flex-col items-center bg-background">
  <ResponsiveBackground />

  <div className="page-scale-desktop relative z-10 flex w-full max-w-md flex-col gap-8 px-5 py-12 pb-8">
        <ProfileHeader language={language} />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full -mt-[10px]">
          <TabsList className={`grid w-full bg-muted/50 backdrop-blur-xl border border-border ${compactDevMode ? "grid-cols-2" : "grid-cols-3"}`}>
            <TabsTrigger
              value="dev"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-neon-magenta/10 data-[state=active]:text-neon-magenta data-[state=active]:shadow-none [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:bg-background/10 [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:border-border [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:text-muted-foreground/70 data-[state=inactive]:active:bg-background/10 data-[state=inactive]:active:border-border data-[state=inactive]:active:text-muted-foreground/70"
            >
              <Image
                src="/images/dev-icon3-4.png"
                alt="Dev icon"
                width={16}
                height={16}
                className="mr-1 size-4"
              />
              {compactDevMode
                ? language === "pl"
                  ? "Programowanie"
                  : "Development"
                : text.tabs.dev}
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:bg-background/10 [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:border-border [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:text-muted-foreground/70 data-[state=inactive]:active:bg-background/10 data-[state=inactive]:active:border-border data-[state=inactive]:active:text-muted-foreground/70"
            >
              {compactDevMode ? (
                <span
                  aria-hidden="true"
                  className="mr-1 inline-block size-4 bg-gradient-to-r from-[#8b60e8] to-[#b817e4]"
                  style={{
                    maskImage: "url('/images/about-icon5.png')",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskImage: "url('/images/about-icon5.png')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                  }}
                />
              ) : (
                <Image
                  src="/images/about-icon5.png"
                  alt="About icon"
                  width={16}
                  height={16}
                  className="mr-1 size-4"
                />
              )}
              {compactDevMode
                ? language === "pl"
                  ? "Zainteresowania"
                  : "Beyond Code"
                : text.tabs.about}
            </TabsTrigger>
            {!compactDevMode && <TabsTrigger
              value="music"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-[#b817e4]/10 data-[state=active]:text-[#b817e4] data-[state=active]:shadow-none [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:bg-background/10 [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:border-border [@media(hover:hover)_and_(pointer:fine)]:data-[state=inactive]:hover:text-muted-foreground/70 data-[state=inactive]:active:bg-background/10 data-[state=inactive]:active:border-border data-[state=inactive]:active:text-muted-foreground/70"
            >
              <Image
                src="/images/music-icon2.png"
                alt="Music note"
                width={16}
                height={16}
                className="mr-1 size-4"
              />
              {text.tabs.music}
            </TabsTrigger>}
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
              includeMusic={compactDevMode}
            />
          </TabsContent>
          {!compactDevMode && <TabsContent value="music" className="mt-1">
            <TabMusic language={language} />
          </TabsContent>}
        </Tabs>

        {/* Contact Button */}
        <Button
          asChild
          onClick={(e) => e.currentTarget.blur()}
          className={`w-full rounded-xl border border-border bg-card text-sm text-foreground backdrop-blur-xl transition-all duration-300 ${contactHoverClassName}`}
          size="lg"
        >
          <a
            href="mailto:matisp637@gmail.com"
            style={{ fontFamily: 'Montserrat, MontserratCustom, var(--font-sans), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
          >
            <Mail className="size-[16.5px]" />
            {text.contact}
          </a>
        </Button>

        {activeTab === "about" && !isProfessionalMode && (
          <div className="-mt-4.5">
            <Button
              asChild
              size="lg"
              onClick={(e) => e.currentTarget.blur()}
              className={`w-full rounded-xl border border-foreground/12 bg-transparent text-sm text-foreground shadow-none transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-transparent active:bg-transparent ${instagramHoverClassName}`}
            >
              <a
                href="https://instagram.com/stvshy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text.instagramAria}
                style={{ fontFamily: 'Montserrat, MontserratCustom, var(--font-sans), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
              >
                <BsInstagram className="size-3.7" />
                {text.instagram}
              </a>
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center -mt-1 -mb-1">
            <p
            className="text-[11.3px] text-muted-foreground/50 tracking-tight"
            style={{ fontFamily: 'Montserrat, MontserratCustom, var(--font-sans), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
            >
            {text.footer}
            </p>
        </footer>

        <div className="-mt-3 flex justify-center md:hidden">
          <button
            type="button"
            onTouchStart={triggerLangPress}
            onClick={(e) => {
                handleLanguageChange();
                e.currentTarget.blur();
            }}
            aria-label={text.switchLanguageLabel}
            className={mobileLangButtonClassName}
          >
            <Image
              src={language === "en" ? "/images/polish1.png" : "/images/english2.png"}
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              className="w-full h-full object-cover brightness-[0.87] transition-all duration-300"
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onTouchStart={triggerLangPress}
        onClick={handleLanguageChange}
        onTouchEnd={handleTouchUnfocus}
        aria-label={text.switchLanguageLabel}
        className={desktopLangButtonClassName}
      >
        <Image
          src={language === "en" ? "/images/polish1.png" : "/images/english2.png"}
          alt=""
          aria-hidden="true"
          width={32}
          height={32  }
          className="w-full h-full object-cover brightness-[0.85] transition-all duration-300"
        />
      </button>

      {previewImage && (
        <ImagePreview
          key={previewImage.src}
          image={previewImage}
          dialogLabel={text.previewDialogLabel}
          closeLabel={text.previewCloseLabel}
          onClose={() => setPreviewImage(null)}
        />
      )}
      
      {/* Ukryte linki dla robotów SEO (niewidoczne dla użytkowników) */}
      <nav className="sr-only" aria-label="SEO Navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/pl">Home (PL)</a></li>
          <li><a href="/dev">Dev</a></li>
          <li><a href="/dev/pl">Dev (PL)</a></li>
          <li><a href="/music">Music</a></li>
          <li><a href="/music/pl">Music (PL)</a></li>
        </ul>
      </nav>
      
    </main>
  )
}
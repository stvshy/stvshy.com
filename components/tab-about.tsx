"use client"

import { useMemo, useState } from "react"
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"
import { ChevronRight } from "lucide-react"
import { hyphenateSync as hyphenateEn } from "hyphen/en"
import { hyphenateSync as hyphenatePl } from "hyphen/pl"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type TabAboutProps = {
  language: "en" | "pl"
  onOpenImagePreview: (imageSrc: string, imageAlt: string) => void
}

const aboutText = {
  en: {
    paragraph1:
      "Based in Wrocław, Poland. I navigate between code and sound, creating projects that feel personal. I focus on designing intuitive experiences that truly resonate. I believe that great software and great tracks share the same foundation — attention to detail and creativity.",
    paragraph2:
      "I am committed to continuous self-improvement, broadening my horizons by learning and traveling to understand diverse perspectives and cultures. My goal is to visit every country in the world, driven by a restless desire to constantly explore the unknown.",
    paragraph3:
      "When I’m not traveling or creating, you can find me cheering for FC Barcelona, watching Polish fighters in the UFC, or expanding my perfume collection.",
    paragraph4:
      "Over the last few years, I’ve gravitated towards the atmospheric sounds of Wave and Phonk, drawing major inspiration from them for my own work. However, my playlist knows no boundaries. I also listen to plenty of Hip-Hop and other electronic music, constantly discovering new sounds and refusing to limit myself to just one style.",
    collapse: "Collapse bio",
    expand: "Expand bio",
    mapPreviewLabel: "Open countries map preview",
    countriesVisited: "Countries visited",
    fragranticaLabel: "Open Fragrantica profile",
    perfumesOwned: "Perfumes owned",
  },
  pl: {
    paragraph1:
      "Na co dzień mieszkam we Wrocławiu. Poruszam się między kodem a dźwiękiem, tworząc projekty, które mają osobisty charakter. Skupiam się na projektowaniu intuicyjnych doświadczeń, które naprawdę trafiają do ludzi. Wierzę, że świetne oprogramowanie i dobre utwory mają ten sam fundament — dbałość o detale i kreatywność.",
    paragraph2:
      "Stale pracuję nad sobą, poszerzając horyzonty przez naukę i podróże, aby lepiej rozumieć różne perspektywy i kultury. Moim celem jest odwiedzenie każdego kraju na świecie, napędzane nieustanną chęcią odkrywania nieznanego.",
    paragraph3:
      "Gdy nie podróżuję ani nie tworzę, kibicuję FC Barcelonie, oglądam polskich zawodników w UFC albo rozwijam swoją kolekcję perfum.",
    paragraph4:
      "W ostatnich latach szczególnie zbliżyłem się do klimatycznych brzmień Wave i Phonk, które mocno inspirują mnie w mojej twórczości. Mimo to moja playlista nie ma granic. Słucham też dużo Hip-Hopu i innych odmian elektroniki, stale odkrywając nowe dźwięki i nie zamykając się w jednym stylu.",
    collapse: "Zwiń opis",
    expand: "Rozwiń opis",
    mapPreviewLabel: "Otwórz podgląd mapy odwiedzonych krajów",
    countriesVisited: "Odwiedzone kraje",
    fragranticaLabel: "Otwórz profil Fragrantica",
    perfumesOwned: "Posiadane perfumy",
  },
} as const

export function TabAbout({ language, onOpenImagePreview }: TabAboutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const text = aboutText[language]

  const hyphenateText = useMemo(() => {
    const hyphenate = language === "pl" ? hyphenatePl : hyphenateEn

    return {
      paragraph1: hyphenate(text.paragraph1),
      paragraph2: hyphenate(text.paragraph2),
      paragraph3: hyphenate(text.paragraph3),
      paragraph4: hyphenate(text.paragraph4),
    }
  }, [language, text.paragraph1, text.paragraph2, text.paragraph3, text.paragraph4])

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card px-5 pt-3.5 pb-5 backdrop-blur-xl" lang={language}>
        <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
          {hyphenateText.paragraph1}
        </p>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <div className="mt-3 space-y-3">
              <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
                {hyphenateText.paragraph2}
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
                {hyphenateText.paragraph3}
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
                {hyphenateText.paragraph4}
              </p>
            </div>
          </CollapsibleContent>

          <div className="mt-0.5 mb-[-14px] flex justify-center">
            <CollapsibleTrigger asChild>
              <button
                className="-m-4 inline-flex cursor-pointer items-center justify-center rounded-full p-4 text-foreground/70 transition-colors hover:text-foreground"
                type="button"
                aria-label={isOpen ? text.collapse : text.expand}
              >
                {isOpen ? <BsChevronCompactUp className="h-4.5 w-4.5" /> : <BsChevronCompactDown className="h-4.5 w-4.5" />}
              </button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOpenImagePreview("/images/tripify-map.jpg", "Tripify map")}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/10 hover:shadow-[0_0_20px_rgba(240,240,240,0.08)]"
          aria-label={text.mapPreviewLabel}
        >
          <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          <span className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,#8b60e8_40%,#8b60e8_60%,#b817e4_100%)] bg-clip-text text-xl font-bold text-transparent font-mono">
            28
          </span>
          <p className="mt-1 text-[11px] text-muted-foreground">{text.countriesVisited}</p>
        </button>

        <a
          href="https://www.fragrantica.pl/uzytkownicy/34655"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/10 hover:shadow-[0_0_20px_rgba(240,240,240,0.08)]"
          aria-label={text.fragranticaLabel}
        >
          <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          <span className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,#8b60e8_40%,#8b60e8_60%,#b817e4_100%)] bg-clip-text text-xl font-bold text-transparent font-mono">
            30
          </span>
          <p className="mt-1 text-[11px] text-muted-foreground">{text.perfumesOwned}</p>
        </a>
      </div>

    </div>
  )
}

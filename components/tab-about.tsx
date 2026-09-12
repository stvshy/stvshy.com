"use client"

import { useMemo, useState } from "react"
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"
import { ChevronRight } from "lucide-react"
import { hyphenateSync as hyphenateEn } from "hyphen/en"
import { hyphenateSync as hyphenatePl } from "hyphen/pl"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TabMusic } from "@/components/tab-music"

type TabAboutProps = {
  language: "en" | "pl"
  onOpenImagePreview: (imageSrc: string, imageAlt: string) => void
  includeMusic?: boolean
}

const aboutText = {
  en: {
    paragraph1:
      "I navigate between code and sound, crafting projects with a unique character. I focus on designing intuitive solutions that leave a mark. I believe that great software and great tracks share the same foundation — attention to detail and creativity.",
    paragraph2:
      "I am committed to continuous self-improvement, broadening my horizons by learning and traveling to understand diverse perspectives and cultures. My goal is to visit every country in the world, driven by a restless desire to constantly explore the unknown.",
    paragraph3:
      "Over the last few years, I’ve gravitated towards the atmospheric sounds of Wave and Phonk, drawing major inspiration from them for my own work. However, my playlist knows no boundaries. I also listen to plenty of Hip-Hop and other electronic music, constantly discovering new sounds and refusing to limit myself to just one style.",
    paragraph4:
      "After hours, you can find me cheering for FC Barcelona, watching Polish fighters in the UFC, or expanding my perfume collection.",
    collapse: "Collapse bio",
    expand: "Expand bio",
    mapPreviewLabel: "Open countries map preview",
    countriesVisited: "Countries visited",
    fragranticaLabel: "Open Fragrantica profile",
    perfumesOwned: "Perfumes owned",
  },
  pl: {
    paragraph1:
      "Jestem programistą i producentem muzycznym, działającym we Wrocławiu. Balansuję między kodem a muzyką, tworząc projekty o unikalnym charakterze. Celuję w intuicyjne rozwiązania, które trafiają do ludzi. Wierzę, że świetne oprogramowanie i dobre utwory mają wspólny mianownik — dbałość o detale i kreatywność.",
    paragraph2:
      "Stawiam na ciągły progres, nieustannie podnosząc poprzeczkę, a podróże i nauka są narzędziami, pozwalającymi mi zrozumieć świat z różnych perspektyw.",
    paragraph3:
      "Muzycznie moje serce bije obecnie w rytmie Wave i Phonk — to te gatunki stanowią największą inspirację dla moich produkcji. Nie zamykam się jednak w bańce, a moja playlista obejmuje szerokie spektrum różnych brzmień",
    paragraph4:
      "Po godzinach kibicuję FC Barcelonie oraz śledzę zmagania Polaków w oktagonie UFC. Stale rozbudowuję również kolekcję perfum i odkrywam niszowe zapachy, wykraczające poza schematy.",
    collapse: "Zwiń opis",
    expand: "Rozwiń opis",
    mapPreviewLabel: "Otwórz podgląd mapy odwiedzonych krajów",
    countriesVisited: "Odwiedzone kraje",
    fragranticaLabel: "Otwórz profil Fragrantica",
    perfumesOwned: "Posiadane perfumy",
  },
} as const

export function TabAbout({ language, onOpenImagePreview, includeMusic = false }: TabAboutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMusicOpen, setIsMusicOpen] = useState(false)
  const text = aboutText[language]

  const hyphenateText = useMemo(() => {
    const hyphenate = language === "pl" ? hyphenatePl : hyphenateEn
    const plWords = [
      "programistą",
      "producentem muzycznym",
      "Wrocławiu",
      "intuicyjne rozwiązania",
      "dbałość o detale",
      "kreatywność",
      "ciągły progres",
      "podróże",
      "nauka",
      "Wave",
      "Phonk"
    ]

    const enCommon = [
      "intuitive solutions",
      "in­tu­itive so­lu­ti­ons",
      "attention to detail",
      "at­ten­tion to de­tail",
      "creativity",
      "self-improvement",
      "learning",
      "Wave",
      "Phonk",
      "Hip-Hop",
      "electronic music"
    ]
    // paragraph-specific English words
    const enPara2Extra = ["travelling", "trav­el­ing"]

 
    const highlightClass = "text-neutral-300"
    // Hyphenation inserts soft-hyphen chars (\u00AD) which break simple regex matches.
    // Approach: hyphenate plain text, build mapping from de-hyphenated indices to hyphenated indices,
    // find matches in de-hyphenated text, and then wrap corresponding ranges in the hyphenated string.
    const highlightHyphenated = (hyphText: string, words: string[]) => {
      const SOFT = '\u00AD'
      const dehyph = hyphText.split(SOFT).join('')

      // build mapping: posMap[i] = index in hyphText corresponding to dehyph char i
      const posMap: number[] = new Array(dehyph.length + 1)
      let deIdx = 0
      for (let i = 0; i < hyphText.length; i++) {
        if (hyphText[i] === SOFT) continue
        if (posMap[deIdx] === undefined) posMap[deIdx] = i
        deIdx++
      }
      posMap[deIdx] = hyphText.length

      const lower = dehyph.toLowerCase()
      const ranges: Array<[number, number]> = []

      words.forEach(word => {
        const w = word.split(SOFT).join('').toLowerCase()
        let idx = 0
        while (true) {
          idx = lower.indexOf(w, idx)
          if (idx === -1) break
          ranges.push([idx, idx + w.length])
          idx += w.length
        }
      })

      if (ranges.length === 0) return hyphText

      // sort and remove overlaps (keep first occurrence)
      ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1])
      const merged: Array<[number, number]> = []
      for (const r of ranges) {
        if (merged.length === 0 || r[0] >= merged[merged.length - 1][1]) merged.push(r)
      }

      // build output using posMap to slice hyphText
      let out = ''
      let cursor = 0 // dehyph index
      for (const [sDe, eDe] of merged) {
        const sHy = posMap[sDe]
        const eHy = posMap[eDe]
        out += hyphText.slice(posMap[cursor], sHy)
        out += `<span class="${highlightClass}">` + hyphText.slice(sHy, eHy) + '</span>'
        cursor = eDe
      }
      out += hyphText.slice(posMap[cursor])
      return out
    }

    return {
      paragraph1: highlightHyphenated(hyphenate(text.paragraph1), language === 'pl' ? plWords : enCommon),
      paragraph2: highlightHyphenated(hyphenate(text.paragraph2), language === 'pl' ? plWords : enCommon.concat(enPara2Extra)),
      paragraph3: highlightHyphenated(hyphenate(text.paragraph3), language === 'pl' ? plWords : enCommon),
      paragraph4: highlightHyphenated(hyphenate(text.paragraph4), language === 'pl' ? plWords : enCommon),
    }
  }, [language, text.paragraph1, text.paragraph2, text.paragraph3, text.paragraph4])

  const compactAboutHoverClass = includeMusic
    ? "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[#b817e4]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#b817e4]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(184,23,228,0.18)] active:border-[#b817e4]/45 active:bg-[#b817e4]/10 active:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
    : ""

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-xl border border-border bg-card px-5 pt-3.5 pb-5 backdrop-blur-xl"
        lang={language}
      >
        <p
          className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]"
          style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', fontFeatureSettings: '"ss01"' }}
        >
          {language === "en" ? (
            // Use hyphenated+highlighted HTML so keywords are highlighted
            <span
              dangerouslySetInnerHTML={{
                __html:
                  hyphenateEn("Based in ") +
                  '<span class="text-white">Wrocław, Poland</span>' +
                  hyphenateEn(" — ") +
                  hyphenateText.paragraph1,
              }}
            />
          ) : (
            // Render hyphenated + highlighted HTML for Polish
            <span dangerouslySetInnerHTML={{ __html: hyphenateText.paragraph1 }} />
          )}
        </p>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <div className="mt-3 space-y-3">
              <p
                className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]"
                style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
              >
                <span dangerouslySetInnerHTML={{ __html: hyphenateText.paragraph2 }} />
              </p>
              <p
                className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]"
                style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
              >
                <span dangerouslySetInnerHTML={{ __html: hyphenateText.paragraph3 }} />
              </p>
              <p
                className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]"
                style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
              >
                <span dangerouslySetInnerHTML={{ __html: hyphenateText.paragraph4 }} />
              </p>
            </div>
          </CollapsibleContent>
          <div className="mt-0.5 mb-[-14px] flex justify-center">
            <CollapsibleTrigger asChild>
              <button
                className="-m-4 inline-flex cursor-pointer items-center justify-center rounded-full p-4 text-foreground/70 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground active:text-foreground"
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
          className={`group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 ${
            includeMusic
              ? compactAboutHoverClass
              : "[@media(hover:hover)_and_(pointer:fine)]:hover:border-foreground/30 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-foreground/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(240,240,240,0.08)] active:border-foreground/30 active:bg-foreground/10 active:shadow-[0_0_20px_rgba(240,240,240,0.08)]"
          }`}
          aria-label={text.mapPreviewLabel}
        >
          <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-foreground group-active:translate-x-0.5 group-active:text-foreground" />
          <span
            className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,#8b60e8_40%,#8b60e8_60%,#b817e4_100%)] bg-clip-text text-[20px] text-transparent"
            style={{
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontWeight: 550,
              fontVariationSettings: "'wght' 550",
            }}
          >
            28
          </span>
          <p className="mt-1 text-[11.43px] text-muted-foreground" style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>{text.countriesVisited}</p>
        </button>
        <a
          href="https://www.fragrantica.pl/uzytkownicy/34655"
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 ${
            includeMusic
              ? compactAboutHoverClass
              : "[@media(hover:hover)_and_(pointer:fine)]:hover:border-foreground/30 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-foreground/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(240,240,240,0.08)] active:border-foreground/30 active:bg-foreground/10 active:shadow-[0_0_20px_rgba(240,240,240,0.08)]"
          }`}
          aria-label={text.fragranticaLabel}
        >
          <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-foreground group-active:translate-x-0.5 group-active:text-foreground" />
          <span
            className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,#8b60e8_40%,#8b60e8_60%,#b817e4_100%)] bg-clip-text text-xl text-transparent"
            style={{
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontWeight: 550,
              fontVariationSettings: "'wght' 550",
            }}
          >
            31
          </span>
          <p className="mt-1 text-[11.43px] text-muted-foreground" style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>{text.perfumesOwned}</p>
        </a>
      </div>
      {includeMusic && (
        <div
          className={`border bg-card backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 ${
            isMusicOpen
              ? "rounded-xl border-border"
              : "rounded-xl border-border [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#b817e4]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#b817e4]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(184,23,228,0.18)] active:border-[#b817e4]/45 active:bg-[#b817e4]/10 active:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsMusicOpen((previous) => !previous)}
            aria-expanded={isMusicOpen}
            className={`group relative flex h-16 w-full items-center gap-4 overflow-hidden px-5 py-3 text-left transition-[background-color,border-color,color,box-shadow] duration-300 ${
              isMusicOpen
                ? "rounded-t-xl [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#b817e4]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(184,23,228,0.18)] active:bg-[#b817e4]/10 active:shadow-[0_0_20px_rgba(184,23,228,0.18)]"
                : "rounded-xl"
            }`}
          >
            <div
              className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors [@media(hover:hover)_and_(pointer:fine)]:brightness-110 group-active:brightness-110"
            >
              <span
                className="absolute inset-0 rounded-lg opacity-5"
                aria-hidden="true"
                style={{
                  backgroundImage: "linear-gradient(to right, #b817e4 0%, #8b60e8 40%, #8b60e8 60%, var(--dev-accent) 100%)",
                }}
              />
              <svg
                className="relative z-10 size-[23px] opacity-100"
                viewBox="0 0 24 24"
                fill="url(#music-icon-gradient)"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="music-icon-gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="4"
                    y1="0"
                    x2="20"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#b817e4" />
                    <stop offset="50%" stopColor="#8b60e8" />
                    <stop offset="100%" stopColor="#05daff" />
                  </linearGradient>
                </defs>
                <path d="M9 18V5l10-2v13h-2V5.6l-6 1.2V18H9Z" />
                <circle cx="8" cy="18" r="3" />
                <circle cx="16" cy="16" r="3" />
              </svg>
            </div>
            <div className="relative z-10 flex min-w-0 flex-col gap-0.5">
              <span
                className="text-[12.58px] text-foreground"
                style={{
                  fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.1px',
                  fontWeight: 510,
                  fontVariationSettings: "'wght' 510",
                }}
              >
                {language === "pl" ? "Muzyka" : "Music"}
              </span>
              <span
                className="text-[11.43px] text-muted-foreground"
                style={{
                  fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                  letterSpacing: '-0.01em',
                }}
              >
                {language === "pl" ? "Sprawdź moje utwory" : "Check out my tracks"}
              </span>
            </div>
            <div className="pointer-events-none absolute right-[53px] top-1/2 flex h-13 -translate-y-[33.5px] items-end gap-[4px] opacity-7 transition-opacity duration-300 group-hover:opacity-25">
              {[8, 19, 16, 25, 39, 52, 31, 46, 66, 49, 35, 57, 76, 61, 43, 29, 51, 37, 26, 18, 26, 9, 14].map((height, index) => (
                <span
                  key={index}
                  className="w-[3px] rounded-full"
                  style={{
                    height: `${height}%`,
                    backgroundImage: "linear-gradient(to right, var(--dev-accent) 0%, #8b60e8 40%, #8b60e8 60%, #b817e4 100%)",
                  }}
                />
              ))}
            </div>
            <span className="relative z-10 ml-auto flex size-8 shrink-0 items-center justify-center text-foreground">
              <ChevronRight className={`size-4 transition-transform duration-300 ${isMusicOpen ? "rotate-90" : ""}`} />
            </span>
          </button>
          {isMusicOpen && (
            <div className="border-t border-border px-5 py-4">
              <TabMusic language={language} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

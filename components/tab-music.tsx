import { type CSSProperties, useEffect, useRef, useState } from "react"
import { BsSpotify } from "react-icons/bs"
import { FaDeezer } from "react-icons/fa"
import { PiSoundcloudLogoFill } from "react-icons/pi"
import { SiAmazonmusic, SiApplemusic, SiTidal, SiYoutubemusic } from "react-icons/si"
import Image from "next/image"
import fantasiaImg from "@/public/images/fantasia.png" // lub względna ścieżka np. "../public/images/fantasia.png"

const MUSIC_ACCENT = "#b817e4"

function hexToRgbChannels(hex: string) {
  const normalizedHex = hex.replace("#", "")
  const fullHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalizedHex

  const red = Number.parseInt(fullHex.slice(0, 2), 16)
  const green = Number.parseInt(fullHex.slice(2, 4), 16)
  const blue = Number.parseInt(fullHex.slice(4, 6), 16)

  return `${red} ${green} ${blue}`
}

const links = [
  {
    label: "Fantasia",
    description: "Listen latest song",
    href: "https://artists.landr.com/057914392592",
    icon: BsSpotify,
  },
  {
    label: "Spotify",
    description: "Listen on Spotify",
    href: "https://open.spotify.com/artist/20jL6FuQUNHnlP3ApdjBbI?si=fvGq0tvJRXmhMa5_KKnAXg",
    icon: BsSpotify,
  },
  {
    label: "Apple Music",
    description: "Listen on Apple Music",
    href: "https://music.apple.com/pl/artist/stvshy/1863822260",
    icon: SiApplemusic,
  },
  {
    label: "YouTube Music",
    description: "Listen on YouTube Music",
    href: "https://music.youtube.com/search?q=stvshy",
    icon: SiYoutubemusic,
  },
  {
    label: "Deezer",
    description: "Listen on Deezer",
    href: "https://www.deezer.com/pl/artist/363730262",
    icon: FaDeezer,
  },
  {
    label: "Amazon Music",
    description: "Listen on Amazon Music",
    href: "https://music.amazon.com/artists/B0GCCG5GH3/stvshy",
    icon: SiAmazonmusic,
  },
  {
    label: "TIDAL",
    description: "Listen on TIDAL",
    href: "https://tidal.com/artist/72120078",
    icon: SiTidal,
  },
  {
    label: "SoundCloud",
    description: "Unreleased beats",
    href: "https://soundcloud.com/stvshy",
    icon: PiSoundcloudLogoFill,
  },
]

type TabMusicProps = {
  language: "en" | "pl"
}

const musicText = {
  en: {
    links: {
      fantasia: "Listen latest song",
      spotify: "Listen on Spotify",
      appleMusic: "Listen on Apple Music",
      youtubeMusic: "Listen on YouTube Music",
      deezer: "Listen on Deezer",
      amazonMusic: "Listen on Amazon Music",
      tidal: "Listen on TIDAL",
      soundcloud: "Unreleased beats",
    },
    more: "More",
    tracksReleased: "Tracks released",
    yearsProducing: "Years producing",
    genres: "Genres",
  },
  pl: {
    links: {
      fantasia: "Posłuchaj najnowszego utworu",
      spotify: "Posłuchaj na Spotify",
      appleMusic: "Posłuchaj w Apple Music",
      youtubeMusic: "Posłuchaj w YouTube Music",
      deezer: "Posłuchaj na Deezer",
      amazonMusic: "Posłuchaj w Amazon Music",
      tidal: "Posłuchaj na TIDAL",
      soundcloud: "Niewydane beaty",
    },
    more: "Więcej",
    tracksReleased: "Wydane utwory",
    yearsProducing: "Lata produkcji",
    genres: "Gatunki",
  },
} as const

export function TabMusic({ language }: TabMusicProps) {
  const MORE_PRESS_DURATION_MS = 1200
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMorePressed, setIsMorePressed] = useState(false)
  const morePressTimeoutRef = useRef<number | null>(null)
  const text = musicText[language]

  useEffect(() => {
    return () => {
      if (morePressTimeoutRef.current !== null) {
        window.clearTimeout(morePressTimeoutRef.current)
      }
    }
  }, [])

  const triggerMorePress = () => {
    setIsMorePressed(true)
    if (morePressTimeoutRef.current !== null) {
      window.clearTimeout(morePressTimeoutRef.current)
    }
    morePressTimeoutRef.current = window.setTimeout(() => {
      setIsMorePressed(false)
      morePressTimeoutRef.current = null
    }, MORE_PRESS_DURATION_MS)
  }

  const localizedLinks = links.map((link) => {
    const descriptionMap = {
      Fantasia: text.links.fantasia,
      Spotify: text.links.spotify,
      "Apple Music": text.links.appleMusic,
      "YouTube Music": text.links.youtubeMusic,
      Deezer: text.links.deezer,
      "Amazon Music": text.links.amazonMusic,
      TIDAL: text.links.tidal,
      SoundCloud: text.links.soundcloud,
    } as const

    return {
      ...link,
      description: descriptionMap[link.label as keyof typeof descriptionMap] ?? link.description,
    }
  })

  const musicThemeStyle = {
    "--music-accent": MUSIC_ACCENT,
    "--music-accent-rgb": hexToRgbChannels(MUSIC_ACCENT),
    fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  } as CSSProperties

  const musicRgb = hexToRgbChannels(MUSIC_ACCENT).split(" ").join(", ")

  const defaultLinkClassName =
    "group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 backdrop-blur-xl transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[rgb(var(--music-accent-rgb)/0.3)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[rgb(var(--music-accent-rgb)/0.05)] active:border-[rgb(var(--music-accent-rgb)/0.3)] active:bg-[rgb(var(--music-accent-rgb)/0.05)]"

  const fantasiaCardClassName =
    "group flex items-center gap-4 rounded-xl border border-[rgb(var(--music-accent-rgb)/0.35)] bg-[rgb(var(--music-accent-rgb)/0.1)] px-5 py-3 backdrop-blur-xl transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[rgb(var(--music-accent-rgb)/0.45)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[rgb(var(--music-accent-rgb)/0.15)] active:border-[rgb(var(--music-accent-rgb)/0.45)] active:bg-[rgb(var(--music-accent-rgb)/0.15)]"


  const visibleLinks = localizedLinks.slice(0, 4)
  const hiddenLinks = localizedLinks.slice(4)

  return (
    <div className="flex flex-col gap-3" style={musicThemeStyle}>
      {visibleLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={link.label === "Fantasia" ? fantasiaCardClassName : defaultLinkClassName}
        >
          <div
            className={
              link.label === "Fantasia"
                ? "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                : "flex size-10 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--music-accent-rgb)/0.1)] text-[rgb(var(--music-accent-rgb))] transition-colors [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[rgb(var(--music-accent-rgb)/0.2)] group-active:bg-[rgb(var(--music-accent-rgb)/0.2)]"
            }
          >
            {link.label === "Fantasia" ? (
              <Image 
                src={fantasiaImg} 
                alt="Fantasia cover"  
                className="size-full rounded-lg object-cover" 
                quality={82}
                sizes="40px"
                placeholder="blur"
              />
            ) : (
              <link.icon className="size-5" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[12.58px] text-foreground"
              style={{ letterSpacing: '-0.02em', marginBottom: '0.1px', fontWeight: 510, fontVariationSettings: "'wght' 510" }}
            >
              {link.label}
            </span>
            <span className="text-[11.43px] text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>
              {link.description}
            </span>
          </div>
          <svg
            className="ml-auto size-4 text-muted-foreground transition-transform [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[rgb(var(--music-accent-rgb))] group-active:translate-x-0.5 group-active:text-[rgb(var(--music-accent-rgb))]"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </a>
      ))}

      <button
        type="button"
        onPointerDown={triggerMorePress}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            triggerMorePress()
          }
        }}
        onClick={() => {
          setIsMoreOpen((prev) => !prev)
        }}
        className={`flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-border/70 bg-card/70 text-[11px] font-medium uppercase tracking-wide text-muted-foreground transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[rgb(var(--music-accent-rgb)/0.3)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[rgb(var(--music-accent-rgb))] active:border-[rgb(var(--music-accent-rgb)/0.3)] active:text-[rgb(var(--music-accent-rgb))] ${
          isMorePressed
            ? "border-[rgb(var(--music-accent-rgb)/0.3)] text-[rgb(var(--music-accent-rgb))]"
            : ""
        }`}
        aria-expanded={isMoreOpen}
        aria-controls="more-music-links"
      >
        {text.more}
        <svg
          className={isMoreOpen ? "size-3 transition-transform duration-300 rotate-180" : "size-3 transition-transform duration-300"}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3.5 6l4.5 4 4.5-4" />
        </svg>
      </button>

      {isMoreOpen && (
        <div
          id="more-music-links"
          className="flex flex-col gap-3 animate-in fade-in-0 slide-in-from-top-1 duration-300"
        >
          {hiddenLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={defaultLinkClassName}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--music-accent-rgb)/0.1)] text-[rgb(var(--music-accent-rgb))] transition-colors [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[rgb(var(--music-accent-rgb)/0.2)] group-active:bg-[rgb(var(--music-accent-rgb)/0.2)]">
                <link.icon className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-[12.58px] text-foreground"
                  style={{ letterSpacing: '-0.02em', marginBottom: '0.1px', fontWeight: 510, fontVariationSettings: "'wght' 510" }}
                >
                  {link.label}
                </span>
                <span
                  className="text-[11.43px] text-muted-foreground"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {link.description}
                </span>
              </div>
              <svg
                className="ml-auto size-4 text-muted-foreground transition-transform [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[rgb(var(--music-accent-rgb))] group-active:translate-x-0.5 group-active:text-[rgb(var(--music-accent-rgb))]"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </a>
          ))}
        </div>
      )}

        <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span
            className="text-[20.1px] text-[rgb(var(--music-accent-rgb))]"
            style={{
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontWeight: 510,
              fontVariationSettings: "'wght' 510",
            }}
          >
            1
          </span>
          <p className="mt-1 text-[11.43px] text-muted-foreground">{text.tracksReleased}</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span
            className="text-[20.1px] text-[#0ab8d6f8]"
            style={{
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontWeight: 510,
              fontVariationSettings: "'wght' 500",
            }}
          >
            3+
          </span>
          <p className="mt-1 text-[11.43px] text-muted-foreground">{text.yearsProducing}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card px-5 py-4 backdrop-blur-xl">
        <h3 className="mb-3 text-[11.2px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
          {text.genres}
        </h3>
        <div className="flex flex-wrap gap-2" style={{ marginLeft: '-3.4px' }}>
          {["Wave", "Electronic", "Trap", "Hardwave", "Hip-hop", "Witch House", "Trapwave"].map((genre, idx) => {
            const angle = (idx * 47 + 15) % 360
            const angleDeg = `${angle}deg`

            return (
              <span
                key={genre}
                className="rounded-full px-3 py-1 text-[11px] text-foreground"
                style={{
                  backgroundImage: `linear-gradient(${angleDeg}, rgba(29, 28, 28, 0.87), rgba(27, 26, 26, 0.87)), linear-gradient(${angleDeg}, rgba(${musicRgb},0.25), rgba(5, 218, 255, 0.25))`,
                  backgroundOrigin: 'padding-box, border-box',
                  backgroundClip: 'padding-box, border-box',
                  border: '1px solid transparent',
                  WebkitBackdropFilter: 'blur(6px)',
                  backdropFilter: 'blur(6px)',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.02) inset'
                }}
              >
                {genre}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

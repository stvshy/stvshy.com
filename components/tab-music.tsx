import { type CSSProperties, useState } from "react"
import { BsSpotify } from "react-icons/bs"
import { FaDeezer } from "react-icons/fa"
import { PiSoundcloudLogoFill } from "react-icons/pi"
import { SiAmazonmusic, SiApplemusic, SiTidal, SiYoutubemusic } from "react-icons/si"

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

export function TabMusic() {
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const musicThemeStyle = {
    "--music-accent": MUSIC_ACCENT,
    "--music-accent-rgb": hexToRgbChannels(MUSIC_ACCENT),
  } as CSSProperties

  const defaultLinkClassName =
    "group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-[rgb(var(--music-accent-rgb)/0.3)] hover:bg-[rgb(var(--music-accent-rgb)/0.05)]"

  const fantasiaCardClassName =
    "group flex items-center gap-4 rounded-xl border border-[rgb(var(--music-accent-rgb)/0.35)] bg-[rgb(var(--music-accent-rgb)/0.1)] px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-[rgb(var(--music-accent-rgb)/0.45)] hover:bg-[rgb(var(--music-accent-rgb)/0.15)]"

  // const fantasiaCardClassName =
  //   "group flex items-center gap-4 rounded-xl border border-neon-magenta/35 bg-neon-magenta/10 px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-neon-magenta/45 hover:bg-neon-magenta/15 hover:shadow-[0_0_24px_rgba(217,70,239,0.14)]"

  const visibleLinks = links.slice(0, 4)
  const hiddenLinks = links.slice(4)

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
                : "flex size-10 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--music-accent-rgb)/0.1)] text-[rgb(var(--music-accent-rgb))] transition-colors group-hover:bg-[rgb(var(--music-accent-rgb)/0.2)]"
            }
          >
            {link.label === "Fantasia" ? (
              <img
                src="/images/fantasia.png"
                alt="Fantasia cover"
                className="size-full rounded-lg object-cover"
              />
            ) : (
              <link.icon className="size-5" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-foreground">
              {link.label}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {link.description}
            </span>
          </div>
          <svg
            className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[rgb(var(--music-accent-rgb))]"
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
        onClick={() => setIsMoreOpen((prev) => !prev)}
        className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-border/70 bg-card/70 text-[11px] font-medium uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:border-[rgb(var(--music-accent-rgb)/0.3)] hover:text-[rgb(var(--music-accent-rgb))]"
        aria-expanded={isMoreOpen}
        aria-controls="more-music-links"
      >
        More
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
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--music-accent-rgb)/0.1)] text-[rgb(var(--music-accent-rgb))] transition-colors group-hover:bg-[rgb(var(--music-accent-rgb)/0.2)]">
                <link.icon className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-foreground">
                  {link.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {link.description}
                </span>
              </div>
              <svg
                className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[rgb(var(--music-accent-rgb))]"
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
          <span className="text-xl font-bold text-[rgb(var(--music-accent-rgb))] font-mono">1</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Tracks released</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span className="text-xl font-bold text-[rgb(var(--music-accent-rgb))] font-mono">3+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Years producing</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card px-5 py-4 backdrop-blur-xl">
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Genres
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Wave", "Electronic", "Trap", "Hardwave", "Hip-hop", "Witch House", "Trapwave"].map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] text-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

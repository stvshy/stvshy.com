import { BsSpotify } from "react-icons/bs"
import { FaDeezer } from "react-icons/fa"
import { PiSoundcloudLogoFill } from "react-icons/pi"
import { SiAmazonmusic, SiApplemusic, SiTidal, SiYoutubemusic } from "react-icons/si"

const links = [
  {
    label: "Spotify",
    description: "Listen to my latest releases",
    href: "https://open.spotify.com/artist/20jL6FuQUNHnlP3ApdjBbI?si=fvGq0tvJRXmhMa5_KKnAXg",
    icon: BsSpotify,
  },
  {
    label: "SoundCloud",
    description: "Unreleased beats & demos",
    href: "https://soundcloud.com/stvshy",
    icon: PiSoundcloudLogoFill,
  },
  {
    label: "Apple Music",
    description: "Stream on Apple Music",
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
    description: "Stream on Deezer",
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
    description: "Stream on TIDAL",
    href: "https://tidal.com/artist/72120078",
    icon: SiTidal,
  },
]

export function TabMusic() {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/30 hover:bg-neon-cyan/5 hover:shadow-[0_0_20px_rgba(0,242,234,0.08)]"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan transition-colors group-hover:bg-neon-cyan/20">
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
            className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-neon-cyan"
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
  )
}

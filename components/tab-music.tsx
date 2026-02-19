import { Music, Headphones, Radio, Disc3 } from "lucide-react"

const links = [
  {
    label: "Spotify",
    description: "Listen to my latest releases",
    href: "#",
    icon: Headphones,
  },
  {
    label: "SoundCloud",
    description: "Unreleased beats & demos",
    href: "#",
    icon: Radio,
  },
  {
    label: "BeatStars",
    description: "License my instrumentals",
    href: "#",
    icon: Music,
  },
  {
    label: "Apple Music",
    description: "Stream on Apple Music",
    href: "#",
    icon: Disc3,
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
          className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/30 hover:bg-neon-cyan/5 hover:shadow-[0_0_20px_rgba(0,242,234,0.08)]"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan transition-colors group-hover:bg-neon-cyan/20">
            <link.icon className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              {link.label}
            </span>
            <span className="text-xs text-muted-foreground">
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

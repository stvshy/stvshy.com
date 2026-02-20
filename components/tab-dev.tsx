import { Github, Globe, Code2, Terminal } from "lucide-react"

const links = [
  {
    label: "GitHub",
    description: "Open source projects & contributions",
    href: "#",
    icon: Github,
  },
  {
    label: "Portfolio",
    description: "Web development work & case studies",
    href: "#",
    icon: Globe,
  },
  {
    label: "Stack",
    description: "Tools & technologies I use daily",
    href: "#",
    icon: Terminal,
  },
  {
    label: "Blog",
    description: "Thoughts on code, music & creativity",
    href: "#",
    icon: Code2,
  },
]

export function TabDev() {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:border-neon-magenta/30 hover:bg-neon-magenta/5 hover:shadow-[0_0_20px_rgba(255,0,80,0.08)]"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neon-magenta/10 text-neon-magenta transition-colors group-hover:bg-neon-magenta/20">
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
            className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-neon-magenta"
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

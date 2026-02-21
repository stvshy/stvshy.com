"use client"

import { useState } from "react"
import {
  Github,
  Linkedin,
  Plane,
  Hammer,
  Gamepad2,
  Lock,
  ChevronDown,
  Globe,
  Server,
  Code2,
  Database,
  Braces,
  Cpu,
  Layers,
} from "lucide-react"

const links = [
  {
    label: "GitHub",
    description: "Open source projects & contributions",
    href: "#",
    icon: Github,
    blocked: false,
  },
  {
    label: "LinkedIn",
    description: "Professional profile & experience",
    href: "#",
    icon: Linkedin,
    blocked: false,
  },
  {
    label: "Travel Assistant",
    description: "AI helper for trip planning",
    href: "#",
    icon: Plane,
    blocked: false,
  },
  {
    label: "Renovation System",
    description: "Management platform for renovation workflows",
    href: "#",
    icon: Hammer,
    blocked: false,
  },
  {
    label: "Hollow Depths",
    description: "Godot game project",
    href: "#",
    icon: Gamepad2,
    blocked: false,
  },
  {
    label: "Tripify",
    description: "Work in progress",
    href: "#",
    icon: Lock,
    blocked: true,
  },
]

export function TabDev() {
  const [isStackOpen, setIsStackOpen] = useState(false)
  const [isYearsOpen, setIsYearsOpen] = useState(false)
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false)

  const stackSections = [
    {
      title: "Frontend",
      items: [
        { label: "Next.js", icon: Globe },
        { label: "React", icon: Layers },
        { label: "Tailwind CSS", icon: Braces },
      ],
    },
    {
      title: "Backend",
      items: [
        { label: "Node.js", icon: Server },
        { label: "REST APIs", icon: Code2 },
        { label: "PostgreSQL", icon: Database },
      ],
    },
    {
      title: "Programming languages",
      items: [
        { label: "TypeScript", icon: Braces },
        { label: "Python", icon: Cpu },
        { label: "C#", icon: Code2 },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.blocked ? undefined : link.href}
          target={link.blocked ? undefined : "_blank"}
          rel={link.blocked ? undefined : "noopener noreferrer"}
          aria-disabled={link.blocked}
          className={`group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 backdrop-blur-xl transition-all duration-300 ${
            link.blocked
              ? "cursor-not-allowed opacity-70"
              : "hover:border-neon-magenta/30 hover:bg-neon-magenta/5 hover:shadow-[0_0_20px_rgba(255,0,80,0.08)]"
          }`}
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
            className={`ml-auto size-4 text-muted-foreground ${
              link.blocked
                ? ""
                : "transition-transform group-hover:translate-x-0.5 group-hover:text-neon-magenta"
            }`}
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

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIsYearsOpen((prev) => !prev)}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl"
        >
          <ChevronDown
            className={`absolute right-3 top-3 size-3.5 text-muted-foreground transition-transform ${
              isYearsOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-bold text-neon-cyan font-mono">9+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Years programming</p>
        </button>

        <button
          type="button"
          onClick={() => setIsCertificatesOpen((prev) => !prev)}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl"
        >
          <ChevronDown
            className={`absolute right-3 top-3 size-3.5 text-muted-foreground transition-transform ${
              isCertificatesOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-bold text-neon-magenta font-mono">5</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Certificates</p>
        </button>
      </div>

      {isYearsOpen && (
        <div className="rounded-xl border border-border bg-card px-5 py-4 text-[12px] leading-relaxed text-muted-foreground backdrop-blur-xl">
          <p>
            2018-2021: I Liceum Og&oacute;lnokszta&#322;c&#261;ce w Legnicy,
            profil matematyczno-informatyczny.
          </p>
          <p className="mt-2">
            2021-2025: Wroc&#322;aw University of Science and Technology,
            Computer Engineering (in&#380;ynierka) oraz Applied Computer Science
            (magisterka).
          </p>
        </div>
      )}

      {isCertificatesOpen && (
        <div className="rounded-xl border border-border bg-card px-5 py-4 text-[12px] leading-relaxed text-muted-foreground backdrop-blur-xl">
          Politechnika Wroc&#322;awska: Computer Engineering (in&#380;ynierka) oraz
          Applied Computer Science (magisterka).
        </div>
      )}

      <div className="rounded-xl border border-border bg-card backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setIsStackOpen((prev) => !prev)}
          className="group flex w-full items-center gap-4 px-5 py-3 text-left"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neon-magenta/10 text-neon-magenta transition-colors group-hover:bg-neon-magenta/20">
            <Layers className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-foreground">Stack</span>
            <span className="text-[11px] text-muted-foreground">
              Frontend, backend, programming languages
            </span>
          </div>
          <ChevronDown
            className={`ml-auto size-4 text-muted-foreground transition-transform ${
              isStackOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isStackOpen && (
          <div className="border-t border-border px-5 py-4">
            <div className="flex flex-col gap-3">
              {stackSections.map((section) => (
                <div key={section.title}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] text-foreground"
                      >
                        <item.icon className="size-3.5 text-muted-foreground" />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

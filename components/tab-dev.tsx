"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ChevronDown,
  ExternalLink,
  Globe,
  Server,
  Code2,
  Database,
  Braces,
  Cpu,
  Layers,
  X,
} from "lucide-react"
import { MdLocalAirport, MdLock } from "react-icons/md"
import { ImLinkedin2 } from "react-icons/im"
import { IoLogoGithub } from "react-icons/io"
import { IoConstruct, IoGameController } from "react-icons/io5"
import { RiChatVoiceAiFill } from "react-icons/ri"
import { FaMeta } from "react-icons/fa6"
import { SiCisco } from "react-icons/si"

const links = [
  {
    label: "GitHub",
    description: "Open source projects & contributions",
    href: "https://github.com/stvshy",
    icon: IoLogoGithub,
    blocked: false,
  },
  {
    label: "LinkedIn",
    description: "Professional profile, projects & experience",
    href: "https://www.linkedin.com/in/mateusz-staszk%C3%B3w/",
    icon: ImLinkedin2,
    blocked: false,
  },
  {
    label: "Travel Assistant",
    description: "AI helper for trip planning",
    href: "https://empathetic-ai-travel-assistant.vercel.app",
    icon: RiChatVoiceAiFill,
    blocked: false,
  },
  {
    label: "Hollow Depths",
    description: "Godot game project",
    href: "https://konrad-skowron.itch.io/hollow-depths",
    icon: IoGameController,
    blocked: false,
  },
  {
    label: "Renovation System",
    description: "Management platform for renovation workflows",
    href: "https://stvshy.github.io/renovation-system/#/register",
    icon: IoConstruct,
    blocked: false,
  },
  {
    label: "Tripify",
    description: "Mobile app. Work in progress",
    href: "#",
    icon: MdLocalAirport,
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

  const certificates = [
    {
      title: "Programming with JavaScript",
      issuer: "Meta",
      verifyUrl: "https://www.coursera.org/account/accomplishments/verify/DCEXTU27C4HO",
      image: "/images/meta2.png",
      logo: FaMeta,
    },
    {
      title: "Introduction to Mobile Development",
      issuer: "Meta",
      verifyUrl: "https://www.coursera.org/account/accomplishments/verify/8OJJV1T21QI5",
      image: "/images/meta1.png",
      logo: FaMeta,
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco",
      verifyUrl:
        "https://www.credly.com/badges/9719de3d-0a39-41ad-b203-0c2f3cce6ab7/linked_in_profile",
      image: "/images/cisco.png",
      logo: SiCisco,
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
              ? "cursor-not-allowed border-border/70 bg-card/35 opacity-100"
              : "hover:border-neon-magenta/30 hover:bg-neon-magenta/5 hover:shadow-[0_0_20px_rgba(255,0,80,0.08)]"
          }`}
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              link.blocked
                ? "bg-neon-magenta/5 text-neon-magenta/60"
                : "bg-neon-magenta/10 text-neon-magenta group-hover:bg-neon-magenta/20"
            }`}
          >
            <link.icon className={link.label === "GitHub" ? "size-6" : "size-5"} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className={`text-[13px] font-semibold ${
                link.blocked ? "text-foreground/70" : "text-foreground"
              }`}
            >
              {link.label}
            </span>
            <span
              className={`text-[11px] ${
                link.blocked ? "text-muted-foreground/70" : "text-muted-foreground"
              }`}
            >
              {link.description}
            </span>
          </div>
          {link.blocked ? (
            <MdLock className="ml-auto size-4 text-muted-foreground/70" />
          ) : (
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
          )}
        </a>
      ))}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIsYearsOpen((prev) => !prev)}
          aria-expanded={isYearsOpen}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl"
        >
          <ChevronDown
            className={`absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground transition-transform ${
              isYearsOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-bold text-neon-cyan font-mono">9+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Years programming</p>
        </button>

        <button
          type="button"
          onClick={() => setIsCertificatesOpen((prev) => !prev)}
          aria-expanded={isCertificatesOpen}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl"
        >
          <ChevronDown
            className={`absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground transition-transform ${
              isCertificatesOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-bold text-neon-magenta font-mono">5</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Certificates</p>
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isYearsOpen
            ? "mt-0 grid-rows-[1fr] translate-y-0 opacity-100"
            : "-mt-3 grid-rows-[0fr] -translate-y-2 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`relative rounded-xl border border-border bg-card/90 px-5 py-4 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isYearsOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
          <button
            type="button"
            onClick={() => setIsYearsOpen(false)}
            aria-label="Close Education"
            className="absolute right-3 top-3 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Education
          </p>
          <div className="space-y-3">
            <div className="rounded-lg border border-border/70 bg-card/42 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neon-cyan">
                2018-2021
              </p>
              <p className="mt-1 text-[12px] font-medium text-foreground">
                I High School in Legnica
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Focus: Mathematics &amp; Computer Science
              </p>
            </div>

            <div className="rounded-lg border border-border/70 bg-card/42 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neon-magenta">
                Wrocław University of Science and Technology
              </p>
              <div className="mt-2 space-y-2">
                <div className="rounded-md border border-border/60 bg-card px-2.5 py-2">
                  <p className="text-[11px] font-medium text-foreground">
                    Computer Engineering <span className="text-[10px] text-muted-foreground">(2021-2025)</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Bachelor&apos;s degree
                  </p>
                </div>
                <div className="rounded-md border border-border/60 bg-card px-2.5 py-2">
                  <p className="text-[11px] font-medium text-foreground">
                    Applied Computer Science <span className="text-[10px] text-muted-foreground">(2025-2026)</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">Master&apos;s degree</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCertificatesOpen
            ? "mt-0 grid-rows-[1fr] translate-y-0 opacity-100"
            : "-mt-3 grid-rows-[0fr] -translate-y-2 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`relative rounded-xl border border-border bg-card/90 px-4 py-4 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCertificatesOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
          <button
            type="button"
            onClick={() => setIsCertificatesOpen(false)}
            aria-label="Close Certificates"
            className="absolute right-3 top-3 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Certificates
          </p>
          <div className="flex flex-col gap-3">
            {certificates.map((certificate) => (
              <div
                key={certificate.title}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/42 px-3 py-3"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <certificate.logo className="size-5 shrink-0 text-foreground" />
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-medium text-foreground">
                      {certificate.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{certificate.issuer}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${certificate.title}`}
                    className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-card text-muted-foreground transition-colors hover:text-neon-magenta"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>

                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open preview ${certificate.title}`}
                    className="inline-flex h-8 w-12 overflow-hidden rounded-md border border-border/70"
                  >
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} preview`}
                      width={48}
                      height={32}
                      className="h-8 w-12 object-cover"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

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

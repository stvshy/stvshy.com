"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ExternalLink, Layers, X } from "lucide-react"
import { MdLocalAirport, MdLock, MdOutlineLayers } from "react-icons/md"
import { ImLinkedin2 } from "react-icons/im"
import { IoLogoGithub } from "react-icons/io"
import { IoConstruct, IoGameController } from "react-icons/io5"
import { RiChatVoiceAiFill } from "react-icons/ri"
import { FaMeta } from "react-icons/fa6"
import { SiCisco } from "react-icons/si"
import {
  SiAdobelightroom,
  SiAdobephotoshop,
  SiAmazonwebservices,
  SiAssemblyscript,
  SiC,
  SiClion,
  SiCplusplusbuilder,
  SiCss3,
  SiSharp,
  SiDocker,
  SiExpo,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGodotengine,
  SiGnubash,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJunit5,
  SiJupyter,
  SiLinux,
  SiMicrostation,
  SiNextdotjs,
  SiNodedotjs,
  SiOpengl,
  SiPostgresql,
  SiPycharm,
  SiPython,
  SiReact,
  SiSelenium,
  SiSpringboot,
  SiSqlite,
  SiSupabase,
  SiTerraform,
  SiTypescript,
  SiVite,
  SiVirtualbox,
} from "react-icons/si"
import { TbBrandReactNative, TbSql } from "react-icons/tb"
import { VscVscode } from "react-icons/vsc"
import { DiVisualstudio } from "react-icons/di"
import { GiKiwiBird } from "react-icons/gi"
import { FaCode, FaJava, FaMicrochip } from "react-icons/fa6"
import { FaCompass } from "react-icons/fa"

const links = [
  {
    label: "GitHub",
    description: "Projects & contributions",
    href: "https://github.com/stvshy",
    icon: IoLogoGithub,
    blocked: false,
  },
  {
    label: "LinkedIn",
    description: "Profile & networking",
    href: "https://www.linkedin.com/in/mateusz-staszk%C3%B3w/",
    icon: ImLinkedin2,
    blocked: false,
  },
  {
    label: "Travel Assistant",
    description: "AI trip planning assistant",
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
    description: "Workflow management platform",
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
      title: "Languages & Core Technologies",
      gradientClass: "from-[#05dafff8] via-blue-500 to-[#879ffc]",
      items: [
        { label: "C++", icon: SiCplusplusbuilder },
        { label: "Java", icon: FaJava },
        { label: "JavaScript", icon: SiJavascript },
        { label: "TypeScript", icon: SiTypescript },
        { label: "Node.js", icon: SiNodedotjs },
        { label: "Python", icon: SiPython },
        { label: "C", icon: SiC },
        { label: "C#", icon: SiSharp },
        { label: "HTML5", icon: SiHtml5 },
        { label: "CSS3", icon: SiCss3 },
        { label: "Bash", icon: SiGnubash },
        { label: "Assembly", icon: SiAssemblyscript },
        { label: "VHDL", icon: FaCode },
      ],
    },
    {
      title: "Frameworks & Libraries",
      gradientClass: "from-[#05dafff8] via-indigo-500 to-purple-500",
      items: [
        { label: "React Native", icon: TbBrandReactNative },
        { label: "React", icon: SiReact },
        { label: "Spring Boot", icon: SiSpringboot },
        { label: "Vite", icon: SiVite },
        { label: "Expo", icon: SiExpo },
        { label: "Next.js", icon: SiNextdotjs },
        { label: "JavaFX", icon: FaJava },
        { label: "OpenGL", icon: SiOpengl },
        { label: "Flask", icon: SiFlask },
      ],
    },
    {
      title: "Databases, Cloud & DevOps",
      gradientClass: "from-[#05dafff8] via-indigo-500 to-violet-500",
      items: [
        { label: "PostgreSQL", icon: SiPostgresql },
        { label: "SQL", icon: TbSql },
        { label: "Firebase", icon: SiFirebase },
        { label: "AWS", icon: SiAmazonwebservices },
        { label: "Docker", icon: SiDocker },
        { label: "Terraform", icon: SiTerraform },
        { label: "Linux", icon: SiLinux },
        { label: "Git", icon: SiGit },
        { label: "Supabase", icon: SiSupabase },
      ],
    },
    {
      title: "IDEs & Development Tools",
      gradientClass: "from-[#05dafff8] via-purple-500 to-violet-600",
      items: [
        { label: "IntelliJ IDEA", icon: SiIntellijidea },
        { label: "PyCharm", icon: SiPycharm },
        { label: "CLion", icon: SiClion },
        { label: "Visual Studio Code", icon: VscVscode },
        { label: "Visual Studio", icon: DiVisualstudio },
        { label: "Keil µVision 5", icon: SiMicrostation },
        { label: "Jupyter Notebook", icon: SiJupyter },
        { label: "Godot Engine", icon: SiGodotengine },
        { label: "Xilinx", icon: FaMicrochip },
      ],
    },
    {
      title: "Testing, Analysis & Modeling Tools",
      gradientClass: "from-[#05dafff8] via-purple-500 to-violet-600",
      items: [
        { label: "Selenium", icon: SiSelenium },
        { label: "Weka", icon: GiKiwiBird },
        { label: "FitNesse", icon: FaCompass },
        { label: "Visual Paradigm", icon: MdOutlineLayers },
        { label: "JUnit", icon: SiJunit5 },
      ],
    },
    {
      title: "Design & Other Software",
      gradientClass: "from-[#05dafff8] via-fuchsia-500 to-fuchsia-500",
      items: [
        { label: "Figma", icon: SiFigma },
        { label: "Photoshop", icon: SiAdobephotoshop },
        { label: "Lightroom", icon: SiAdobelightroom },
        { label: "MATLAB", icon: SiSqlite },
        { label: "VirtualBox", icon: SiVirtualbox },
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
              : "hover:border-[var(--dev-accent)]/45 hover:bg-[var(--dev-accent)]/10 hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
          }`}
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              link.blocked
                ? "bg-[var(--dev-accent)]/10 text-[var(--dev-accent)]/60"
                : "bg-[var(--dev-accent)]/15 text-[var(--dev-accent)] group-hover:bg-[var(--dev-accent)]/25"
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
              className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--dev-accent)]"
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
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-[var(--dev-accent)]/45 hover:bg-[var(--dev-accent)]/10 hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
        >
          <ChevronDown
            className={`absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform ${
              isYearsOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-bold text-[var(--dev-accent)] font-mono">9+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Years programming</p>
        </button>

        <button
          type="button"
          onClick={() => setIsCertificatesOpen((prev) => !prev)}
          aria-expanded={isCertificatesOpen}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-[var(--dev-accent)]/45 hover:bg-[var(--dev-accent)]/10 hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
        >
          <ChevronDown
            className={`absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform ${
              isCertificatesOpen ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-bold text-[#bc25e9] font-mono">3</span>
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
              isYearsOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
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
            <div className="relative rounded-lg border border-border/70 bg-card/42 px-3 py-3 pr-24">
              <p className="absolute right-6 top-1/2 inline-flex -translate-y-1/2 items-center rounded-full border border-[var(--dev-accent)]/35 bg-[var(--dev-accent)]/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-[var(--dev-accent)] shadow-[0_0_12px_rgba(var(--dev-accent-rgb),0.16)]">
                2018 - 2021
              </p>
              <p className="mt-1 text-[12px] font-medium text-foreground">
                I High School in Legnica
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Focus: Mathematics &amp; Computer Science
              </p>
            </div>

            <div className="rounded-lg border border-border/70 bg-card/42 px-3 py-3">
              <p className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,var(--dev-accent)_39%,#bc25e9_100%)] bg-clip-text text-[11px] font-semibold uppercase tracking-wide text-transparent opacity-98 drop-shadow-[0_0.5px_0.5px_rgba(var(--dev-accent-rgb),0.22)]">
                Wrocław University of Science and Technology
              </p>
              <div className="mt-2 space-y-2">
                <div className="relative rounded-md border border-border/60 bg-card px-2.5 py-2 pr-24">
                  <p className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center rounded-full border border-[var(--dev-accent)]/35 bg-[var(--dev-accent)]/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-[var(--dev-accent)] shadow-[0_0_12px_rgba(var(--dev-accent-rgb),0.16)]">
                    2021 - 2025
                  </p>
                  <p className="text-[11px] font-medium text-foreground">
                    Computer Engineering
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Bachelor&apos;s degree
                  </p>
                </div>
                <div className="relative rounded-md border border-border/60 bg-card px-2.5 py-2 pr-24">
                  <p className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center rounded-full border border-[var(--dev-accent)]/35 bg-[var(--dev-accent)]/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-[var(--dev-accent)] shadow-[0_0_12px_rgba(var(--dev-accent-rgb),0.16)]">
                    2025 - 2026
                  </p>
                  <p className="text-[11px] font-medium text-foreground">
                    Applied Computer Science
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
              isCertificatesOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
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
                    className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-card text-muted-foreground transition-colors hover:text-[var(--dev-accent)]"
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
          className={`group flex w-full items-center gap-4 px-5 py-3 text-left transition-all duration-300 hover:bg-[var(--dev-accent)]/10 ${
            isStackOpen ? "rounded-t-xl" : "rounded-xl"
          }`}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--dev-accent)]/15 text-[var(--dev-accent)] transition-colors group-hover:bg-[var(--dev-accent)]/25">
            <Layers className="size-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-foreground">Stack</span>
            <span className="text-[11px] text-muted-foreground">
              Technologies & tools
            </span>
          </div>
          <ChevronDown
            className={`ml-auto size-[18px] text-muted-foreground transition-transform ${
              isStackOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isStackOpen && (
          <div className="border-t border-border px-5 py-4">
            <div className="flex flex-col gap-3">
              {stackSections.map((section) => (
                <div key={section.title}>
                  <p
                    className={`mb-2 bg-gradient-to-r ${section.gradientClass} bg-clip-text text-[11px] font-semibold uppercase tracking-wide text-transparent opacity-92 drop-shadow-[0_0.5px_0.5px_rgba(var(--dev-accent-rgb),0.22)]`}
                  >
                    {section.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] text-foreground"
                      >
                        <item.icon
                          className={`text-muted-foreground ${
                            item.label === "C++" || item.label === "C#"
                              ? "size-[15px]"
                              : "size-3.5"
                          }`}
                        />
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

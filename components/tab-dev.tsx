"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, ExternalLink, Layers, X, Eye } from "lucide-react"
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
  SiMongodb,
  SiNintendogamecube,
  SiGithubactions,
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
    description: "Mobile app — work in progress",
    href: "#",
    icon: MdLocalAirport,
    blocked: true,
  },
]

type TabDevProps = {
  language: "en" | "pl"
  onOpenImagePreview: (imageSrc: string, imageAlt: string) => void
}

const devText = {
  en: {
    linkDescriptions: {
      github: "Projects & contributions",
      linkedin: "Profile & networking",
      travelAssistant: "AI trip planning assistant",
      hollowDepths: "Godot game project",
      renovationSystem: "Workflow management platform",
      tripify: "Mobile app — work in progress",
    },
    yearsProgramming: "Years programming",
    certificatesCount: "Certificates",
    education: "Education",
    closeEducation: "Close Education",
    schoolFocus: "Focus: Mathematics & Computer Science",
    schoolFocusShort: "Maths & Computer Science",
    bachelor: "Bachelor's degree",
    master: "Master's degree",
    certificates: "Certificates",
    closeCertificates: "Close Certificates",
    verifyPrefix: "Verify",
    previewPrefix: "Open preview",
    stackTitle: "Stack",
    stackSubtitle: "Technologies & tools",
    sectionTitles: {
      languages: "Languages & Core Technologies",
      frameworks: "Frameworks & Libraries",
      databases: "Databases, Cloud & DevOps",
      ides: "IDEs & Development Tools",
      testing: "Testing, Analysis & Modeling Tools",
      design: "Design & Other Software",
    },
  },
  pl: {
    linkDescriptions: {
      github: "Projekty i wkład",
      linkedin: "Profil i networking",
      travelAssistant: "AI asystent do planowania podróży",
      hollowDepths: "Projekt gry w Godot",
      renovationSystem: "Platforma do zarządzania procesem",
      tripify: "Aplikacja mobilna — już wkrótce",
    },
    yearsProgramming: "Lat programowania",
    certificatesCount: "Certyfikaty",
    education: "Edukacja",
    closeEducation: "Zamknij edukację",
    schoolFocus: "Profil: Matematyka & Informatyka",
    schoolFocusShort: "Matematyka & Informatyka",
    bachelor: "Studia inżynierskie",
    master: "Studia magisterskie",
    certificates: "Certyfikaty",
    closeCertificates: "Zamknij certyfikaty",
    verifyPrefix: "Zweryfikuj",
    previewPrefix: "Otwórz podgląd",
    stackTitle: "Stack",
    stackSubtitle: "Technologie i narzędzia",
    sectionTitles: {
      languages: "Języki i technologie bazowe",
      frameworks: "Frameworki i biblioteki",
      databases: "Bazy danych, chmura i DevOps",
      ides: "IDE i narzędzia developerskie",
      testing: "Testowanie, analiza i modelowanie",
      design: "Design i inne oprogramowanie",
    },
  },
} as const

export function TabDev({ language, onOpenImagePreview }: TabDevProps) {
  const YEARS_PRESS_DURATION_MS = 290
  const CERTIFICATES_PRESS_DURATION_MS = 290
  const STACK_PRESS_DURATION_MS = 300
  const [isStackOpen, setIsStackOpen] = useState(false)
  const [isYearsOpen, setIsYearsOpen] = useState(false)
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false)
  const [isYearsPressed, setIsYearsPressed] = useState(false)
  const [isCertificatesPressed, setIsCertificatesPressed] = useState(false)
  const [isStackPressed, setIsStackPressed] = useState(false)
  const yearsPressTimeoutRef = useRef<number | null>(null)
  const certificatesPressTimeoutRef = useRef<number | null>(null)
  const stackPressTimeoutRef = useRef<number | null>(null)
  const preloadedPreviewsRef = useRef(new Set<string>())

  const text = devText[language]

  useEffect(() => {
    return () => {
      if (yearsPressTimeoutRef.current !== null) {
        window.clearTimeout(yearsPressTimeoutRef.current)
      }
      if (certificatesPressTimeoutRef.current !== null) {
        window.clearTimeout(certificatesPressTimeoutRef.current)
      }
      if (stackPressTimeoutRef.current !== null) {
        window.clearTimeout(stackPressTimeoutRef.current)
      }
    }
  }, [])

  const triggerYearsPress = () => {
    setIsYearsPressed(true)
    if (yearsPressTimeoutRef.current !== null) {
      window.clearTimeout(yearsPressTimeoutRef.current)
    }
    yearsPressTimeoutRef.current = window.setTimeout(() => {
      setIsYearsPressed(false)
      yearsPressTimeoutRef.current = null
    }, YEARS_PRESS_DURATION_MS)
  }

  const triggerCertificatesPress = () => {
    setIsCertificatesPressed(true)
    if (certificatesPressTimeoutRef.current !== null) {
      window.clearTimeout(certificatesPressTimeoutRef.current)
    }
    certificatesPressTimeoutRef.current = window.setTimeout(() => {
      setIsCertificatesPressed(false)
      certificatesPressTimeoutRef.current = null
    }, CERTIFICATES_PRESS_DURATION_MS)
  }

  const triggerStackPress = () => {
    setIsStackPressed(true)
    if (stackPressTimeoutRef.current !== null) {
      window.clearTimeout(stackPressTimeoutRef.current)
    }
    stackPressTimeoutRef.current = window.setTimeout(() => {
      setIsStackPressed(false)
      stackPressTimeoutRef.current = null
    }, STACK_PRESS_DURATION_MS)
  }

  const preloadPreviewImage = (src: string) => {
    if (preloadedPreviewsRef.current.has(src)) return
    preloadedPreviewsRef.current.add(src)
    const image = new window.Image()
    image.decoding = "async"
    image.src = src
  }



  const stackSections = [
    {
      title: text.sectionTitles.languages,
      gradientClass: "from-[#05dafff8] via-#82d5f8 to-blue-500 via-78%",      items: [
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
      title: text.sectionTitles.frameworks,
            gradientClass: "from-[#05dafff8] to-[#8fa0ff] to-75%",
      items: [
        { label: "React", icon: SiReact },
        { label: "Spring Boot", icon: SiSpringboot },
        { label: "Vite", icon: SiVite },
        { label: "Next.js", icon: SiNextdotjs },
        { label: "JavaFX", icon: FaJava },
        { label: "OpenGL", icon: SiOpengl },
        { label: "Flask", icon: SiFlask },
        { label: "LLM APIs", icon: RiChatVoiceAiFill },
        { label: "TailwindCSS", icon: SiCss3 },
      ],
    },
    {
      title: "Mobile Development",
      gradientClass: "from-[#05dafff8] via-[#8fa0ff] to-violet-400 via-42%",      
      items: [
        { label: "React Native", icon: TbBrandReactNative },
        { label: "Expo", icon: SiExpo },
        { label: "Android Studio", icon: SiIntellijidea },
      ],
    },
    {
      title: text.sectionTitles.databases,
      gradientClass: "from-[#05dafff8] via-purple-500 to-violet-500 via-74%",      items: [
        { label: "PostgreSQL", icon: SiPostgresql },
        { label: "SQL", icon: TbSql },
        { label: "Firebase", icon: SiFirebase },
        { label: "AWS", icon: SiAmazonwebservices },
        { label: "Docker", icon: SiDocker },
        { label: "Terraform", icon: SiTerraform },
        { label: "Linux", icon: SiLinux },
        { label: "Git", icon: SiGit },
        { label: "Supabase", icon: SiSupabase },
        { label: "MongoDB", icon: SiMongodb },
        { label: "GitHub Actions", icon: SiGithubactions },
      ],
    },
    {
      title: text.sectionTitles.ides,
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
        { label: "Cursor", icon: SiNintendogamecube },
        { label: "GitHub Copilot", icon: IoLogoGithub },
      ],
    },
    {
      title: text.sectionTitles.testing,
      gradientClass: "from-[#05dafff8] to-[#a81ad3] to-70%",
      items: [
        { label: "Selenium", icon: SiSelenium },
        { label: "Weka", icon: GiKiwiBird },
        { label: "FitNesse", icon: FaCompass },
        { label: "Visual Paradigm", icon: MdOutlineLayers },
        { label: "JUnit", icon: SiJunit5 },
      ],
    },
    {
      title: text.sectionTitles.design,
      gradientClass: "from-[#05dafff8] to-[#a81ad3] to-49%",
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
      shortTitle: "Programming with JS", 
      issuer: "Meta",
      verifyUrl: "https://www.coursera.org/account/accomplishments/verify/DCEXTU27C4HO",
      image: "/images/meta2.png",
      logo: FaMeta,
    },
    {
      title: "Introduction to Mobile Development",
      shortTitle: "Intro to Mobile Dev",
      issuer: "Meta",
      verifyUrl: "https://www.coursera.org/account/accomplishments/verify/8OJJV1T21QI5",
      image: "/images/meta1.png",
      logo: FaMeta,
    },
    {
      title: "CCNA: Introduction to Networks",
      shortTitle: "Intro to Networks",
      issuer: "Cisco",
      verifyUrl:
        "https://www.credly.com/badges/9719de3d-0a39-41ad-b203-0c2f3cce6ab7/linked_in_profile",
      image: "/images/cisco.png",
      logo: SiCisco,
    },
  ]

  const localizedLinks = links.map((link) => {
    const descriptionMap = {
      GitHub: text.linkDescriptions.github,
      LinkedIn: text.linkDescriptions.linkedin,
      "Travel Assistant": text.linkDescriptions.travelAssistant,
      "Hollow Depths": text.linkDescriptions.hollowDepths,
      "Renovation System": text.linkDescriptions.renovationSystem,
      Tripify: text.linkDescriptions.tripify,
    } as const

    return {
      ...link,
      description: descriptionMap[link.label as keyof typeof descriptionMap] ?? link.description,
    }
  })

  const highSchoolName = {
  long:
    language === "pl"
      ? "I\u2009\u2009\u2009\u2009Liceum Ogólnokształcące w Legnicy"
      : "I\u2009\u2009\u2009\u2009High School in Legnica",
  short:
    language === "pl"
      ? "I\u2009\u2009\u2009\u2009Liceum w Legnicy" 
      : "I\u2009\u2009\u2009\u2009High School in Legnica", 
}
  const computerEngineeringLabel = language === "pl" ? "Informatyka Techniczna" : "Computer Engineering"
  const appliedComputerScienceLabel = language === "pl" ? "Informatyka Stosowana" : "Applied Computer Science"


  return (
    <div className="flex flex-col gap-3" style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      {localizedLinks.map((link) => (
        <a
          key={link.label}
          href={link.blocked ? undefined : link.href}
          target={link.blocked ? undefined : "_blank"}
          rel={link.blocked ? undefined : "noopener noreferrer"}
          aria-disabled={link.blocked}
          onClick={(e) => e.currentTarget.blur()}
          className={`group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 ${
            link.blocked
              ? "cursor-not-allowed border-border/70 bg-muted/15 opacity-100"
              : "[@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--dev-accent)]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--dev-accent)]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:border-[var(--dev-accent)]/45 active:bg-[var(--dev-accent)]/10 active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
          }`}
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              link.blocked
                ? "bg-[var(--dev-accent)]/10 text-[var(--dev-accent)]/60"
                : "bg-[var(--dev-accent)]/15 text-[var(--dev-accent)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[var(--dev-accent)]/25 group-active:bg-[var(--dev-accent)]/25"
            }`}
          >
            <link.icon className={link.label === "GitHub" ? "size-6" : "size-5"} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span
              className={`text-[12.58px] ${
                link.blocked ? "text-foreground/70" : "text-foreground"
              }`}
              style={{
                fontFamily:
                  'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                letterSpacing: '-0.02em',
                marginBottom: '0.1px',
                fontWeight: 510,
                fontVariationSettings: "'wght' 510",
              }}
            >
              {link.label}
            </span>
            <span
              className={`text-[11.43px] ${
                link.blocked ? "text-muted-foreground/70" : "text-muted-foreground"
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              {link.description}
            </span>
          </div>
          {link.blocked ? (
            <MdLock className="ml-auto size-4 text-muted-foreground/70" />
          ) : (
            <svg
              className="ml-auto size-4 text-muted-foreground transition-transform [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[var(--dev-accent)] group-active:translate-x-0.5 group-active:text-[var(--dev-accent)]"
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
          onClick={(e) => {
            triggerYearsPress()
            setIsYearsOpen((prev) => !prev)
            e.currentTarget.blur()
          }}
          aria-expanded={isYearsOpen}
          className={`group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--dev-accent)]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--dev-accent)]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:border-[var(--dev-accent)]/45 active:bg-[var(--dev-accent)]/10 active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] ${
            isYearsPressed
              ? "!border-[var(--dev-accent)]/45 !bg-[var(--dev-accent)]/10 !shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
              : ""
          }`}
        >
          <ChevronDown
            className={`absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform ${
              isYearsOpen ? "rotate-180" : ""
            }`}
          />
          <span
            className="text-[20.1px] text-[var(--dev-accent)]"
            style={{
              fontFamily:
                'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontWeight: 510,
              fontVariationSettings: "'wght' 510",
            }}
          >
            9+
          </span>
          <p className="mt-1 text-[11.43px] text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>{text.yearsProgramming}</p>
        </button>

        <button
          type="button"
          onClick={(e) => {
            triggerCertificatesPress()
            setIsCertificatesOpen((prev) => !prev)
            e.currentTarget.blur()
          }}
          aria-expanded={isCertificatesOpen}
          className={`group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--dev-accent)]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--dev-accent)]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:border-[var(--dev-accent)]/45 active:bg-[var(--dev-accent)]/10 active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] ${
            isCertificatesPressed
              ? "!border-[var(--dev-accent)]/45 !bg-[var(--dev-accent)]/10 !shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
              : ""
          }`}
        >
          <ChevronDown
            className={`absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform ${
              isCertificatesOpen ? "rotate-180" : ""
            }`}
          />
          <span
            className="text-[20.1px] text-[#a81ad3]"
            style={{
              fontFamily:
                'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontWeight: 510,
              fontVariationSettings: "'wght' 510",
            }}
          >
            3
          </span>
          <p className="mt-1 text-[11.43px] text-muted-foreground" style={{ letterSpacing: '-0.01em' }}>{text.certificatesCount}</p>
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
            className={`relative rounded-xl border border-border bg-card/90 px-4 py-4 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isYearsOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
          <button
            type="button"
            onClick={(e) => {
              setIsYearsOpen(false)
              e.currentTarget.blur()
            }}
            aria-label={text.closeEducation}
            className="absolute right-3 top-3 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:bg-card [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground active:bg-card active:text-foreground"
          >
            <X className="size-3.5" />
          </button>
          <p className="mb-3 text-[11.2px] font-semibold uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
            {text.education}
          </p>
          <div className="space-y-3">
            <div className="relative rounded-lg border border-border/70 bg-card/42 px-2.5 py-2 pr-24">
              <p
                className="absolute right-[22px] top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-[var(--dev-accent)]/35 bg-[var(--dev-accent)]/15 py-0.5 text-[9.5px] font-semibold tracking-wide text-[var(--dev-accent)] shadow-[0_0_12px_rgba(var(--dev-accent-rgb),0.16)] w-[74px] text-center"
                style={{ fontFamily: 'Montserrat, MontserratCustom, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
              >
                2018 - 2021
              </p>
              <p className="text-[11.45px] text-foreground" style={{ letterSpacing: '-0.055em', marginBottom: '2.4px', fontWeight: 510, fontVariationSettings: "'wght' 510", fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                <span className="sm:hidden">{highSchoolName.short}</span>
                <span className="hidden sm:inline">{highSchoolName.long}</span>
              </p>
              <p className="text-[10.95px] text-muted-foreground" style={{ letterSpacing: '-0.039em' }}>
                <span className="sm:hidden">{text.schoolFocusShort}</span>
                <span className="hidden sm:inline">{text.schoolFocus}</span>
              </p>
            </div>

            <div className="rounded-lg border border-border/70 bg-card/42 px-3 py-3">
              <p
                className={
                  (language === "pl"
                    ? "bg-[linear-gradient(to_right,var(--dev-accent)_0%,var(--dev-accent)_14%,#bc25e9_58%)]"
                    : "bg-[linear-gradient(to_right,var(--dev-accent)_0%,var(--dev-accent)_39%,#bc25e9_100%)]") +
                  " bg-clip-text text-[11.2px] font-semibold uppercase tracking-wide text-transparent opacity-98 drop-shadow-[0_0.5px_0.5px_rgba(var(--dev-accent-rgb),0.22)]"
                }
                style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', letterSpacing: '-0.01em' }}
              >
                <span className="sm:hidden">
                  {language === "pl" ? "Politechnika Wrocławska" : "Wrocław University of Science & Tech"}
                </span>
                <span className="hidden sm:inline">
                  {language === "pl" ? "Politechnika Wrocławska" : "Wrocław University of Science and Technology"}
                </span>              </p>
              <div className="mt-2 space-y-2">
                  <div className="relative rounded-md border border-border/60 bg-card px-2.5 py-2 pr-24">
                    <p
                      className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-[var(--dev-accent)]/35 bg-[var(--dev-accent)]/15 py-0.5 text-[9.5px] font-semibold tracking-wide text-[var(--dev-accent)] shadow-[0_0_12px_rgba(var(--dev-accent-rgb),0.16)] w-[74px] text-center"
                      style={{ fontFamily: 'Montserrat, MontserratCustom, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                    >
                      2021 - 2025
                    </p>
       
                  <p className="text-[11.6px] text-foreground" style={{ letterSpacing: '-0.054em', marginBottom: '1.3px', fontWeight: 510, fontVariationSettings: "'wght' 510", fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                    {computerEngineeringLabel}
                  </p>
                  <p className="text-[11.0px] text-muted-foreground" style={{ letterSpacing: '-0.039em' }}>
                    {text.bachelor}
                  </p>
                </div>
                <div className="relative rounded-md border border-border/60 bg-card px-2.5 py-2 pr-24">
                  <p
                    className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-[var(--dev-accent)]/35 bg-[var(--dev-accent)]/15 py-0.5 text-[9.5px] font-semibold tracking-wide text-[var(--dev-accent)] shadow-[0_0_12px_rgba(var(--dev-accent-rgb),0.16)] w-[74px] text-center"
                    style={{ fontFamily: 'Montserrat, MontserratCustom, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
                  >
                    2025 - 2026
                  </p>
                  <p className="text-[11.6px] text-foreground" style={{ letterSpacing: '-0.054em', marginBottom: '1.3px', fontWeight: 510, fontVariationSettings: "'wght' 510", fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                    {appliedComputerScienceLabel}
                  </p>
                  <p className="text-[11.0px] text-muted-foreground" style={{ letterSpacing: '-0.039em' }}>{text.master}</p>
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
            onClick={(e) => {
              setIsCertificatesOpen(false)
              e.currentTarget.blur()
            }}
            aria-label={text.closeCertificates}
            className="absolute right-3 top-3 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:bg-card [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground active:bg-card active:text-foreground"
          >
            <X className="size-3.5" />
          </button>
          <p className="mb-3 text-[11.2px] font-semibold uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
            {text.certificates}
          </p>
          <div className="flex flex-col gap-3">
            {certificates.map((certificate) => (
              <div
                key={certificate.title}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/42 px-3 py-[11.7px]"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <certificate.logo className="size-[21px] shrink-0 text-foreground" />
                  <div className="min-w-0">
                    <p className="truncate text-[11.3px] text-foreground" style={{ letterSpacing: '-0.03em', marginBottom: '0.19px', marginLeft: '0.8px', fontWeight: 510, fontVariationSettings: "'wght' 510", fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
                      <span className="sm:hidden">{certificate.shortTitle}</span>
                      <span className="hidden sm:inline">{certificate.title}</span>
                    </p>
                    <p className="text-[11.03px] text-muted-foreground" style={{ letterSpacing: '-0.01em', marginLeft: '0.8px' }}>{certificate.issuer}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${text.verifyPrefix} ${certificate.title}`}
                    className="inline-flex size-7.5 items-center justify-center rounded-md border border-border/70 bg-card text-muted-foreground transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-[var(--dev-accent)] active:text-[var(--dev-accent)]"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenImagePreview(certificate.image, `${certificate.title} preview`)
                    }
                    onPointerEnter={() => preloadPreviewImage(certificate.image)}
                    onFocus={() => preloadPreviewImage(certificate.image)}
                    onTouchStart={() => preloadPreviewImage(certificate.image)}
                    aria-label={`${text.previewPrefix} ${certificate.title}`}
                    className="relative group inline-flex h-7.5 w-11 overflow-hidden rounded-md border border-border/70"
                  >
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} preview`}
                      width={48}
                      height={32}
                      className="h-8 w-12 object-cover transition-[filter,opacity] duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:brightness-30 group-active:brightness-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-active:opacity-100">
                      <Eye className="size-4 text-[var(--dev-accent)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div
        className={`border bg-card backdrop-blur-xl transition-[background-color,border-color,color,box-shadow] duration-300 ${
          isStackOpen
            ? "rounded-xl border-border"
            : "rounded-xl border-border [@media(hover:hover)_and_(pointer:fine)]:hover:border-[var(--dev-accent)]/45 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--dev-accent)]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:border-[var(--dev-accent)]/45 active:bg-[var(--dev-accent)]/10 active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
        } ${
          isStackPressed
            ? "!border-[var(--dev-accent)]/65 !bg-[var(--dev-accent)]/10 !shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
            : ""
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            triggerStackPress()
            setIsStackOpen((prev) => !prev)
            e.currentTarget.blur()
          }}
          className={`group flex w-full items-center gap-4 px-5 py-3 text-left transition-[background-color,border-color,color,box-shadow] duration-300 ${
            isStackOpen
              ? "rounded-t-xl [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--dev-accent)]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)] active:bg-[var(--dev-accent)]/10 active:shadow-[0_0_20px_rgba(var(--dev-accent-rgb),0.18)]"
              : "rounded-xl"
          }`}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--dev-accent)]/15 text-[var(--dev-accent)] transition-colors [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-[var(--dev-accent)]/25 group-active:bg-[var(--dev-accent)]/25">
            <Layers className="size-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-foreground">{text.stackTitle}</span>
            <span className="text-[11px] text-muted-foreground">
              {text.stackSubtitle}
            </span>
          </div>
          <ChevronDown
            className={`ml-auto size-[18px] text-muted-foreground transition-transform ${
              isStackOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isStackOpen && (
          <div className="border-t border-border px-5 py-4 rounded-b-xl">
            <div className="flex flex-col gap-3">
              {stackSections.map((section) => (
                <div key={section.title}>
                  <p
                    className={`mb-2 bg-gradient-to-r ${section.gradientClass} bg-clip-text text-[11.2px] font-semibold uppercase tracking-wide text-transparent opacity-92 drop-shadow-[0_0.5px_0.5px_rgba(var(--dev-accent-rgb),0.22)]`}
                    style={{ fontFamily: 'Monorale, Raleway, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', letterSpacing: '-0.01em' }}
                  >
                    {section.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[10.7px] text-foreground"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                          <item.icon
                            className={`text-muted-foreground ${
                              [
                                "C++",
                                "C#",
                                "JavaScript",
                                "TypeScript",
                                "Python",
                                "C",
                                "HTML5",
                                "Assembly",
                                "CSS3",
                                "Vite",
                                "Expo",
                                "Flask",
                                "Terraform",
                                "Linux",
                                "Supabase",
                                "IntelliJ IDEA",
                                "PyCharm",
                                "CLion",
                                "Xilinx",
                                "JUnit",
                                "VirtualBox",
                                "GitHub Copilot"
                              ].includes(item.label)
                                ? "size-[12.5px]"
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

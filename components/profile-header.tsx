import { Logo } from "@/components/logo"
import { HiLocationMarker } from "react-icons/hi"
import Image from "next/image" // 1. IMPORT KOMPONENTU IMAGE
import avatarImg from "@/public/images/avatar9.jpeg" // 2. STATYCZNY IMPORT OBRAZKA (jeśli wywali błąd ścieżki, użyj: "../public/images/avatar8.jpeg")

type ProfileHeaderProps = {
  language: "en" | "pl"
}

export function ProfileHeader({ language }: ProfileHeaderProps) {
  const roleText = language === "pl" ? "Developer" : "Developer"
  const producerText = language === "pl" ? "Producent" : "Producer"

  return (
    <header className="flex flex-col items-center gap-2">
      <Logo />

      <div className="relative mb-[1px] group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-500 blur-md opacity-75 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative w-[143px] h-[143px] rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-purple-500 to-fuchsia-500" style={{ boxShadow: '0 0 40px -10px rgba(6, 182, 212, 0.5), 0 0 40px -10px rgba(217, 70, 239, 0.5)' }}>
          <Image
            src={avatarImg}
            alt="Mateusz Staszków profile photo"
            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-950"
            priority={true}
            quality={95}
            sizes="(max-width: 768px) 370px, 400px"
            placeholder="blur"
          />
        </div>
      </div>

      <div className="text-center flex flex-col items-center gap-[2px]">
        <h1 className="text-[19.46025px] custom-name tracking-tight text-slate-900 dark:text-white mb-[3px]">
          Mateusz Staszk&oacute;w
        </h1>
        <p
          className="text-xs role-smaller font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 uppercase"
          style={{ fontFamily: 'Monorale, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
        >
          {roleText} <span className="text-slate-400 dark:text-slate-400 mx-2">x</span> {producerText}
        </p>
        <div className="flex items-center justify-center mt-[5.9px] text-[14.4px] text-slate-500 dark:text-slate-400 location-sans">
          <HiLocationMarker className="mr-2 mb-[1.65px] text-[7.8px] shrink-0 translate-y-[0.4px]" aria-hidden="true" />
          WROCŁAW, PL
        </div>
      </div>
    </header>
  )
}

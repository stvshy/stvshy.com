import { Logo } from "@/components/logo"

export function ProfileHeader() {
  return (
    <header className="flex flex-col items-center gap-3">
      <Logo />

      <div className="relative mb-2 group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-500 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-purple-500 to-fuchsia-500" style={{ boxShadow: '0 0 40px -10px rgba(6, 182, 212, 0.5), 0 0 40px -10px rgba(217, 70, 239, 0.5)' }}>
          <img
            src="/images/avatar.jpg"
            alt="Mateusz Staszków profile photo"
            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-950"
          />
        </div>
      </div>

      <div className="text-center mb-2 flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
          Mateusz Staszk&oacute;w
        </h1>
        <p className="text-sm font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 uppercase">
          Developer <span className="text-slate-400 dark:text-slate-400 mx-2">x</span> Producer
        </p>
        <div className="flex items-center justify-center mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span className="material-icons text-[10px] mr-1">location_on</span>
          Wrocław, PL
        </div>
      </div>
    </header>
  )
}

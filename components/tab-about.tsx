"use client"

import { useState } from "react"
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"
import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type TabAboutProps = {
  onOpenImagePreview: (imageSrc: string, imageAlt: string) => void
}

export function TabAbout({ onOpenImagePreview }: TabAboutProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card px-5 pt-3.5 pb-5 backdrop-blur-xl" lang="en">
        <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
          Based in <span className="text-foreground font-medium">Wroc&#322;aw, Poland</span>. I navigate between code and sound, creating projects that feel personal. I focus on designing intuitive experiences that truly resonate. I believe that great software and great tracks share the same foundation — attention to detail and creativity.
        </p>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <div className="mt-3 space-y-3">
              <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
                I am committed to continuous self-improvement, broadening my horizons by learning and traveling to understand diverse perspectives and cultures. My goal is to visit every country in the world, driven by a restless desire to constantly explore the unknown.
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
                When I’m not traveling or creating, you can find me cheering for FC Barcelona, watching Polish fighters in the UFC, or expanding my perfume collection.
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground text-justify [hyphens:auto] [-webkit-hyphens:auto] [-ms-hyphens:auto]">
                Over the last few years, I’ve gravitated towards the atmospheric sounds of Wave and Phonk, drawing major inspiration from them for my own work. However, my playlist knows no boundaries. I also listen to plenty of Hip-Hop and other electronic music, constantly discovering new sounds and refusing to limit myself to just one style.
              </p>
            </div>
          </CollapsibleContent>

          <div className="mt-0.5 mb-[-14px] flex justify-center">
            <CollapsibleTrigger asChild>
              <button
                className="-m-4 inline-flex cursor-pointer items-center justify-center rounded-full p-4 text-foreground/70 transition-colors hover:text-foreground"
                type="button"
                aria-label={isOpen ? "Collapse bio" : "Expand bio"}
              >
                {isOpen ? <BsChevronCompactUp className="h-4.5 w-4.5" /> : <BsChevronCompactDown className="h-4.5 w-4.5" />}
              </button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOpenImagePreview("/images/tripify-map.jpg", "Tripify map")}
          className="group relative rounded-xl border border-border bg-card px-4 py-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/10 hover:shadow-[0_0_20px_rgba(240,240,240,0.08)]"
          aria-label="Open countries map preview"
        >
          <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          <span className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,#8b60e8_40%,#8b60e8_60%,#b817e4_100%)] bg-clip-text text-xl font-bold text-transparent font-mono">
            28
          </span>
          <p className="mt-1 text-[11px] text-muted-foreground">Countries visited</p>
        </button>

        <a
          href="https://www.fragrantica.pl/uzytkownicy/34655"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/10 hover:shadow-[0_0_20px_rgba(240,240,240,0.08)]"
          aria-label="Open Fragrantica profile"
        >
          <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          <span className="bg-[linear-gradient(to_right,var(--dev-accent)_0%,#8b60e8_40%,#8b60e8_60%,#b817e4_100%)] bg-clip-text text-xl font-bold text-transparent font-mono">
            30
          </span>
          <p className="mt-1 text-[11px] text-muted-foreground">Perfumes owned</p>
        </a>
      </div>

    </div>
  )
}

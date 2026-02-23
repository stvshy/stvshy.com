"use client"

import { Mail } from "lucide-react"
import { MeshGradient } from "@/components/mesh-gradient"
import { ProfileHeader } from "@/components/profile-header"
import { TabMusic } from "@/components/tab-music"
import { TabDev } from "@/components/tab-dev"
import { TabAbout } from "@/components/tab-about"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="relative flex min-h-svh flex-col items-center bg-background">
      <MeshGradient />

      <div className="page-scale-desktop relative z-10 flex w-full max-w-md flex-col gap-8 px-5 py-12 pb-8">
        <ProfileHeader />

        {/* Navigation Tabs */}
        <Tabs defaultValue="about" className="w-full -mt-[10px]">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-xl border border-border">
            <TabsTrigger
              value="dev"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-neon-magenta/10 data-[state=active]:text-neon-magenta data-[state=active]:shadow-none data-[state=inactive]:hover:bg-background/10 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-muted-foreground/70"
            >
              <img
                src="/images/dev-icon3-4.png"
                alt="Dev icon"
                className="mr-1.5 size-4"
              />
              Dev
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-background/10 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-muted-foreground/70"
            >
              <img
                src="/images/about-icon5.png"
                alt="About icon"
                className="mr-1.5 size-4"
              />
              About
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-[#b817e4]/10 data-[state=active]:text-[#b817e4] data-[state=active]:shadow-none data-[state=inactive]:hover:bg-background/10 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-muted-foreground/70"
            >
              <img
                src="/images/music-icon2.png"
                alt="Music note"
                className="mr-1.5 size-4"
              />
              Music
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dev" className="mt-1">
            <TabDev />
          </TabsContent>
          <TabsContent value="about" className="mt-1">
            <TabAbout />
          </TabsContent>
          <TabsContent value="music" className="mt-1">
            <TabMusic />
          </TabsContent>
        </Tabs>

        {/* Contact Button */}
        <Button
          asChild
          className="w-full rounded-xl border border-border bg-card text-sm text-foreground backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/30 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:shadow-[0_0_20px_rgba(0,242,234,0.1)]"
          size="lg"
        >
          <a href="mailto:hello@stvshy.com">
            <Mail className="size-4" />
            Contact Me
          </a>
        </Button>

        {/* Footer */}
        <footer className="text-center -mt-1 -mb-1">
          <p className="text-[11px] text-muted-foreground/50">
            {"© 2026 stvshy. All rights reserved."}
          </p>
        </footer>
      </div>
    </main>
  )
}

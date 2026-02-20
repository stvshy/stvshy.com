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

      <div className="relative z-10 flex w-full max-w-md flex-col gap-8 px-5 py-12 pb-8">
        <ProfileHeader />

        {/* Navigation Tabs */}
        <Tabs defaultValue="music" className="w-full -mt-[10px]">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 backdrop-blur-xl border border-border">
            <TabsTrigger
              value="music"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-neon-cyan/10 data-[state=active]:text-neon-cyan data-[state=active]:shadow-none data-[state=inactive]:hover:bg-foreground/5 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-foreground/70"
            >
              <span aria-hidden="true" className="mr-1.5">{"🎵"}</span>
              Music
            </TabsTrigger>
            <TabsTrigger
              value="dev"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-neon-magenta/10 data-[state=active]:text-neon-magenta data-[state=active]:shadow-none data-[state=inactive]:hover:bg-foreground/5 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-foreground/70"
            >
              <span aria-hidden="true" className="mr-1.5">{"💻"}</span>
              Dev
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-foreground/5 data-[state=inactive]:hover:border-border data-[state=inactive]:hover:text-foreground/70"
            >
              <span aria-hidden="true" className="mr-1.5">{"👤"}</span>
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="mt-1">
            <TabMusic />
          </TabsContent>
          <TabsContent value="dev" className="mt-1">
            <TabDev />
          </TabsContent>
          <TabsContent value="about" className="mt-1">
            <TabAbout />
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

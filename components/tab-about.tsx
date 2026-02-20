export function TabAbout() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card px-5 py-5 backdrop-blur-xl">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Based in <span className="text-foreground font-medium">Wroc&#322;aw, Poland</span>. 
          I blend code and sound to build immersive digital experiences. 
          By day I ship products as a developer, by night I craft beats and melodies 
          that push creative boundaries.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span className="text-xl font-bold text-neon-cyan font-mono">5+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Years producing</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span className="text-xl font-bold text-neon-magenta font-mono">50+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Tracks released</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span className="text-xl font-bold text-neon-cyan font-mono">3+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Years in dev</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-4 backdrop-blur-xl">
          <span className="text-xl font-bold text-neon-magenta font-mono">10+</span>
          <p className="mt-1 text-[11px] text-muted-foreground">Projects shipped</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card px-5 py-4 backdrop-blur-xl">
        <h3 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-3">
          Genres
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Trap", "Lo-fi", "Ambient", "Phonk", "Electronic"].map((genre) => (
            <span
              key={genre}
              className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] text-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

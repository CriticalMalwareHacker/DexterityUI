import { DottedSurface } from "@/components/dotted-surface";
import { HeroContent } from "@/components/hero-content";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <DottedSurface className="absolute inset-0" />
      {/* Top Shades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[70%] bg-[radial-gradient(60%_80%_at_50%_0%,--theme(--color-foreground/.18),transparent)]"
      />

      <section className="relative z-10 mx-auto w-full max-w-5xl">
        <HeroContent />
      </section>
    </div>
  );
}

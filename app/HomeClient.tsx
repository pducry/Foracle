"use client";

import { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FontGrid } from "@/components/FontGrid";
import { CuratedSection } from "@/components/CuratedSection";
import { DiscoveriesSection } from "@/components/DiscoveriesSection";
import { SourcesMarquee } from "@/components/SourcesMarquee";
import { FontPreview } from "@/components/FontPreview";
import { Font } from "@/lib/types";
import { DISCOVERIES } from "@/lib/discoveries";

type HomeClientProps = {
  fonts: Font[];
};

export function HomeClient({ fonts }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [previewText, setPreviewText] = useState("");
  const { resolvedTheme } = useTheme();

  const filtered = useMemo(() => {
    if (!search) return fonts;
    const lower = search.toLowerCase();
    return fonts.filter((f) => f.family.toLowerCase().includes(lower));
  }, [fonts, search]);

  // First two discoveries for the hero split
  const heroDiscoveries = useMemo(() => {
    return DISCOVERIES.slice(0, 2).map((d) => ({
      discovery: d,
      font: fonts.find((f) => f.id === d.id),
    })).filter((d) => d.font) as { discovery: typeof DISCOVERIES[0]; font: Font }[];
  }, [fonts]);

  return (
    <>
      <Header onSearch={setSearch} />

      <main id="main-content">
        {/* First viewport — split layout */}
        <section className="min-h-[calc(100vh-56px)] grid grid-cols-1 lg:grid-cols-2">
          {/* Left — branding + value prop */}
          <div className="flex flex-col justify-center px-8 lg:px-14 py-16 lg:py-20">
            <img
              src={resolvedTheme === "light" ? "/logo-black.png" : "/foracle-logo.png"}
              alt="Foracle"
              className="h-12 md:h-16 lg:h-20 w-fit"
            />
            <p className="mt-6 text-xl md:text-2xl text-[var(--color-text-primary)]/60 tracking-tight">
              A curated collection of the best free fonts
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md leading-relaxed">
              A living curation powered by the collaboration between human taste
              and artificial intelligence. Community signals, typographic principles,
              and real-world adoption shape every recommendation.
            </p>

            {/* Sources marquee inline */}
            <div className="mt-10">
              <SourcesMarquee />
            </div>
          </div>

          {/* Right — featured discoveries */}
          <div className="flex flex-col border-l border-[var(--color-border)]">
            {heroDiscoveries.map((d, i) => (
              <Link
                key={d.discovery.id}
                href={`/font/${d.font.id}`}
                className={`flex-1 flex flex-col justify-between px-8 lg:px-12 py-10
                  hover:bg-[var(--color-bg-secondary)] transition-colors
                  ${i > 0 ? "border-t border-[var(--color-border)]" : ""}`}
              >
                {/* Font preview */}
                <div className="flex-1 flex items-center">
                  <FontPreview
                    family={d.font.family}
                    text={d.font.family}
                    weight={d.font.variants.includes("700") ? 700 : 400}
                    weights={[d.font.variants.includes("700") ? 700 : 400]}
                    className="text-5xl lg:text-6xl"
                  />
                </div>

                {/* Info */}
                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                    {d.discovery.foundry}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {d.discovery.headline}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-md">
                    {d.discovery.objective}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-xs text-[var(--color-text-muted)]">{d.font.variants.length} styles</span>
                    {d.font.variable && (
                      <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                        Variable
                      </span>
                    )}
                    <span className="ml-auto text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Rest of discoveries */}
        <div className="px-6 lg:px-10">
          <DiscoveriesSection fonts={fonts} skipFirst={2} />
        </div>

        {/* Divider */}
        <div className="mx-6 lg:mx-10 border-t border-[var(--color-border)]" />

        {/* Editor's Picks */}
        <div className="px-6 lg:px-10">
          <CuratedSection fonts={fonts} />
        </div>

        {/* Divider */}
        <div className="mx-6 lg:mx-10 border-t border-[var(--color-border)]" />

        {/* Explore all */}
        <div className="px-6 lg:px-10">
          <section className="pt-10 pb-4">
            <h2 className="text-base font-semibold mb-1">Explore all fonts</h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xl">
              Drag one font onto another to instantly test a pairing. Every card is draggable — just grab, drop, and see them together.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Type your text here..."
                className="flex-1 px-4 py-2.5 bg-transparent border-b border-[var(--color-border)]
                  text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                  focus:outline-none focus:border-[var(--color-text-secondary)]
                  transition-colors text-sm"
              />
            </div>
          </section>

          {/* Font grid */}
          <section className="pb-16">
            <FontGrid
              fonts={filtered}
              query={search}
              previewText={previewText}
            />
          </section>
        </div>
      </main>
    </>
  );
}

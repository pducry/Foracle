"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Font } from "@/lib/types";
import { DISCOVERIES, Discovery } from "@/lib/discoveries";
import { FontPreview } from "./FontPreview";
import { SourcesMarquee } from "./SourcesMarquee";

type DiscoveriesSectionProps = {
  fonts: Font[];
  resolvedTheme?: string;
};

function DiscoveryCard({
  discovery,
  font,
}: {
  discovery: Discovery;
  font: Font;
}) {
  return (
    <div className="group border border-[var(--color-border)] rounded-2xl overflow-hidden
      hover:border-[var(--color-text-muted)] transition-all">
      <Link href={`/font/${font.id}`} className="block">
        <div className="px-10 pt-14 pb-8 min-h-[280px] flex items-end">
          <FontPreview
            family={font.family}
            text={font.family}
            weight={font.variants.includes("700") ? 700 : 400}
            weights={[font.variants.includes("700") ? 700 : 400]}
            className="text-6xl lg:text-7xl"
          />
        </div>
      </Link>

      <div className="px-10 pb-10 space-y-4 border-t border-[var(--color-border)]">
        <div className="pt-8">
          <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
            {discovery.foundry}
          </div>
          <h3 className="text-xl font-bold tracking-tight leading-tight">
            {discovery.headline}
          </h3>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {discovery.objective}
        </p>

        <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Why this font matters</div>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            {discovery.whySpecial}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Best for</div>
            <p className="text-xs text-[var(--color-text-muted)]">{discovery.context}</p>
          </div>
          <div className="text-right text-[10px] text-[var(--color-text-muted)] shrink-0">
            <div>{font.variants.length} styles</div>
            {font.variable && <div className="mt-0.5">Variable</div>}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href={`/font/${font.id}`}
            className="px-5 py-2.5 rounded-xl text-sm font-medium
              bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] transition-colors"
          >
            Explore
          </Link>
          <a
            href={`https://fonts.google.com/specimen/${font.family.replace(/ /g, "+")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm
              border border-[var(--color-border)] text-[var(--color-text-secondary)]
              hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Get Font
          </a>
          <Link
            href={`/pair?heading=${font.id}`}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm
              border border-[var(--color-border)] text-[var(--color-text-secondary)]
              hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
              <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
            </svg>
            Pair
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DiscoveriesSection({ fonts, resolvedTheme }: DiscoveriesSectionProps) {
  const discoveries = useMemo(() => {
    return DISCOVERIES.map((d) => ({
      discovery: d,
      font: fonts.find((f) => f.id === d.id),
    })).filter((d) => d.font) as { discovery: Discovery; font: Font }[];
  }, [fonts]);

  if (discoveries.length === 0) return null;

  return (
    <section className="pt-20 lg:pt-28 pb-12">
      {/* Logo + Title — one cohesive block */}
      <div className="text-center mb-10">
        <img
          src={resolvedTheme === "light" ? "/logo-black.png" : "/foracle-logo.png"}
          alt="Foracle"
          className="h-12 md:h-16 lg:h-20 mx-auto mb-8"
        />
        <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Fonts worth knowing — a curated collection of the best free fonts, powered by
          the collaboration between human taste and AI. Each one selected for technical
          excellence, community signals, and untapped potential. Updated continuously.
        </p>
      </div>

      {/* Sources marquee */}
      <div className="mb-16 -mx-6 lg:-mx-10">
        <SourcesMarquee />
      </div>

      {/* All discoveries — same format, two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {discoveries.map((d) => (
          <DiscoveryCard
            key={d.discovery.id}
            discovery={d.discovery}
            font={d.font}
          />
        ))}
      </div>
    </section>
  );
}

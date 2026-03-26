"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Font } from "@/lib/types";
import { DISCOVERIES, Discovery } from "@/lib/discoveries";
import { FontPreview } from "./FontPreview";

type DiscoveriesSectionProps = {
  fonts: Font[];
  skipFirst?: number;
};

function DiscoveryCard({
  discovery,
  font,
  index,
}: {
  discovery: Discovery;
  font: Font;
  index: number;
}) {
  const isLarge = index < 2;

  return (
    <div className={`group border border-[var(--color-border)] rounded-2xl overflow-hidden
      hover:border-[var(--color-text-muted)] transition-all ${isLarge ? "col-span-2" : ""}`}
    >
      {/* Font preview — hero area */}
      <Link href={`/font/${font.id}`} className="block">
        <div className={`px-10 flex items-center ${isLarge ? "min-h-[360px] py-16" : "min-h-[280px] py-12"}`}>
          <FontPreview
            family={font.family}
            text={font.family}
            weight={font.variants.includes("700") ? 700 : 400}
            weights={[font.variants.includes("700") ? 700 : 400]}
            className={`${isLarge ? "text-6xl lg:text-7xl" : "text-4xl lg:text-5xl"}`}
          />
        </div>
      </Link>

      {/* Info area */}
      <div className="px-10 pb-10 space-y-4 border-t border-[var(--color-border)]">
        {/* Headline + foundry */}
        <div className="pt-8">
          <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
            {discovery.foundry}
          </div>
          <h3 className={`font-bold tracking-tight leading-tight ${isLarge ? "text-2xl" : "text-xl"}`}>
            {discovery.headline}
          </h3>
        </div>

        {/* Objective */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {discovery.objective}
        </p>

        {/* Why special — detailed */}
        <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Why this font matters</div>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            {discovery.whySpecial}
          </p>
        </div>

        {/* Context + metadata */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Best for</div>
            <p className="text-xs text-[var(--color-text-muted)]">{discovery.context}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right text-[10px] text-[var(--color-text-muted)]">
              <div>{font.variants.length} styles</div>
              {font.variable && <div className="mt-0.5">Variable</div>}
            </div>
          </div>
        </div>

        {/* Actions */}
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

export function DiscoveriesSection({ fonts, skipFirst = 0 }: DiscoveriesSectionProps) {
  const discoveries = useMemo(() => {
    return DISCOVERIES.slice(skipFirst).map((d) => ({
      discovery: d,
      font: fonts.find((f) => f.id === d.id),
    })).filter((d) => d.font) as { discovery: Discovery; font: Font }[];
  }, [fonts, skipFirst]);

  if (discoveries.length === 0) return null;

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-4">
          Undiscovered
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Fonts worth knowing
        </h2>
        <p className="mt-4 text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          High-quality typefaces that haven't reached the mainstream yet.
          Each one selected for technical excellence, unique character, and untapped potential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {discoveries.map((d, i) => (
          <DiscoveryCard
            key={d.discovery.id}
            discovery={d.discovery}
            font={d.font}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

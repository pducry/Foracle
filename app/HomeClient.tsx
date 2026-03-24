"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FontGrid } from "@/components/FontGrid";
import { CuratedSection } from "@/components/CuratedSection";
import { SourcesMarquee } from "@/components/SourcesMarquee";
import { Font, Category, CATEGORY_LABELS } from "@/lib/types";

type HomeClientProps = {
  fonts: Font[];
};

export function HomeClient({ fonts }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [previewText, setPreviewText] = useState("");

  const filtered = useMemo(() => {
    let result = fonts;

    if (category) {
      result = result.filter((f) => f.category === category);
    }

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((f) =>
        f.family.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [fonts, search, category]);

  return (
    <>
      <Header onSearch={setSearch} />

      <main id="main-content">
        {/* Hero — centered, generous spacing, typographic contrast */}
        <section className="text-center py-20 lg:py-28 px-6">
          <img
            src="/foracle-logo.png"
            alt="Foracle"
            className="h-16 md:h-20 lg:h-24 mx-auto"
          />
          <p className="mt-6 text-xl md:text-2xl text-[var(--color-text-primary)]/60 tracking-tight">
            A curated collection of the best free fonts
          </p>
          <p className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            A living curation of free fonts, powered by the collaboration
            between human taste and artificial intelligence. Community signals,
            typographic principles, and real-world adoption shape every recommendation.
          </p>
        </section>

        {/* Sources marquee — tight to hero */}
        <div className="-mt-10 lg:-mt-14">
          <SourcesMarquee />
        </div>

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
              categoryLabel={category ? CATEGORY_LABELS[category] : undefined}
              previewText={previewText}
            />
          </section>
        </div>
      </main>
    </>
  );
}

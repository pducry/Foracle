"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FontGrid } from "@/components/FontGrid";
import { CuratedSection } from "@/components/CuratedSection";
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
      <Header
        onSearch={setSearch}
        showFilters
        selectedCategory={category}
        onCategorySelect={setCategory}
      />

      <main id="main-content" className="px-6 lg:px-10">
        {/* Value prop */}
        <section className="pt-10 pb-2">
          <h1 className="text-lg font-semibold tracking-tight">
            Truly free fonts for your designs
          </h1>
          <p className="mt-1 text-[var(--color-text-muted)] text-sm max-w-2xl">
            A curated selection of {fonts.length} free fonts to help you make better design decisions.
          </p>
        </section>

        {/* Editor's Picks */}
        <CuratedSection fonts={fonts} />

        {/* Divider */}
        <div className="border-t border-[var(--color-border)]" />

        {/* Preview text input */}
        <section className="pt-10 pb-4">
          <h2 className="text-base font-semibold mb-1">Explore all fonts</h2>
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
      </main>
    </>
  );
}

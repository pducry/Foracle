"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { FilterPills } from "@/components/FilterPills";
import { FontGrid } from "@/components/FontGrid";
import { Font, Category, CATEGORY_LABELS } from "@/lib/types";

type HomeClientProps = {
  fonts: Font[];
};

export function HomeClient({ fonts }: HomeClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

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

      <main id="main-content" className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Font Oracle
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)] text-base">
            Discover, compare, and pair {fonts.length.toLocaleString()}+ free
            fonts
          </p>
        </section>

        {/* Filter pills */}
        <section className="pb-8">
          <FilterPills selected={category} onSelect={setCategory} />
        </section>

        {/* Font grid */}
        <section className="pb-16">
          <FontGrid
            fonts={filtered}
            query={search}
            categoryLabel={category ? CATEGORY_LABELS[category] : undefined}
          />
        </section>
      </main>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { Header } from "@/components/Header";
import { FontGrid } from "@/components/FontGrid";
import { CuratedSection } from "@/components/CuratedSection";
import { DiscoveriesSection } from "@/components/DiscoveriesSection";
import { Font } from "@/lib/types";

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

  return (
    <>
      <Header onSearch={setSearch} />

      <main id="main-content">
        {/* Discoveries — logo integrated */}
        <div className="px-6 lg:px-10">
          <DiscoveriesSection fonts={fonts} resolvedTheme={resolvedTheme} />
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

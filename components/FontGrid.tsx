"use client";

import { useState, useEffect } from "react";
import { Font } from "@/lib/types";
import { FontCard } from "./FontCard";

const PAGE_SIZE = 36;

type FontGridProps = {
  fonts: Font[];
  query?: string;
  categoryLabel?: string;
  previewText?: string;
};

export function FontGrid({ fonts, query, categoryLabel, previewText }: FontGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [fonts]);

  const showMore = () => setVisible((v) => v + PAGE_SIZE);
  const hasMore = visible < fonts.length;

  if (fonts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-text-secondary)] text-lg">
          {query
            ? `No fonts found for "${query}"`
            : categoryLabel
              ? `No ${categoryLabel} fonts found`
              : "No fonts found"}
        </p>
        <p className="text-[var(--color-text-muted)] text-sm mt-2">
          Try clearing your search or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {fonts.slice(0, visible).map((font) => (
          <FontCard key={font.id} font={font} previewText={previewText} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2.5 rounded-lg text-sm font-medium
              bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]
              hover:text-[var(--color-text-primary)] border border-[var(--color-border)]
              hover:border-[var(--color-text-muted)] transition-colors"
          >
            Load more fonts ({fonts.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [draggingFont, setDraggingFont] = useState<Font | null>(null);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [fonts]);

  const showMore = () => setVisible((v) => v + PAGE_SIZE);
  const hasMore = visible < fonts.length;

  const handleDragStart = useCallback((e: DragEvent) => {
    const fontId = (e.target as HTMLElement)?.closest("[data-font-id]")?.getAttribute("data-font-id");
    if (fontId) {
      const font = fonts.find((f) => f.id === fontId);
      if (font) setDraggingFont(font);
    }
  }, [fonts]);

  const handleDragEnd = useCallback(() => {
    setDraggingFont(null);
  }, []);

  useEffect(() => {
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragend", handleDragEnd);
    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, [handleDragStart, handleDragEnd]);

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
      {draggingFont && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] animate-in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
            <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
          </svg>
          Drop <strong className="text-[var(--color-text-primary)]">{draggingFont.family}</strong> onto another font to pair them
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {fonts.slice(0, visible).map((font) => (
          <div key={font.id} data-font-id={font.id}>
            <FontCard font={font} previewText={previewText} draggingFont={draggingFont} />
          </div>
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

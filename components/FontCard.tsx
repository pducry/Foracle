"use client";

import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { FontPreview } from "./FontPreview";

type FontCardProps = {
  font: Font;
  previewText?: string;
};

function getDefaultWeight(font: Font): number {
  const numericWeights = font.variants
    .map((v) => parseInt(v.replace("italic", ""), 10))
    .filter((w) => !isNaN(w));
  if (numericWeights.includes(400)) return 400;
  return numericWeights[0] ?? 400;
}

export function FontCard({ font, previewText }: FontCardProps) {
  const weight = getDefaultWeight(font);
  const displayText = previewText || font.family;

  return (
    <Link
      href={`/font/${font.id}`}
      className="group block border border-[var(--color-border)]
        hover:bg-[var(--color-bg-secondary)] transition-colors"
    >
      <div className="px-4 pt-3">
        <span className="text-[11px] text-[var(--color-text-muted)]">
          {font.family}
        </span>
      </div>

      <div className="px-6 py-8 flex items-center justify-center min-h-[140px]">
        <FontPreview
          family={font.family}
          text={displayText}
          weight={weight}
          className="text-4xl lg:text-5xl text-[var(--color-text-primary)] text-center"
        />
      </div>

      <div className="px-4 pb-3 flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
        <span>{CATEGORY_LABELS[font.category]}</span>
        <span>·</span>
        <span>{font.variants.length} styles</span>
        {font.variable && (
          <span className="ml-auto px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px] uppercase tracking-wider">
            variable
          </span>
        )}
      </div>
    </Link>
  );
}

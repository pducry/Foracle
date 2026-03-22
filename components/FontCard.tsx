"use client";

import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { FontPreview } from "./FontPreview";

type FontCardProps = {
  font: Font;
};

function getDefaultWeight(font: Font): number {
  const numericWeights = font.variants
    .map((v) => parseInt(v.replace("italic", ""), 10))
    .filter((w) => !isNaN(w));
  if (numericWeights.includes(400)) return 400;
  return numericWeights[0] ?? 400;
}

export function FontCard({ font }: FontCardProps) {
  const weight = getDefaultWeight(font);

  return (
    <Link
      href={`/font/${font.id}`}
      className="group block rounded-lg bg-[var(--color-bg-secondary)]
        border border-[var(--color-border)] hover:border-[var(--color-text-muted)]
        transition-colors overflow-hidden"
    >
      <div className="px-5 pt-4">
        <span className="text-xs text-[var(--color-text-secondary)]">
          {font.family}
        </span>
      </div>

      <div className="px-5 py-8 flex items-center justify-center min-h-[120px]">
        <FontPreview
          family={font.family}
          text={font.family}
          weight={weight}
          className="text-3xl text-[var(--color-text-primary)]"
        />
      </div>

      <div className="px-5 pb-4 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span>{CATEGORY_LABELS[font.category]}</span>
        <span>·</span>
        <span>{font.variants.length} styles</span>
        {font.variable && (
          <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px]">
            variable
          </span>
        )}
      </div>
    </Link>
  );
}

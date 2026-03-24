// components/PairSection.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { getPairSuggestions, PairSuggestion } from "@/lib/pairing";
import { FontPreview } from "./FontPreview";

type PairSectionProps = {
  font: Font;
  allFonts: Font[];
};

export function PairSection({ font, allFonts }: PairSectionProps) {
  const [rationales, setRationales] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState(false);

  const suggestions = useMemo(
    () => getPairSuggestions(font, allFonts),
    [font, allFonts]
  );

  useEffect(() => {
    if (suggestions.length === 0) return;

    let cancelled = false;
    setAiLoading(true);

    (async () => {
      try {
        const res = await fetch("/api/pair", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            primary: font.family,
            suggestions: suggestions.map((s) => s.font.family),
            primaryCategory: font.category,
          }),
        });

        if (res.ok && !cancelled) {
          const data = await res.json();
          setRationales(data.rationales ?? {});
        }
      } catch {
        // Silent fail
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [font, suggestions]);

  if (suggestions.length === 0) return null;

  return (
    <section className="py-8 border-t border-[var(--color-border)]">
      <h2 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
        Pairs well with
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((s) => {
          const pairUrl =
            s.role === "Heading"
              ? `/pair?heading=${s.font.id}&body=${font.id}`
              : `/pair?heading=${font.id}&body=${s.font.id}`;

          return (
            <div
              key={s.font.id}
              className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4"
            >
              <FontPreview
                family={s.font.family}
                text={s.font.family}
                weight={600}
                weights={[600]}
                className="text-lg font-semibold mb-2"
              />
              {(aiLoading || rationales[s.font.family]) && (
                <div className="mb-2">
                  {aiLoading && !rationales[s.font.family] ? (
                    <div className="space-y-1">
                      <div className="skeleton h-3 w-full rounded" />
                      <div className="skeleton h-3 w-2/3 rounded" />
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {rationales[s.font.family]}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>
                  {CATEGORY_LABELS[s.font.category]} · {s.role}
                </span>
                <Link
                  href={pairUrl}
                  className="text-[var(--color-text-primary)] hover:underline"
                >
                  Try pair →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

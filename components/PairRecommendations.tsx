"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Font } from "@/lib/types";
import { FontPreview } from "./FontPreview";
import { COLLECTIONS } from "@/lib/collections";

type PairRecommendationsProps = {
  fonts: Font[];
};

type RecommendedPair = {
  heading: Font;
  body: Font;
  note: string;
  collection: string;
};

export function PairRecommendations({ fonts }: PairRecommendationsProps) {
  const pairs = useMemo(() => {
    const result: RecommendedPair[] = [];
    const seen = new Set<string>();

    for (const collection of COLLECTIONS) {
      for (const pair of collection.pairs) {
        const key = `${pair.headingId}-${pair.bodyId}`;
        if (seen.has(key)) continue;

        const heading = fonts.find((f) => f.id === pair.headingId);
        const body = fonts.find((f) => f.id === pair.bodyId);
        if (!heading || !body) continue;

        seen.add(key);
        result.push({ heading, body, note: pair.note, collection: collection.title });
      }
    }

    return result.slice(0, 6);
  }, [fonts]);

  if (pairs.length === 0) return null;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
                <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">AI Recommendations</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Font Pairings</h2>
        </div>
        <Link
          href="/pair"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
            border border-[var(--color-border)] text-[var(--color-text-secondary)]
            hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors"
        >
          Explore all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pairs.map((pair) => (
          <Link
            key={`${pair.heading.id}-${pair.body.id}`}
            href={`/pair?heading=${pair.heading.id}&body=${pair.body.id}`}
            className="group block rounded-xl border border-[var(--color-border)]
              hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)]
              transition-all overflow-hidden"
          >
            {/* Preview — generous spacing */}
            <div className="px-8 pt-10 pb-8 min-h-[220px] flex flex-col justify-center">
              <FontPreview
                family={pair.heading.family}
                text="The quick brown fox"
                weight={700}
                weights={[700]}
                className="text-3xl lg:text-4xl leading-tight"
              />
              <div className="mt-4">
                <FontPreview
                  family={pair.body.family}
                  text="Jumps over the lazy dog with grace and precision, creating a harmonious balance between contrast and rhythm."
                  weight={400}
                  weights={[400]}
                  className="text-sm text-[var(--color-text-secondary)] leading-relaxed"
                />
              </div>
            </div>

            {/* Info bar */}
            <div className="px-8 py-4 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{pair.heading.family}</span>
                <span className="text-[var(--color-text-muted)]">×</span>
                <span className="font-medium text-sm">{pair.body.family}</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-[var(--color-text-muted)]
                  group-hover:text-[var(--color-text-primary)] transition-colors">
                  Try →
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed">{pair.note}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { PairSuggestion } from "@/lib/pairing";
import { CATEGORY_LABELS } from "@/lib/types";
import { FontPreview } from "./FontPreview";

type PairSuggestionsProps = {
  suggestions: PairSuggestion[];
  selectedId: string | null;
  onSelect: (suggestion: PairSuggestion) => void;
  primaryFamily: string;
};

export function PairSuggestions({
  suggestions,
  selectedId,
  onSelect,
  primaryFamily,
}: PairSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="pt-4 sm:pt-6">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Suggestions</h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
          Fonts that pair well with <strong className="text-[var(--color-text-primary)]">{primaryFamily}</strong>
        </p>
      </div>

      {/* Mobile: compact list */}
      <div className="sm:hidden space-y-1">
        {suggestions.map((s) => (
          <button
            key={s.font.id}
            onClick={() => onSelect(s)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              selectedId === s.font.id
                ? "bg-[var(--color-bg-tertiary)] border border-[var(--color-text-primary)]/30"
                : "border border-transparent hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{s.font.family}</div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {CATEGORY_LABELS[s.font.category]} · {s.font.variants.length} styles
              </div>
            </div>
            {selectedId === s.font.id && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-primary)] shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Desktop: card grid with font preview */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.map((s) => (
          <button
            key={s.font.id}
            onClick={() => onSelect(s)}
            className={`text-left rounded-xl p-5 border transition-all ${
              selectedId === s.font.id
                ? "bg-[var(--color-bg-tertiary)] border-[var(--color-text-primary)]/30 ring-1 ring-[var(--color-text-primary)]/10"
                : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            <div className="min-h-[60px] flex items-center mb-3">
              <FontPreview
                family={s.font.family}
                text={s.font.family}
                weight={s.font.variants.includes("700") ? 700 : 400}
                weights={[s.font.variants.includes("700") ? 700 : 400]}
                className="text-2xl"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px]">
                {CATEGORY_LABELS[s.font.category]}
              </span>
              <span>{s.role}</span>
              <span className="ml-auto">{s.score}pts</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

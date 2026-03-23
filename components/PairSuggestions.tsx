"use client";

import { PairSuggestion } from "@/lib/pairing";
import { CATEGORY_LABELS } from "@/lib/types";

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
    <div>
      <div className="text-sm text-[var(--color-text-muted)] mb-3">
        Suggestions for <strong className="text-[var(--color-text-primary)]">{primaryFamily}</strong>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {suggestions.map((s) => (
          <button
            key={s.font.id}
            onClick={() => onSelect(s)}
            className={`min-w-[160px] shrink-0 text-left rounded-lg p-3 border transition-colors
              ${
                selectedId === s.font.id
                  ? "bg-[var(--color-bg-tertiary)] border-[var(--color-text-secondary)]"
                  : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
              }`}
          >
            <div className="text-sm font-semibold truncate">{s.font.family}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              {CATEGORY_LABELS[s.font.category]} · {s.role} · {s.score}pts
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

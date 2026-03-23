"use client";

import { useRef } from "react";
import { Category, CATEGORY_LABELS, ALL_CATEGORIES } from "@/lib/types";

type FilterPillsProps = {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
  inline?: boolean;
};

const options: (Category | null)[] = [null, ...ALL_CATEGORIES];

export function FilterPills({ selected, onSelect, inline = false }: FilterPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % options.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + options.length) % options.length;
    else return;

    e.preventDefault();
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
    onSelect(options[nextIndex]);
  };

  if (inline) {
    return (
      <div ref={containerRef} role="tablist" className="flex items-center gap-1">
        {ALL_CATEGORIES.map((opt, i) => (
          <button
            key={opt}
            role="tab"
            tabIndex={selected === opt ? 0 : -1}
            aria-selected={selected === opt}
            onClick={() => onSelect(selected === opt ? null : opt)}
            onKeyDown={(e) => handleKeyDown(e, i + 1)}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
              selected === opt
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {CATEGORY_LABELS[opt]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      className="flex flex-wrap justify-center gap-2"
    >
      {options.map((opt, i) => (
        <button
          key={opt ?? "all"}
          role="tab"
          tabIndex={selected === opt ? 0 : -1}
          aria-selected={selected === opt}
          onClick={() => onSelect(opt)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === opt
              ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)]"
              : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          {opt === null ? "All" : CATEGORY_LABELS[opt]}
        </button>
      ))}
    </div>
  );
}

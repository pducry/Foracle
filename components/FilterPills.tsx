"use client";

import { useRef } from "react";
import { Category, CATEGORY_LABELS, ALL_CATEGORIES } from "@/lib/types";

type FilterPillsProps = {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
};

const options: (Category | null)[] = [null, ...ALL_CATEGORIES];

export function FilterPills({ selected, onSelect }: FilterPillsProps) {
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

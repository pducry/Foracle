"use client";

import { useState, useRef, useEffect } from "react";
import { Font, CATEGORY_LABELS } from "@/lib/types";

type FontSelectorProps = {
  label: string;
  fonts: Font[];
  selected: Font | null;
  onSelect: (font: Font) => void;
};

export function FontSelector({
  label,
  fonts,
  selected,
  onSelect,
}: FontSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? fonts.filter((f) =>
        f.family.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 50)
    : fonts.slice(0, 50);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={ref} className="relative flex-1">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
        {label}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]
          rounded-xl px-4 py-3 hover:border-[var(--color-text-muted)] transition-colors"
      >
        {selected ? (
          <>
            <div className="text-lg font-semibold">{selected.family}</div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {CATEGORY_LABELS[selected.category]} · {selected.variants.length} weights
              {selected.variable ? " · Variable" : ""}
            </div>
          </>
        ) : (
          <div className="text-[var(--color-text-muted)]">Choose a font...</div>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          rounded-xl shadow-xl max-h-80 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-[var(--color-border)]">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fonts..."
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-tertiary)]
                text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                border border-[var(--color-border)] focus:outline-none
                focus:border-[var(--color-text-secondary)] text-sm"
            />
          </div>
          <div className="overflow-y-auto">
            {filtered.map((font) => (
              <button
                key={font.id}
                onClick={() => {
                  onSelect(font);
                  setOpen(false);
                  setQuery("");
                }}
                className={`w-full text-left px-4 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors
                  ${selected?.id === font.id ? "bg-[var(--color-bg-tertiary)]" : ""}`}
              >
                <div className="text-sm font-medium">{font.family}</div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {CATEGORY_LABELS[font.category]} · {font.variants.length} weights
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

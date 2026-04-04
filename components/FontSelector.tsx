"use client";

import { useState, useRef, useEffect } from "react";
import { Font, Category, CATEGORY_LABELS, ALL_CATEGORIES } from "@/lib/types";

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
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = fonts
    .filter((f) => {
      if (categoryFilter && f.category !== categoryFilter) return false;
      if (query && !f.family.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .slice(0, 50);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isMobile && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, isMobile]);

  const handleSelect = (font: Font) => {
    onSelect(font);
    setOpen(false);
    setQuery("");
    setCategoryFilter(null);
  };

  const listContent = (
    <>
      {/* Search */}
      <div className="p-2 sm:p-2 border-b border-[var(--color-border)]">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search fonts..."
          className="w-full px-3 py-2.5 sm:py-2 rounded-lg bg-[var(--color-bg-tertiary)]
            text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
            border border-[var(--color-border)] focus:outline-none
            focus:border-[var(--color-text-secondary)] text-sm"
        />
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-3 sm:gap-4 px-4 py-3 border-b border-[var(--color-border)] overflow-x-auto">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`text-xs font-medium whitespace-nowrap transition-colors pb-0.5 ${
            categoryFilter === null
              ? "text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          All
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
            className={`text-xs font-medium whitespace-nowrap transition-colors pb-0.5 ${
              categoryFilter === cat
                ? "text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Font list */}
      <div className="overflow-y-auto flex-1">
        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">
            No fonts found
          </div>
        )}
        {filtered.map((font) => (
          <button
            key={font.id}
            onClick={() => handleSelect(font)}
            className={`w-full text-left px-4 py-3.5 sm:py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors
              ${selected?.id === font.id ? "bg-[var(--color-bg-tertiary)]" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{font.family}</div>
              <span className="text-[10px] text-[var(--color-text-muted)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
                {CATEGORY_LABELS[font.category]}
              </span>
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {font.variants.length} weights{font.variable ? " · Variable" : ""}
            </div>
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div ref={ref} className="relative flex-1">
      <div className="text-xs sm:text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
        {label}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]
          rounded-xl px-4 py-3 hover:border-[var(--color-text-muted)] transition-colors"
      >
        {selected ? (
          <>
            <div className="text-base sm:text-lg font-semibold">{selected.family}</div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {CATEGORY_LABELS[selected.category]} · {selected.variants.length} weights
              {selected.variable ? " · Variable" : ""}
            </div>
          </>
        ) : (
          <div className="text-[var(--color-text-muted)]">Choose a font...</div>
        )}
      </button>

      {/* Mobile: fullscreen modal */}
      {open && isMobile && (
        <div className="fixed inset-0 z-50 bg-[var(--color-bg-primary)] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
            <h3 className="text-sm font-semibold">{label}</h3>
            <button
              onClick={() => { setOpen(false); setQuery(""); setCategoryFilter(null); }}
              className="p-2 text-[var(--color-text-muted)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {listContent}
        </div>
      )}

      {/* Desktop: dropdown */}
      {open && !isMobile && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          rounded-xl shadow-xl max-h-[420px] overflow-hidden flex flex-col">
          {listContent}
        </div>
      )}
    </div>
  );
}

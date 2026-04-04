"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllFonts } from "@/lib/fonts";
import { CATEGORY_LABELS } from "@/lib/types";

type SearchBarProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  onNavigate?: () => void;
};

const fonts = getAllFonts();

export function SearchBar({
  onSearch,
  placeholder = "Search fonts...",
  onNavigate,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const suggestions = value.length >= 2
    ? fonts
        .filter((f) => f.family.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setOpen(newValue.length >= 2);
    setActiveIndex(-1);

    if (onSearch) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onSearch(newValue), 200);
    }
  };

  const goToFont = (fontId: string) => {
    setOpen(false);
    setValue("");
    if (onSearch) onSearch("");
    if (onNavigate) onNavigate();
    router.push(`/font/${fontId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      goToFont(suggestions[activeIndex].id);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value.length >= 2 && setOpen(true)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg
          bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          border border-[var(--color-border)]
          focus:outline-none focus:border-[var(--color-text-secondary)]
          transition-colors text-sm"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          rounded-lg shadow-xl overflow-hidden">
          {suggestions.map((font, i) => (
            <button
              key={font.id}
              onClick={() => goToFont(font.id)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                i === activeIndex
                  ? "bg-[var(--color-bg-tertiary)]"
                  : "hover:bg-[var(--color-bg-tertiary)]"
              }`}
            >
              <span className="text-sm font-medium">{font.family}</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                {CATEGORY_LABELS[font.category]}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && value.length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          rounded-lg shadow-xl px-4 py-3 text-sm text-[var(--color-text-muted)]">
          No fonts found
        </div>
      )}
    </div>
  );
}

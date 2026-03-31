"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";

type HeaderProps = {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
};

export function Header({
  onSearch,
  showSearch = true,
}: HeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="px-4 sm:px-6 lg:px-10 h-14 flex items-center gap-4">
        <Link href="/" className="shrink-0">
          <img
            src="/minilogo.png"
            alt="Foracle"
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex-1" />

        {/* Desktop: search + nav + theme */}
        {showSearch && onSearch && (
          <div className="hidden sm:block w-56 shrink-0">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        <div className="hidden sm:block w-px h-5 bg-[var(--color-border)]" />

        <Link
          href="/pair"
          className={`hidden sm:flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            pathname === "/pair"
              ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
              : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
            <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
          </svg>
          Pair
        </Link>

        {mounted && (
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="hidden sm:block shrink-0 p-2 rounded-lg text-[var(--color-text-muted)]
              hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        )}

        {/* Mobile: hamburger menu */}
        <MobileMenu onSearch={showSearch ? onSearch : undefined} />
      </div>
    </header>
  );
}

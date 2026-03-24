"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { Category } from "@/lib/types";

type HeaderProps = {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
};

export function Header({
  onSearch,
  showSearch = true,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="px-6 lg:px-10 h-14 flex items-center gap-4">
        <Link href="/" className="shrink-0">
          <img
            src="/minilogo.png"
            alt="Foracle"
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex-1" />

        {showSearch && onSearch && (
          <div className="w-56 shrink-0">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        <div className="w-px h-5 bg-[var(--color-border)]" />

        <Link
          href="/pair"
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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
      </div>
    </header>
  );
}

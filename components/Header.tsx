"use client";

import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
};

export function Header({ onSearch, showSearch = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link
          href="/"
          className="text-lg font-bold text-[var(--color-text-primary)] shrink-0"
        >
          Foracle
        </Link>

        {showSearch && onSearch && (
          <div className="flex-1 max-w-sm ml-auto">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}

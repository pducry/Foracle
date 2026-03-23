"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
};

export function Header({ onSearch, showSearch = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="px-6 lg:px-10 h-14 flex items-center gap-6">
        <Link
          href="/"
          className="text-lg font-bold text-[var(--color-text-primary)] shrink-0"
        >
          Foracle
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/"
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Explore
          </Link>
          <Link
            href="/pair"
            className={`text-sm transition-colors ${
              pathname === "/pair"
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Pair
          </Link>
        </nav>

        <div className="flex-1" />

        {showSearch && onSearch && (
          <div className="max-w-sm">
            <SearchBar onSearch={onSearch} />
          </div>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}

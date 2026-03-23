"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { FilterPills } from "./FilterPills";
import { Category } from "@/lib/types";

type HeaderProps = {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  selectedCategory?: Category | null;
  onCategorySelect?: (category: Category | null) => void;
};

export function Header({
  onSearch,
  showSearch = true,
  showFilters = false,
  selectedCategory,
  onCategorySelect,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="px-6 lg:px-10 h-14 flex items-center gap-4">
        <Link
          href="/"
          className="text-sm font-bold text-[var(--color-text-primary)] shrink-0"
        >
          Foracle
        </Link>

        <nav className="flex items-center gap-3">
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

        {showFilters && onCategorySelect && (
          <>
            <div className="w-px h-5 bg-[var(--color-border)]" />
            <div className="flex items-center overflow-x-auto">
              <FilterPills
                selected={selectedCategory ?? null}
                onSelect={onCategorySelect}
                inline
              />
            </div>
          </>
        )}

        <div className="flex-1" />

        {showSearch && onSearch && (
          <div className="w-56 shrink-0">
            <SearchBar onSearch={onSearch} />
          </div>
        )}
      </div>
    </header>
  );
}

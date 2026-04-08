export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-6 px-4 sm:px-6 lg:px-10 text-xs text-[var(--color-text-muted)]">
      {/* Mobile: stacked, centered */}
      <div className="flex flex-col items-center gap-2 sm:hidden text-center">
        <span>Free to all makers and creatives around the world</span>
        <span>Made by Pedro Julien · pducry@gmail.com</span>
        <span>MIT License · 2026</span>
      </div>
      {/* Desktop: 3-column grid */}
      <div className="hidden sm:grid grid-cols-3 items-center">
        <span className="text-left">Made by Pedro Julien · pducry@gmail.com</span>
        <span className="text-center">Free to all makers and creatives around the world</span>
        <span className="text-right">MIT License · 2026</span>
      </div>
    </footer>
  );
}

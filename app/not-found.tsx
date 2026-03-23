import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-text-primary)]">404</h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">Font not found</p>
        <Link href="/"
          className="inline-block mt-6 px-6 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:opacity-90 transition-opacity">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}

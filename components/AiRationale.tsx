// components/AiRationale.tsx
"use client";

type AiRationaleProps = {
  rationale: string | null;
  loading: boolean;
};

export function AiRationale({ rationale, loading }: AiRationaleProps) {
  if (!loading && !rationale) return null;

  return (
    <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">✦</span>
        <span className="text-sm font-semibold">AI Rationale</span>
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>
      ) : (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed animate-in">
          {rationale}
        </p>
      )}
    </div>
  );
}

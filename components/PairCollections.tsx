"use client";

import { useState } from "react";
import Link from "next/link";
import { Font } from "@/lib/types";
import { COLLECTIONS, PairCollection } from "@/lib/collections";
import { FontPreview } from "./FontPreview";

type PairCollectionsProps = {
  fonts: Font[];
};

const COLLECTION_ICONS: Record<string, string> = {
  dashboard: "◈",
  crm: "⬡",
  blog: "▤",
  developer: "⌘",
  creative: "✦",
};

function CollectionCard({
  collection,
  fonts,
  isOpen,
  onToggle,
}: {
  collection: PairCollection;
  fonts: Font[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const icon = COLLECTION_ICONS[collection.id] || "◇";

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${
      isOpen
        ? "border-[var(--color-text-primary)]/30 bg-[var(--color-bg-secondary)]/30"
        : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
    }`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-8 transition-colors"
      >
        <div className="flex items-start gap-5">
          {/* Icon */}
          <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors ${
            isOpen
              ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
              : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
          }`}>
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title — big and bold */}
            <h3 className="text-2xl font-bold tracking-tight">{collection.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-2xl">{collection.description}</p>

            {/* Context rationale */}
            <p className="text-xs text-[var(--color-text-muted)] mt-2 max-w-2xl leading-relaxed italic">{collection.context}</p>

            {/* Mini preview chips when closed */}
            {!isOpen && (
              <div className="flex flex-wrap gap-2 mt-4">
                {collection.pairs.map((pair) => {
                  const hf = fonts.find((f) => f.id === pair.headingId);
                  const bf = fonts.find((f) => f.id === pair.bodyId);
                  if (!hf || !bf) return null;
                  return (
                    <div key={pair.headingId + pair.bodyId}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                      <span className="text-xs font-medium">{hf.family}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">×</span>
                      <span className="text-xs font-medium">{bf.family}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Toggle */}
          <div className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-colors ${
            isOpen
              ? "border-[var(--color-text-primary)]/30 text-[var(--color-text-primary)]"
              : "border-[var(--color-border)] text-[var(--color-text-muted)]"
          }`}>
            {isOpen ? "−" : "+"}
          </div>
        </div>

        {/* Pair count */}
        <div className="ml-[76px] mt-3">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
            {collection.pairs.length} curated pairs
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-[var(--color-border)] animate-in">
          {collection.pairs.map((pair, i) => {
            const headingFont = fonts.find((f) => f.id === pair.headingId);
            const bodyFont = fonts.find((f) => f.id === pair.bodyId);
            if (!headingFont || !bodyFont) return null;

            return (
              <div key={i} className={`p-8 ${i > 0 ? "border-t border-[var(--color-border)]" : ""} hover:bg-[var(--color-bg-secondary)]/50 transition-colors`}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
                  {/* Pair info */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Pair {i + 1}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{headingFont.family}</span>
                      <span className="text-[var(--color-text-muted)]">×</span>
                      <span className="text-lg font-bold">{bodyFont.family}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-3 leading-relaxed">{pair.note}</p>

                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/pair?heading=${pair.headingId}&body=${pair.bodyId}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                          bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
                          <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
                        </svg>
                        Try this Pair
                      </Link>
                      <a
                        href={`https://fonts.google.com/specimen/${headingFont.family.replace(/ /g, "+")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm
                          border border-[var(--color-border)] text-[var(--color-text-secondary)]
                          hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Get Fonts
                      </a>
                    </div>
                  </div>

                  {/* Live preview */}
                  <div className="p-8 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]">
                    <FontPreview
                      family={headingFont.family}
                      text="Typography is the voice of design"
                      weight={700}
                      weights={[700]}
                      className="text-3xl lg:text-4xl mb-4"
                    />
                    <FontPreview
                      family={bodyFont.family}
                      text="The right combination of typefaces creates harmony between form and function, ensuring your message is both beautiful and readable across every medium and context."
                      weight={400}
                      weights={[400]}
                      className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
                    />
                    {/* Font role labels */}
                    <div className="flex gap-4 mt-5 pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]/40" />
                        <span className="text-[10px] text-[var(--color-text-muted)]">Heading: {headingFont.family}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]/20" />
                        <span className="text-[10px] text-[var(--color-text-muted)]">Body: {bodyFont.family}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function PairCollections({ fonts }: PairCollectionsProps) {
  const [openId, setOpenId] = useState<string | null>(COLLECTIONS[0].id);

  return (
    <div className="space-y-5">
      {COLLECTIONS.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          fonts={fonts}
          isOpen={openId === collection.id}
          onToggle={() => setOpenId(openId === collection.id ? null : collection.id)}
        />
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Font } from "@/lib/types";
import { COLLECTIONS, PairCollection } from "@/lib/collections";
import { FontPreview } from "./FontPreview";

type PairCollectionsProps = {
  fonts: Font[];
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
  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 hover:bg-[var(--color-bg-secondary)] transition-colors"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{collection.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{collection.description}</p>
          </div>
          <div className="shrink-0 ml-4 text-[var(--color-text-muted)] text-lg">
            {isOpen ? "−" : "+"}
          </div>
        </div>
        {/* Mini preview of pair fonts */}
        {!isOpen && (
          <div className="flex gap-2 mt-4">
            {collection.pairs.slice(0, 3).map((pair) => {
              const h = fonts.find((f) => f.id === pair.headingId);
              const b = fonts.find((f) => f.id === pair.bodyId);
              if (!h || !b) return null;
              return (
                <div key={pair.headingId + pair.bodyId}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-secondary)]">
                  {h.family} + {b.family}
                </div>
              );
            })}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="border-t border-[var(--color-border)] animate-in">
          {collection.pairs.map((pair, i) => {
            const headingFont = fonts.find((f) => f.id === pair.headingId);
            const bodyFont = fonts.find((f) => f.id === pair.bodyId);
            if (!headingFont || !bodyFont) return null;

            return (
              <div key={i} className={`p-6 ${i > 0 ? "border-t border-[var(--color-border)]" : ""}`}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
                  {/* Pair info */}
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{headingFont.family}</span>
                      <span className="text-[var(--color-text-muted)]">×</span>
                      <span className="font-medium">{bodyFont.family}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-2">{pair.note}</p>
                    <Link
                      href={`/pair?heading=${pair.headingId}&body=${pair.bodyId}`}
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-sm
                        border border-[var(--color-border)] text-[var(--color-text-secondary)]
                        hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
                        <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
                      </svg>
                      Open in Playground
                    </Link>
                  </div>

                  {/* Live preview */}
                  <div className="p-6 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                    <FontPreview
                      family={headingFont.family}
                      text="Typography is the voice of design"
                      weight={700}
                      weights={[700]}
                      className="text-2xl lg:text-3xl mb-3"
                    />
                    <FontPreview
                      family={bodyFont.family}
                      text="The right combination of typefaces creates harmony between form and function, ensuring your message is both beautiful and readable across every medium."
                      weight={400}
                      weights={[400]}
                      className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
                    />
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
    <div className="space-y-4">
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

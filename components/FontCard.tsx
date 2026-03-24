"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { FontPreview } from "./FontPreview";
import { getCuratedInfo } from "@/lib/curated";
import { FoundryBadge } from "./FoundryBadge";

type FontCardProps = {
  font: Font;
  previewText?: string;
  draggingFont?: Font | null;
};

function getDefaultWeight(font: Font): number {
  const numericWeights = font.variants
    .map((v) => parseInt(v.replace("italic", ""), 10))
    .filter((w) => !isNaN(w));
  if (numericWeights.includes(400)) return 400;
  return numericWeights[0] ?? 400;
}

export function FontCard({ font, previewText, draggingFont }: FontCardProps) {
  const weight = getDefaultWeight(font);
  const displayText = previewText || font.family;
  const router = useRouter();
  const curated = getCuratedInfo(font.id);
  const [dragOver, setDragOver] = useState(false);

  const isDraggingSelf = draggingFont?.id === font.id;
  const isValidDrop = draggingFont && !isDraggingSelf;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("font-id", font.id);
    e.dataTransfer.setData("font-family", font.family);
    e.dataTransfer.effectAllowed = "link";
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isDraggingSelf) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "link";
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const draggedId = e.dataTransfer.getData("font-id");
    if (draggedId && draggedId !== font.id) {
      router.push(`/pair?heading=${draggedId}&body=${font.id}`);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group relative border transition-all cursor-grab active:cursor-grabbing hover:cursor-grab
        ${dragOver && isValidDrop
          ? "border-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] scale-[1.02] ring-2 ring-[var(--color-text-primary)]/20"
          : isDraggingSelf
            ? "opacity-40 border-[var(--color-border)]"
            : "border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]"
        }`}
    >
      {/* Drop overlay */}
      {dragOver && isValidDrop && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
              <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
            </svg>
            <span className="text-sm font-medium">Pair with {font.family}</span>
          </div>
        </div>
      )}

      <Link
        href={`/font/${font.id}`}
        className={`block cursor-grab active:cursor-grabbing ${dragOver && isValidDrop ? "opacity-30" : ""}`}
        draggable={false}
      >
        {/* Top bar — font name + foundry + curated badge */}
        <div className="px-5 pt-4 flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-muted)]">
            {font.family}
          </span>
          <div className="flex items-center gap-2">
            {curated && (
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">
                ★ Pick
              </span>
            )}
          </div>
        </div>

        {/* Font preview — generous height */}
        <div className="px-6 py-8 flex items-center justify-center min-h-[180px]">
          <FontPreview
            family={font.family}
            text={displayText}
            weight={weight}
            className="text-3xl lg:text-4xl text-[var(--color-text-primary)] text-center"
          />
        </div>
      </Link>

      {/* Bottom bar — metadata + foundry + actions */}
      <div className={`px-5 pb-4 space-y-3 ${dragOver && isValidDrop ? "opacity-30" : ""}`}>
        {/* Foundry badge */}
        <FoundryBadge source={font.source} />

        {/* Metadata + actions */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <span>{CATEGORY_LABELS[font.category]}</span>
          <span>·</span>
          <span>{font.variants.length} styles</span>
          {font.variable && (
            <span className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-xs uppercase tracking-wider">
              variable
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <a
              href={`https://fonts.google.com/specimen/${font.family.replace(/ /g, "+")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded text-xs uppercase tracking-wider
                border border-[var(--color-border)] text-[var(--color-text-muted)]
                hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]
                transition-colors"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Get
            </a>
            <Link
              href={`/pair?heading=${font.id}`}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs uppercase tracking-wider
                border border-[var(--color-border)] text-[var(--color-text-muted)]
                hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]
                transition-colors"
              draggable={false}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z" />
                <path d="M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z" />
              </svg>
              Pair
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

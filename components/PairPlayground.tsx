"use client";

import { useState, useEffect, useCallback } from "react";
import { Font } from "@/lib/types";
import { getPairSuggestions, PairSuggestion } from "@/lib/pairing";
import { FontSelector } from "./FontSelector";
import { PairPreview } from "./PairPreview";
import { AiRationale } from "./AiRationale";
import { PairSuggestions } from "./PairSuggestions";

type PairPlaygroundProps = {
  fonts: Font[];
  initialHeadingId?: string;
  initialBodyId?: string;
};

export function PairPlayground({
  fonts,
  initialHeadingId,
  initialBodyId,
}: PairPlaygroundProps) {
  const findFont = (id?: string) => (id ? fonts.find((f) => f.id === id) ?? null : null);

  const [heading, setHeading] = useState<Font | null>(findFont(initialHeadingId));
  const [body, setBody] = useState<Font | null>(findFont(initialBodyId));
  const [suggestions, setSuggestions] = useState<PairSuggestion[]>([]);
  const [rationale, setRationale] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [allRationales, setAllRationales] = useState<Record<string, string>>({});

  const primary = heading;

  useEffect(() => {
    if (!primary) {
      setSuggestions([]);
      return;
    }

    const results = getPairSuggestions(primary, fonts, 6);
    setSuggestions(results);

    if (!body && results.length > 0) {
      setBody(results[0].font);
    }
  }, [primary, fonts]);

  const fetchRationale = useCallback(async () => {
    if (!heading || !body || suggestions.length === 0) return;

    setAiLoading(true);
    setRationale(null);

    try {
      const res = await fetch("/api/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primary: heading.family,
          suggestions: suggestions.slice(0, 6).map((s) => s.font.family),
          primaryCategory: heading.category,
        }),
      });

      if (res.status === 501) {
        setAiLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setAllRationales(data.rationales ?? {});
        setRationale(data.rationales?.[body.family] ?? null);

        if (data.extraSuggestions?.length) {
          const extraFonts: PairSuggestion[] = data.extraSuggestions
            .map((extra: { family: string; rationale: string }) => {
              const found = fonts.find(
                (f) => f.family.toLowerCase() === extra.family.toLowerCase()
              );
              if (!found || suggestions.some((s) => s.font.id === found.id)) return null;
              return { font: found, score: 0, role: "Body" as const };
            })
            .filter(Boolean) as PairSuggestion[];
          if (extraFonts.length > 0) {
            setSuggestions((prev) => [...prev, ...extraFonts]);
          }
        }
      }
    } catch {
      // Silently fail
    } finally {
      setAiLoading(false);
    }
  }, [heading, body, suggestions.length]);

  useEffect(() => {
    fetchRationale();
  }, [fetchRationale]);

  const handleSwap = () => {
    setHeading(body);
    setBody(heading);
  };

  const handleSuggestionSelect = (s: PairSuggestion) => {
    setBody(s.font);
    setRationale(allRationales[s.font.family] ?? null);
  };

  return (
    <div className="space-y-6">
      {/* Font selectors — stacked on mobile, side by side on sm+ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
        <FontSelector
          label="Heading Font"
          fonts={fonts}
          selected={heading}
          onSelect={setHeading}
        />
        <button
          onClick={handleSwap}
          className="shrink-0 self-center p-2 rounded-lg border border-[var(--color-border)]
            text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
            hover:border-[var(--color-text-muted)] transition-colors sm:mb-1"
          aria-label="Swap fonts"
        >
          <span className="sm:hidden">⇅</span>
          <span className="hidden sm:inline">⇄</span>
        </button>
        <FontSelector
          label="Body Font"
          fonts={fonts}
          selected={body}
          onSelect={setBody}
        />
      </div>

      {/* Download pair */}
      {heading && body && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">
              {heading.family} × {body.family}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {heading.variants.length + body.variants.length} styles total
              {(heading.variable || body.variable) && " · Variable"}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <a
              href={`https://fonts.google.com/download?family=${encodeURIComponent(heading.family)}|${encodeURIComponent(body.family)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium
                bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] transition-colors shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Pair
            </a>
            <a
              href={`https://fonts.google.com/specimen/${heading.family.replace(/ /g, "+")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm
                border border-[var(--color-border)] text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors shrink-0"
            >
              {heading.family} ↗
            </a>
            <a
              href={`https://fonts.google.com/specimen/${body.family.replace(/ /g, "+")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm
                border border-[var(--color-border)] text-[var(--color-text-secondary)]
                hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors shrink-0"
            >
              {body.family} ↗
            </a>
          </div>
        </div>
      )}

      {/* Preview */}
      {heading && body && (
        <PairPreview
          headingFamily={heading.family}
          bodyFamily={body.family}
        />
      )}

      {/* AI Rationale */}
      {heading && body && (
        <AiRationale rationale={rationale} loading={aiLoading} />
      )}

      {/* Suggestions */}
      {heading && (
        <PairSuggestions
          suggestions={suggestions}
          selectedId={body?.id ?? null}
          onSelect={handleSuggestionSelect}
          primaryFamily={heading.family}
        />
      )}
    </div>
  );
}

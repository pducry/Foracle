"use client";

import { useState, useEffect, useCallback } from "react";
import { Font } from "@/lib/types";
import { getPairSuggestions, PairSuggestion } from "@/lib/pairing";
import { Mood, MOODS, getMoodById } from "@/lib/moods";
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
  const [mood, setMood] = useState<Mood | null>(null);

  const primary = heading;

  useEffect(() => {
    if (!primary) {
      setSuggestions([]);
      return;
    }

    const moodConfig = mood ? getMoodById(mood) : undefined;
    const moodFilter = moodConfig
      ? { bodyCategories: moodConfig.bodyCategories, preferVariable: moodConfig.preferVariable, minWeights: moodConfig.minWeights }
      : undefined;

    const results = getPairSuggestions(primary, fonts, 6, moodFilter);
    setSuggestions(results);

    if (!body && results.length > 0) {
      setBody(results[0].font);
    }
  }, [primary, fonts, mood]);

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
      {/* Mood selector */}
      <div>
        <div className="text-sm text-[var(--color-text-muted)] mb-3">Mood</div>
        <div className="flex gap-2 flex-wrap">
          {MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(mood === m.id ? null : m.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                mood === m.id
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-medium"
                  : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {mood && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)] animate-in">
            {getMoodById(mood).description}
          </p>
        )}
      </div>

      {/* Font selectors */}
      <div className="flex items-end gap-4">
        <FontSelector
          label="Heading Font"
          fonts={fonts}
          selected={heading}
          onSelect={setHeading}
        />
        <button
          onClick={handleSwap}
          className="shrink-0 mb-1 p-2 rounded-lg border border-[var(--color-border)]
            text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
            hover:border-[var(--color-text-muted)] transition-colors"
          aria-label="Swap fonts"
        >
          ⇄
        </button>
        <FontSelector
          label="Body Font"
          fonts={fonts}
          selected={body}
          onSelect={setBody}
        />
      </div>

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

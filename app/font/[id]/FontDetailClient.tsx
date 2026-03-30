"use client";

import { useState } from "react";
import Link from "next/link";
import { Font, CATEGORY_LABELS } from "@/lib/types";
import { Header } from "@/components/Header";
import { FontPreview } from "@/components/FontPreview";
import { FontMeta } from "@/components/FontMeta";
import { TypeControls, TypeSettings } from "@/components/TypeControls";
import { VariantRow } from "@/components/VariantRow";
import { PairSection } from "@/components/PairSection";

type Props = { font: Font; allFonts: Font[] };

export function FontDetailClient({ font, allFonts }: Props) {
  const [tab, setTab] = useState<"styles" | "text">("styles");
  const [customText, setCustomText] = useState("");
  const [settings, setSettings] = useState<TypeSettings>({
    fontSize: 48, letterSpacing: 0, lineHeight: 1.2, textAlign: "left",
  });

  const previewText = customText || "Alice in Wonderland";

  const sortedVariants = [...font.variants].sort((a, b) => {
    const aWeight = parseInt(a.replace("italic", "") || "400", 10);
    const bWeight = parseInt(b.replace("italic", "") || "400", 10);
    const aItalic = a.includes("italic");
    const bItalic = b.includes("italic");
    if (aWeight !== bWeight) return aWeight - bWeight;
    return aItalic === bItalic ? 0 : aItalic ? 1 : -1;
  });

  const weights = [...new Set(font.variants.map((v) => parseInt(v.replace("italic", "") || "400", 10)))];
  const sortedWeights = weights.sort((a, b) => a - b);
  const tuples = [...sortedWeights.map((w) => `0,${w}`), ...sortedWeights.map((w) => `1,${w}`)].join(";");
  const encodedFamily = font.family.replace(/ /g, "+");

  return (
    <>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${encodedFamily}:ital,wght@${tuples}&display=swap`} />

      <Header showSearch={false} />

      <main id="main-content" className="px-4 sm:px-6 lg:px-10">
        <div className="py-4">
          <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
            ← Back to catalog
          </Link>
        </div>

        <section className="text-center py-8 sm:py-12 border-b border-[var(--color-border)]">
          <FontPreview family={font.family} text={font.family} weight={400}
            className="text-4xl sm:text-6xl md:text-8xl text-[var(--color-text-primary)]" />
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <span>{CATEGORY_LABELS[font.category]}</span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span>{font.variants.length} styles</span>
            {font.variable && (
              <span className="px-2 py-0.5 rounded border border-[var(--color-border)] text-xs">variable</span>
            )}
          </div>
        </section>

        <section className="py-8 border-b border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-semibold mb-3">About this font</h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {font.description || `${font.family} is a free ${CATEGORY_LABELS[font.category].toLowerCase()} font with ${font.variants.length} styles${font.variable ? " and variable font support" : ""}.`}
              </p>
              <a href={`https://fonts.google.com/specimen/${font.family.replace(/ /g, "+")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-[var(--color-text-primary)] hover:underline">
                Get the font ↗
              </a>
            </div>
            <FontMeta font={font} />
          </div>
        </section>

        <section className="py-6">
          <div className="flex gap-6 border-b border-[var(--color-border)]">
            {(["styles", "text"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                  tab === t
                    ? "border-[var(--color-text-primary)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <TypeControls settings={settings} onChange={setSettings} />

          {tab === "styles" && (
            <div>
              {sortedVariants.map((variant) => (
                <VariantRow key={variant} family={font.family} variant={variant}
                  previewText={previewText} fontSize={settings.fontSize}
                  letterSpacing={settings.letterSpacing} lineHeight={settings.lineHeight}
                  textAlign={settings.textAlign} />
              ))}
            </div>
          )}

          {tab === "text" && (
            <div className="py-6">
              <textarea value={customText} onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-text-secondary)] resize-y min-h-[80px] text-sm" />
              <div className="mt-6 py-8">
                <FontPreview family={font.family} text={customText || "Type something above to preview..."} weight={400}
                  style={{ fontSize: `${settings.fontSize}px`, letterSpacing: `${settings.letterSpacing}px`, lineHeight: settings.lineHeight, textAlign: settings.textAlign }}
                  className="text-[var(--color-text-primary)]" />
              </div>
            </div>
          )}
        </section>

        <PairSection font={font} allFonts={allFonts} />
      </main>
    </>
  );
}

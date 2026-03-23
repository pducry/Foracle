import { Font } from "@/lib/types";

type FontMetaProps = { font: Font };

export function FontMeta({ font }: FontMetaProps) {
  const items = [
    { label: "Support", value: font.subsets.join(", ") },
    { label: "Designer", value: font.designers },
    { label: "Glyphs", value: font.numGlyphs ? font.numGlyphs.toLocaleString() : undefined },
    { label: "License", value: font.license },
  ].filter((item) => item.value);

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
          <p className="text-sm text-[var(--color-text-primary)] font-medium mt-0.5">{value}</p>
        </div>
      ))}
    </div>
  );
}

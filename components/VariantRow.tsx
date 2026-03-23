import { FontPreview } from "./FontPreview";

const WEIGHT_NAMES: Record<string, string> = {
  "100": "Thin", "200": "Extra Light", "300": "Light", "400": "Regular",
  "500": "Medium", "600": "Semi Bold", "700": "Bold", "800": "Extra Bold", "900": "Black",
};

type VariantRowProps = {
  family: string; variant: string; previewText: string;
  fontSize: number; letterSpacing: number; lineHeight: number;
  textAlign: "left" | "center" | "right";
};

export function VariantRow({ family, variant, previewText, fontSize, letterSpacing, lineHeight, textAlign }: VariantRowProps) {
  const isItalic = variant.includes("italic");
  const weight = parseInt(variant.replace("italic", "") || "400", 10);
  const name = WEIGHT_NAMES[String(weight)] || weight.toString();
  const label = `${name} ${weight}${isItalic ? " Italic" : ""}`;

  return (
    <div className="border-b border-[var(--color-border)] py-6">
      <p className="text-xs text-[var(--color-text-muted)] mb-2">{family} {label}</p>
      <FontPreview family={family} text={previewText} weight={weight}
        style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}px`, lineHeight, textAlign, fontStyle: isItalic ? "italic" : "normal" }}
        className="text-[var(--color-text-primary)]" />
    </div>
  );
}

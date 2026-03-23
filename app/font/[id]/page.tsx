import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllFonts, getFontById } from "@/lib/fonts";
import { CATEGORY_LABELS } from "@/lib/types";
import { FontDetailClient } from "./FontDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return getAllFonts().map((font) => ({ id: font.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const font = getFontById(id);
  if (!font) return { title: "Font not found — Foracle" };
  return {
    title: `${font.family} — Foracle`,
    description: `Explore ${font.family}, a free ${CATEGORY_LABELS[font.category].toLowerCase()} font with ${font.variants.length} styles`,
    openGraph: {
      title: `${font.family} — Foracle`,
      description: `Explore ${font.family}, a free ${CATEGORY_LABELS[font.category].toLowerCase()} font with ${font.variants.length} styles`,
    },
  };
}

export default async function FontPage({ params }: Props) {
  const { id } = await params;
  const font = getFontById(id);
  if (!font) notFound();
  return <FontDetailClient font={font} />;
}

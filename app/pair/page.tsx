// app/pair/page.tsx
import { Metadata } from "next";
import { getAllFonts } from "@/lib/fonts";
import { PairClient } from "./PairClient";

export const metadata: Metadata = {
  title: "Pair Fonts — Foracle",
  description: "Find the perfect font pairing with AI-powered suggestions",
  openGraph: {
    title: "Pair Fonts — Foracle",
    description: "Find the perfect font pairing with AI-powered suggestions",
  },
};

export default function PairPage() {
  const fonts = getAllFonts();
  return <PairClient fonts={fonts} />;
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Font } from "@/lib/types";
import { Header } from "@/components/Header";
import { PairPlayground } from "@/components/PairPlayground";
import { PairCollections } from "@/components/PairCollections";

type PairTab = "playground" | "collections";

function PairContent({ fonts, tab }: { fonts: Font[]; tab: PairTab }) {
  const searchParams = useSearchParams();
  const headingId = searchParams.get("heading") ?? undefined;
  const bodyId = searchParams.get("body") ?? undefined;

  if (tab === "collections") {
    return <PairCollections fonts={fonts} />;
  }

  return (
    <PairPlayground
      fonts={fonts}
      initialHeadingId={headingId}
      initialBodyId={bodyId}
    />
  );
}

type PairClientProps = {
  fonts: Font[];
};

export function PairClient({ fonts }: PairClientProps) {
  const [tab, setTab] = useState<PairTab>("playground");

  return (
    <>
      <Header showSearch={false} />
      <main id="main-content" className="px-6 lg:px-10">
        <section className="pt-10 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Pair Fonts
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)] text-base max-w-xl">
            Find the perfect combination for your next project. Choose a mood, explore curated collections, or build your own pair.
          </p>

          {/* Tab switcher */}
          <div className="flex gap-1 mt-6 p-1 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] w-fit">
            <button
              onClick={() => setTab("playground")}
              className={`px-5 py-2 rounded-md text-sm transition-colors ${
                tab === "playground"
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-medium"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Playground
            </button>
            <button
              onClick={() => setTab("collections")}
              className={`px-5 py-2 rounded-md text-sm transition-colors ${
                tab === "collections"
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-medium"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Collections
            </button>
          </div>
        </section>

        <section className="pb-16">
          <Suspense>
            <PairContent fonts={fonts} tab={tab} />
          </Suspense>
        </section>
      </main>
    </>
  );
}

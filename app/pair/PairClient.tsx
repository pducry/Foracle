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
      <main id="main-content" className="px-4 sm:px-6 lg:px-10">
        <section className="pt-6 sm:pt-10 pb-4 sm:pb-6 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Pair Fonts
          </h1>
          <p className="mt-2 sm:mt-3 text-[var(--color-text-muted)] text-sm sm:text-base max-w-xl mx-auto sm:mx-0">
            Find the perfect combination for your next project. Explore curated collections or build your own pair.
          </p>

          {/* Tab switcher */}
          <div className="flex gap-1 mt-4 sm:mt-6 p-1 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] w-fit mx-auto sm:mx-0">
            <button
              onClick={() => setTab("playground")}
              className={`px-4 sm:px-5 py-2 rounded-md text-sm transition-colors ${
                tab === "playground"
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-medium"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Playground
            </button>
            <button
              onClick={() => setTab("collections")}
              className={`px-4 sm:px-5 py-2 rounded-md text-sm transition-colors ${
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

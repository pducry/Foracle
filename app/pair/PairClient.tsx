// app/pair/PairClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Font } from "@/lib/types";
import { Header } from "@/components/Header";
import { PairPlayground } from "@/components/PairPlayground";

function PairContent({ fonts }: { fonts: Font[] }) {
  const searchParams = useSearchParams();
  const headingId = searchParams.get("heading") ?? undefined;
  const bodyId = searchParams.get("body") ?? undefined;

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
  return (
    <>
      <Header showSearch={false} />
      <main id="main-content" className="px-6 lg:px-10">
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Pair Fonts
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)] text-base">
            Find the perfect combination for your next project
          </p>
        </section>

        <section className="pb-16">
          <Suspense>
            <PairContent fonts={fonts} />
          </Suspense>
        </section>
      </main>
    </>
  );
}

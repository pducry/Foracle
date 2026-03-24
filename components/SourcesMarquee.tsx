"use client";

const SOURCES = [
  { name: "Google Fonts", style: "font-sans" },
  { name: "Fontshare", style: "font-sans" },
  { name: "Freefaces", style: "font-sans tracking-wide" },
  { name: "Pangram Pangram", style: "font-sans" },
  { name: "Font Squirrel", style: "font-sans" },
  { name: "Velvetyne", style: "font-sans italic" },
  { name: "Atipo Foundry", style: "font-sans tracking-wider" },
  { name: "Uncut", style: "font-sans font-black" },
  { name: "GitHub", style: "font-mono" },
  { name: "Collletttivo", style: "font-sans italic" },
];

export function SourcesMarquee() {
  const items = [...SOURCES, ...SOURCES];

  return (
    <div className="py-8 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent pointer-events-none" />

        <div className="flex animate-marquee">
          {items.map((source, i) => (
            <div
              key={`${source.name}-${i}`}
              className="flex items-center shrink-0 mx-10"
            >
              <span
                className={`text-xl text-[var(--color-text-muted)]/30 whitespace-nowrap ${source.style}`}
              >
                {source.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type FontPreviewProps = {
  family: string;
  text?: string;
  weight?: number;
  weights?: number[];
  style?: React.CSSProperties;
  className?: string;
};

export function FontPreview({
  family,
  text = "Aa",
  weight = 400,
  weights,
  style,
  className = "",
}: FontPreviewProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const encoded = family.replace(/ /g, "+");
          const linkId = `font-${encoded}`;

          if (!document.getElementById(linkId)) {
            const weightList = weights ?? [weight];
            const weightParam = weightList.sort((a, b) => a - b).join(";");

            const link = document.createElement("link");
            link.id = linkId;
            link.rel = "stylesheet";
            link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weightParam}&display=swap`;
            document.head.appendChild(link);
          }

          document.fonts
            .load(`${weight} 1em "${family}"`)
            .then(() => setLoaded(true))
            .catch(() => setLoaded(true));

          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [family, weight, weights]);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        fontFamily: `"${family}", sans-serif`,
        fontWeight: weight,
        ...style,
      }}
    >
      {text}
    </div>
  );
}

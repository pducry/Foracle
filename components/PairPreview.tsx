"use client";

import { useState } from "react";
import { FontPreview } from "./FontPreview";

type PairPreviewProps = {
  headingFamily: string;
  bodyFamily: string;
};

const DEFAULT_HEADING = "The quick brown fox jumps over the lazy dog";
const DEFAULT_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export function PairPreview({ headingFamily, bodyFamily }: PairPreviewProps) {
  const [headingText, setHeadingText] = useState(DEFAULT_HEADING);
  const [bodyText, setBodyText] = useState(DEFAULT_BODY);

  return (
    <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl p-8 lg:p-12">
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setHeadingText(e.currentTarget.textContent || DEFAULT_HEADING)}
        className="text-3xl lg:text-4xl mb-6 outline-none"
        style={{ fontFamily: `"${headingFamily}", sans-serif`, fontWeight: 700 }}
      >
        {headingText}
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setBodyText(e.currentTarget.textContent || DEFAULT_BODY)}
        className="text-base leading-relaxed text-[var(--color-text-secondary)] outline-none"
        style={{ fontFamily: `"${bodyFamily}", sans-serif`, fontWeight: 400 }}
      >
        {bodyText}
      </div>
      <FontPreview family={headingFamily} text="" weight={700} weights={[700]} className="hidden" />
      <FontPreview family={bodyFamily} text="" weight={400} weights={[400]} className="hidden" />
    </div>
  );
}

"use client";

type TypeSettings = {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: "left" | "center" | "right";
};

type TypeControlsProps = {
  settings: TypeSettings;
  onChange: (settings: TypeSettings) => void;
};

export type { TypeSettings };

export function TypeControls({ settings, onChange }: TypeControlsProps) {
  const update = (partial: Partial<TypeSettings>) =>
    onChange({ ...settings, ...partial });

  const reset = () =>
    onChange({ fontSize: 48, letterSpacing: 0, lineHeight: 1.2, textAlign: "left" });

  return (
    <div className="flex flex-wrap items-center gap-6 py-4">
      <label className="flex items-center gap-3 flex-1 min-w-[180px]">
        <span className="text-xs text-[var(--color-text-muted)] w-10 shrink-0">Size</span>
        <input type="range" min={12} max={120} value={settings.fontSize}
          onChange={(e) => update({ fontSize: Number(e.target.value) })}
          className="flex-1 accent-[var(--color-accent)]"
          aria-label="Font size" aria-valuemin={12} aria-valuemax={120} aria-valuenow={settings.fontSize} />
        <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">{settings.fontSize}px</span>
      </label>

      <label className="flex items-center gap-3 flex-1 min-w-[180px]">
        <span className="text-xs text-[var(--color-text-muted)] w-16 shrink-0">Spacing</span>
        <input type="range" min={-5} max={20} step={0.5} value={settings.letterSpacing}
          onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
          className="flex-1 accent-[var(--color-accent)]"
          aria-label="Letter spacing" aria-valuemin={-5} aria-valuemax={20} aria-valuenow={settings.letterSpacing} />
        <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">{settings.letterSpacing}px</span>
      </label>

      <label className="flex items-center gap-3 flex-1 min-w-[180px]">
        <span className="text-xs text-[var(--color-text-muted)] w-14 shrink-0">Height</span>
        <input type="range" min={0.8} max={2.0} step={0.05} value={settings.lineHeight}
          onChange={(e) => update({ lineHeight: Number(e.target.value) })}
          className="flex-1 accent-[var(--color-accent)]"
          aria-label="Line height" aria-valuemin={0.8} aria-valuemax={2.0} aria-valuenow={settings.lineHeight} />
        <span className="text-xs text-[var(--color-text-muted)] w-8 text-right">{settings.lineHeight.toFixed(1)}</span>
      </label>

      <div className="flex items-center gap-1">
        {(["left", "center", "right"] as const).map((align) => (
          <button key={align} onClick={() => update({ textAlign: align })}
            className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              settings.textAlign === align
                ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
            aria-label={`Align ${align}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {align === "left" && (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></>)}
              {align === "center" && (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>)}
              {align === "right" && (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" /></>)}
            </svg>
          </button>
        ))}
      </div>

      <button onClick={reset}
        className="w-8 h-8 flex items-center justify-center rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        aria-label="Reset type settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>
    </div>
  );
}

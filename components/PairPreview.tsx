"use client";

import { useState } from "react";
import { FontPreview } from "./FontPreview";

type PairPreviewProps = {
  headingFamily: string;
  bodyFamily: string;
};

type TypeSettings = {
  headingSize: number;
  bodySize: number;
  letterSpacing: number;
  lineHeight: number;
};

type Template = "landing" | "blog" | "ecommerce" | "dashboard";

function Slider({
  label, value, min, max, step, unit, onChange,
}: {
  label: string; value: number; min: number; max: number;
  step: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--color-text-muted)] w-20 shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1 appearance-none bg-[var(--color-border)] rounded-full
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[var(--color-text-primary)] [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <span className="text-sm text-[var(--color-text-muted)] w-14 text-right tabular-nums">
        {value}{unit}
      </span>
    </div>
  );
}

const TEMPLATES: { id: Template; label: string }[] = [
  { id: "landing", label: "Landing Page" },
  { id: "blog", label: "Blog" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "dashboard", label: "Dashboard" },
];

function LandingTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  return (
    <div className="p-8 lg:p-12 space-y-6">
      <div className="inline-block px-3 py-1 rounded-full border border-[var(--color-border)] text-xs" style={b}>
        New in 2026
      </div>
      <div contentEditable suppressContentEditableWarning className="outline-none" style={h}>
        Design that speaks volumes
      </div>
      <div contentEditable suppressContentEditableWarning
        className="text-[var(--color-text-secondary)] outline-none max-w-3xl" style={b}>
        Every great design begins with a story. The right typography gives your words personality,
        rhythm, and presence — turning simple messages into memorable experiences.
      </div>
      <div className="flex gap-3 pt-2">
        <div className="px-6 py-3 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium"
          style={{ fontFamily: b.fontFamily }}>
          Get Started Free
        </div>
        <div className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-sm"
          style={{ fontFamily: b.fontFamily }}>
          Watch Demo →
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--color-border)]">
        {[
          { num: "10K+", label: "Designers" },
          { num: "50M+", label: "Downloads" },
          { num: "4.9", label: "Rating" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ ...h, fontSize: `${parseInt(h.fontSize as string) * 0.6}px` }}>{s.num}</div>
            <div className="text-[var(--color-text-muted)] text-sm mt-1" style={{ fontFamily: b.fontFamily }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  return (
    <div className="p-8 lg:p-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-xs" style={{ fontFamily: b.fontFamily }}>
          <span className="uppercase tracking-widest">Typography</span>
          <span>·</span>
          <span>5 min read</span>
          <span>·</span>
          <span>Mar 2026</span>
        </div>
        <div contentEditable suppressContentEditableWarning className="outline-none"
          style={{ ...h, fontSize: `${parseInt(h.fontSize as string) * 0.85}px` }}>
          The invisible art of pairing typefaces
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)]" />
          <div>
            <div className="text-sm" style={{ fontFamily: b.fontFamily }}>Sarah Chen</div>
            <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>Type Designer</div>
          </div>
        </div>
        <div className="w-full h-48 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center">
          <span className="text-[var(--color-text-muted)] text-sm">Featured Image</span>
        </div>
        <div contentEditable suppressContentEditableWarning
          className="text-[var(--color-text-secondary)] outline-none" style={b}>
          Good typography is invisible. When two typefaces work in harmony, readers don't notice
          the fonts — they simply absorb the message. The contrast between a bold display face
          and a quiet text face creates visual hierarchy without effort, guiding the eye naturally
          through content.
        </div>
        <div className="border-l-2 border-[var(--color-text-muted)] pl-6">
          <div contentEditable suppressContentEditableWarning
            className="text-[var(--color-text-secondary)] italic outline-none"
            style={{ ...b, fontSize: `${parseInt(b.fontSize as string) * 1.15}px` }}>
            "Type is a beautiful group of letters, not a group of beautiful letters."
          </div>
          <div className="mt-2 text-[var(--color-text-muted)] text-xs" style={{ fontFamily: b.fontFamily }}>
            — Matthew Carter
          </div>
        </div>
        <div contentEditable suppressContentEditableWarning
          className="text-[var(--color-text-secondary)] outline-none" style={b}>
          The key is contrast with compatibility. Two fonts that are too similar create visual noise,
          while fonts that are too different create chaos. The sweet spot is a pair that shares
          underlying proportions but differs in expression.
        </div>
      </div>
    </div>
  );
}

function EcommerceTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  const products = [
    { name: "Minimal Desk Lamp", price: "$189", tag: "New" },
    { name: "Ceramic Vase Set", price: "$65", tag: "Sale" },
    { name: "Oak Writing Desk", price: "$420", tag: null },
  ];
  return (
    <div className="p-8 lg:p-12 space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <div contentEditable suppressContentEditableWarning className="outline-none"
            style={{ ...h, fontSize: `${parseInt(h.fontSize as string) * 0.7}px` }}>
            New Arrivals
          </div>
          <div className="text-[var(--color-text-muted)] text-sm mt-1" style={{ fontFamily: b.fontFamily }}>
            Curated pieces for modern living
          </div>
        </div>
        <div className="text-sm underline" style={{ fontFamily: b.fontFamily }}>View all →</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.name} className="group/card">
            <div className="aspect-[4/5] rounded-lg bg-[var(--color-bg-tertiary)] relative overflow-hidden flex items-center justify-center">
              <span className="text-[var(--color-text-muted)] text-sm">Product</span>
              {p.tag && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
                  style={{ fontFamily: b.fontFamily }}>
                  {p.tag}
                </span>
              )}
            </div>
            <div className="mt-3">
              <div className="text-sm font-medium" style={{ fontFamily: h.fontFamily }}>{p.name}</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-0.5" style={{ fontFamily: b.fontFamily }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border)]">
        <div>
          <div className="text-sm font-medium" style={{ fontFamily: h.fontFamily }}>Free shipping on orders over $100</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5" style={{ fontFamily: b.fontFamily }}>Use code FORACLE at checkout</div>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm"
          style={{ fontFamily: b.fontFamily }}>
          Shop Now
        </div>
      </div>
    </div>
  );
}

function DashboardTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  return (
    <div className="p-8 lg:p-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[var(--color-text-muted)] text-xs" style={{ fontFamily: b.fontFamily }}>Welcome back</div>
          <div contentEditable suppressContentEditableWarning className="outline-none"
            style={{ ...h, fontSize: `${parseInt(h.fontSize as string) * 0.55}px` }}>
            Analytics Overview
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs" style={{ fontFamily: b.fontFamily }}>Last 7 days</div>
          <div className="px-3 py-1.5 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-xs" style={{ fontFamily: b.fontFamily }}>Export</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Revenue", value: "$48,592", change: "+12.5%" },
          { label: "Active Users", value: "2,847", change: "+8.2%" },
          { label: "Conversion", value: "3.24%", change: "+0.4%" },
          { label: "Avg. Order", value: "$67.30", change: "-2.1%" },
        ].map((m) => (
          <div key={m.label} className="p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>{m.label}</div>
            <div className="mt-1 text-xl font-semibold" style={{ fontFamily: h.fontFamily }}>{m.value}</div>
            <div className={`text-xs mt-1 ${m.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
              style={{ fontFamily: b.fontFamily }}>
              {m.change}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium" style={{ fontFamily: h.fontFamily }}>Revenue Trend</div>
          <div className="flex gap-3 text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>
            <span>Daily</span><span className="text-[var(--color-text-primary)]">Weekly</span><span>Monthly</span>
          </div>
        </div>
        <div className="h-32 flex items-end gap-1.5">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-[var(--color-text-primary)]/20" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
        </div>
      </div>
    </div>
  );
}

export function PairPreview({ headingFamily, bodyFamily }: PairPreviewProps) {
  const [template, setTemplate] = useState<Template>("landing");
  const [settings, setSettings] = useState<TypeSettings>({
    headingSize: 48, bodySize: 18, letterSpacing: 0, lineHeight: 1.5,
  });

  const h: React.CSSProperties = {
    fontFamily: `"${headingFamily}", sans-serif`,
    fontWeight: 700,
    fontSize: `${settings.headingSize}px`,
    letterSpacing: `${settings.letterSpacing}em`,
    lineHeight: settings.lineHeight,
  };

  const b: React.CSSProperties = {
    fontFamily: `"${bodyFamily}", sans-serif`,
    fontWeight: 400,
    fontSize: `${settings.bodySize}px`,
    letterSpacing: `${settings.letterSpacing}em`,
    lineHeight: settings.lineHeight,
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Slider label="Heading" value={settings.headingSize} min={24} max={120} step={1} unit="px"
            onChange={(v) => setSettings((s) => ({ ...s, headingSize: v }))} />
          <Slider label="Body" value={settings.bodySize} min={12} max={48} step={1} unit="px"
            onChange={(v) => setSettings((s) => ({ ...s, bodySize: v }))} />
          <Slider label="Tracking" value={settings.letterSpacing} min={-0.05} max={0.3} step={0.005} unit="em"
            onChange={(v) => setSettings((s) => ({ ...s, letterSpacing: v }))} />
          <Slider label="Leading" value={settings.lineHeight} min={1} max={2.5} step={0.05} unit=""
            onChange={(v) => setSettings((s) => ({ ...s, lineHeight: v }))} />
        </div>
      </div>

      {/* Template tabs */}
      <div className="flex gap-1 p-1 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] w-fit">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              template === t.id
                ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-medium"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Template preview */}
      <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-text-muted)]/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-text-muted)]/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-text-muted)]/30" />
          </div>
          <span className="text-xs text-[var(--color-text-muted)] ml-2">
            {TEMPLATES.find((t) => t.id === template)?.label}
          </span>
        </div>
        {template === "landing" && <LandingTemplate h={h} b={b} />}
        {template === "blog" && <BlogTemplate h={h} b={b} />}
        {template === "ecommerce" && <EcommerceTemplate h={h} b={b} />}
        {template === "dashboard" && <DashboardTemplate h={h} b={b} />}
      </div>

      {/* Font loaders */}
      <FontPreview family={headingFamily} text="" weight={700} weights={[700]} className="hidden" />
      <FontPreview family={bodyFamily} text="" weight={400} weights={[400]} className="hidden" />
    </div>
  );
}

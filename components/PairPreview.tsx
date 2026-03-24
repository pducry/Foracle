"use client";

import { useState } from "react";
import { FontPreview } from "./FontPreview";
import { AsciiArt } from "./AsciiArt";

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

type Template = "blog" | "dashboard" | "dashboard2";

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
  { id: "blog", label: "Blog" },
  { id: "dashboard", label: "Dashboard" },
  { id: "dashboard2", label: "CRM" },
];

/* ─── BLOG ─── */
function BlogTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  const hs = (scale: number) => ({ ...h, fontSize: `${parseInt(h.fontSize as string) * scale}px` });
  return (
    <div>
      {/* Nav */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-[var(--color-border)]">
        <div className="font-bold text-sm" style={{ fontFamily: h.fontFamily }}>The Design Journal</div>
        <div className="flex gap-6 text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>
          <span className="text-[var(--color-text-primary)]">Articles</span>
          <span>Essays</span><span>Interviews</span><span>Newsletter</span>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-xs mb-6" style={{ fontFamily: b.fontFamily }}>
          <span className="uppercase tracking-widest">Typography</span>
          <span>·</span>
          <span>8 min read</span>
          <span>·</span>
          <span>March 23, 2026</span>
        </div>

        <div contentEditable suppressContentEditableWarning className="outline-none leading-tight"
          style={{ ...h, fontSize: `${parseInt(h.fontSize as string) * 0.9}px` }}>
          The invisible art of pairing typefaces
        </div>

        <div className="text-[var(--color-text-secondary)] mt-4" style={{ fontFamily: b.fontFamily, fontSize: `${parseInt(b.fontSize as string) * 1.1}px`, lineHeight: 1.6 }}>
          How the best designers create typographic systems that feel effortless
        </div>

        <div className="flex items-center gap-3 mt-8 pb-8 border-b border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)]" />
          <div>
            <div className="text-sm font-medium" style={{ fontFamily: b.fontFamily }}>Sarah Chen</div>
            <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>Senior Type Designer at Monotype · Author of "Letters in Motion"</div>
          </div>
        </div>

        <AsciiArt seed={3} className="my-8" />

        <div className="space-y-6">
          <div contentEditable suppressContentEditableWarning
            className="text-[var(--color-text-secondary)] outline-none" style={b}>
            Good typography is invisible. When two typefaces work in harmony, readers don't notice
            the fonts — they simply absorb the message. The contrast between a bold display face
            and a quiet text face creates visual hierarchy without effort, guiding the eye naturally
            through content.
          </div>

          <div contentEditable suppressContentEditableWarning className="outline-none" style={hs(0.55)}>
            The principles of contrast
          </div>

          <div contentEditable suppressContentEditableWarning
            className="text-[var(--color-text-secondary)] outline-none" style={b}>
            The most successful pairings share a common thread: they create contrast without conflict.
            A geometric sans-serif heading with an old-style serif body works because they differ in
            every dimension — construction, contrast, and mood — while maintaining compatible proportions.
          </div>

          <div className="border-l-2 border-[var(--color-text-muted)] pl-6 py-2">
            <div contentEditable suppressContentEditableWarning
              className="text-[var(--color-text-primary)] italic outline-none"
              style={{ fontFamily: h.fontFamily, fontSize: `${parseInt(b.fontSize as string) * 1.25}px`, lineHeight: 1.5 }}>
              "Type is a beautiful group of letters, not a group of beautiful letters."
            </div>
            <div className="mt-3 text-[var(--color-text-muted)] text-xs" style={{ fontFamily: b.fontFamily }}>
              — Matthew Carter, creator of Verdana and Georgia
            </div>
          </div>

          <AsciiArt seed={5} className="my-4" />

          <div contentEditable suppressContentEditableWarning
            className="text-[var(--color-text-secondary)] outline-none" style={b}>
            The key is understanding that similarity breeds monotony while excess contrast creates chaos.
            Two fonts that are too similar — like Helvetica and Arial — offer nothing to the composition.
            Two fonts that are wildly different — like a blackletter with a pixel font — fight for attention.
            The sweet spot lives between these extremes.
          </div>

          <div contentEditable suppressContentEditableWarning className="outline-none" style={hs(0.55)}>
            Building a type system
          </div>

          <AsciiArt seed={2} className="my-4" />

          <div contentEditable suppressContentEditableWarning
            className="text-[var(--color-text-secondary)] outline-none" style={b}>
            Beyond individual pairings, the most sophisticated designs build complete typographic systems.
            This means defining not just heading and body, but also caption styles, pull quotes, navigation
            type, data labels, and micro-copy. Each role in the system should feel intentional.
          </div>

          {/* Inline card */}
          <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-3" style={{ fontFamily: b.fontFamily }}>Key Takeaway</div>
            <div className="font-medium" style={{ fontFamily: h.fontFamily, fontSize: `${parseInt(b.fontSize as string) * 1.1}px` }}>
              Start with two fonts maximum. Add a third only when you have a clear role that neither can fill.
            </div>
          </div>
        </div>

        <AsciiArt seed={7} className="mt-8" />

        {/* Tags */}
        <div className="flex gap-2 mt-10 pt-8 border-t border-[var(--color-border)]">
          {["Typography", "Design Systems", "Pairing", "Best Practices"].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-muted)]"
              style={{ fontFamily: b.fontFamily }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CRM (Dashboard 2) ─── */
function CrmTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  const hs = (scale: number) => ({ ...h, fontSize: `${parseInt(h.fontSize as string) * scale}px` });
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-[var(--color-border)] p-4">
        <div className="font-bold text-sm mb-6" style={{ fontFamily: h.fontFamily }}>⬡ SalesOS</div>
        {[
          { label: "Pipeline", active: true },
          { label: "Contacts", active: false },
          { label: "Companies", active: false },
          { label: "Tasks", active: false },
          { label: "Reports", active: false },
          { label: "Sequences", active: false },
        ].map((item) => (
          <div key={item.label}
            className={`px-3 py-2 rounded-lg text-xs mb-0.5 ${item.active ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`}
            style={{ fontFamily: b.fontFamily }}>
            {item.label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div contentEditable suppressContentEditableWarning className="outline-none" style={hs(0.45)}>Pipeline</div>
          <div className="flex gap-2">
            <div className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs" style={{ fontFamily: b.fontFamily }}>Filter</div>
            <div className="px-3 py-1.5 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-xs" style={{ fontFamily: b.fontFamily }}>+ New Deal</div>
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { stage: "Lead", count: 24, value: "$142K" },
            { stage: "Qualified", count: 18, value: "$287K" },
            { stage: "Proposal", count: 12, value: "$534K" },
            { stage: "Negotiation", count: 6, value: "$312K" },
            { stage: "Closed Won", count: 8, value: "$891K" },
          ].map((s) => (
            <div key={s.stage} className="p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>{s.stage}</div>
              <div className="font-bold text-lg mt-1" style={{ fontFamily: h.fontFamily }}>{s.count}</div>
              <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Deals table */}
        <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="text-sm font-medium" style={{ fontFamily: h.fontFamily }}>Active Deals</div>
            <div className="flex gap-1 text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>
              <span className="px-2 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]">All</span>
              <span className="px-2 py-0.5">My Deals</span>
              <span className="px-2 py-0.5">Closing Soon</span>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider" style={{ fontFamily: b.fontFamily }}>
                <th className="text-left px-4 py-2 font-medium">Company</th>
                <th className="text-left px-4 py-2 font-medium">Contact</th>
                <th className="text-left px-4 py-2 font-medium">Stage</th>
                <th className="text-right px-4 py-2 font-medium">Value</th>
                <th className="text-right px-4 py-2 font-medium">Close Date</th>
                <th className="text-right px-4 py-2 font-medium">Probability</th>
              </tr>
            </thead>
            <tbody>
              {[
                { company: "Acme Corp", contact: "John Smith", stage: "Proposal", value: "$125,000", date: "Mar 28", prob: "75%" },
                { company: "TechFlow", contact: "Lisa Wang", stage: "Negotiation", value: "$89,000", date: "Mar 31", prob: "60%" },
                { company: "DataVault", contact: "Mark Rivera", stage: "Qualified", value: "$210,000", date: "Apr 12", prob: "40%" },
                { company: "CloudNine", contact: "Sarah Park", stage: "Lead", value: "$45,000", date: "Apr 20", prob: "20%" },
                { company: "Nexus Labs", contact: "Alex Chen", stage: "Proposal", value: "$178,000", date: "Apr 5", prob: "65%" },
                { company: "Vertex AI", contact: "Dana Müller", stage: "Negotiation", value: "$320,000", date: "Mar 30", prob: "80%" },
              ].map((d) => (
                <tr key={d.company} className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                  <td className="px-4 py-2.5 text-xs font-medium" style={{ fontFamily: h.fontFamily }}>{d.company}</td>
                  <td className="px-4 py-2.5 text-xs text-[var(--color-text-secondary)]" style={{ fontFamily: b.fontFamily }}>{d.contact}</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--color-bg-tertiary)]" style={{ fontFamily: b.fontFamily }}>{d.stage}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-right font-medium" style={{ fontFamily: h.fontFamily }}>{d.value}</td>
                  <td className="px-4 py-2.5 text-xs text-right text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>{d.date}</td>
                  <td className="px-4 py-2.5 text-xs text-right" style={{ fontFamily: b.fontFamily }}>{d.prob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Upcoming tasks */}
          <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
            <div className="text-sm font-medium mb-3" style={{ fontFamily: h.fontFamily }}>Upcoming Tasks</div>
            {[
              { task: "Follow up with Acme Corp", due: "Today", priority: "high" },
              { task: "Send proposal to Nexus Labs", due: "Tomorrow", priority: "high" },
              { task: "Schedule demo with DataVault", due: "Mar 25", priority: "medium" },
              { task: "Review contract terms — Vertex", due: "Mar 26", priority: "medium" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--color-border)] last:border-0">
                <div className={`w-2 h-2 rounded-full ${t.priority === "high" ? "bg-red-400" : "bg-yellow-400"}`} />
                <div className="flex-1 text-xs" style={{ fontFamily: b.fontFamily }}>{t.task}</div>
                <div className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>{t.due}</div>
              </div>
            ))}
          </div>

          {/* Team performance */}
          <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
            <div className="text-sm font-medium mb-3" style={{ fontFamily: h.fontFamily }}>Team Performance</div>
            {[
              { name: "Sarah K.", deals: 12, revenue: "$432K", bar: 90 },
              { name: "Mike R.", deals: 9, revenue: "$287K", bar: 65 },
              { name: "Lisa W.", deals: 7, revenue: "$198K", bar: 45 },
              { name: "Alex C.", deals: 5, revenue: "$156K", bar: 35 },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-bg-tertiary)] shrink-0" />
                <div className="w-16 text-xs" style={{ fontFamily: b.fontFamily }}>{m.name}</div>
                <div className="flex-1">
                  <div className="h-1.5 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--color-text-primary)]/30" style={{ width: `${m.bar}%` }} />
                  </div>
                </div>
                <div className="text-xs font-medium w-14 text-right" style={{ fontFamily: h.fontFamily }}>{m.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function DashboardTemplate({ h, b }: { h: React.CSSProperties; b: React.CSSProperties }) {
  const hs = (scale: number) => ({ ...h, fontSize: `${parseInt(h.fontSize as string) * scale}px` });
  const headingFont = h.fontFamily as string;
  const bodyFont = b.fontFamily as string;
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-56 shrink-0 border-r border-[var(--color-border)] flex flex-col">
        <div className="p-5 border-b border-[var(--color-border)]">
          <div className="font-bold" style={{ fontFamily: headingFont, fontSize: `${parseInt(h.fontSize as string) * 0.4}px` }}>◈ Acme</div>
          <div className="text-[9px] text-[var(--color-text-muted)] mt-1 font-mono opacity-50">heading font</div>
        </div>
        <div className="p-3 flex-1 space-y-0.5">
          {[
            { label: "Overview", icon: "◻", active: true },
            { label: "Analytics", icon: "◈", active: false },
            { label: "Customers", icon: "◇", active: false },
            { label: "Products", icon: "□", active: false },
            { label: "Invoices", icon: "▭", active: false },
            { label: "Reports", icon: "▦", active: false },
          ].map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs transition-colors ${
                item.active
                  ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] font-medium"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
              style={{ fontFamily: bodyFont }}>
              <span className="text-[10px] w-4 text-center">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[10px]" style={{ fontFamily: headingFont }}>AK</div>
            <div>
              <div className="text-xs font-medium" style={{ fontFamily: bodyFont }}>Alex Kim</div>
              <div className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: bodyFont }}>Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 space-y-6 overflow-hidden">
        {/* Header with font labels */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: bodyFont }}>Good morning, Alex</div>
            <div className="mt-1 flex items-baseline gap-3">
              <div contentEditable suppressContentEditableWarning className="outline-none" style={hs(0.55)}>
                Dashboard
              </div>
              <span className="text-[9px] text-[var(--color-text-muted)] font-mono opacity-50 shrink-0">← heading font</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 p-0.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              {["24h", "7d", "30d", "90d"].map((p, i) => (
                <span key={p} className={`px-2.5 py-1.5 rounded-md text-[10px] ${i === 1 ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`}
                  style={{ fontFamily: bodyFont }}>{p}</span>
              ))}
            </div>
            <div className="px-3 py-2 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-xs font-medium" style={{ fontFamily: bodyFont }}>
              Export
            </div>
          </div>
        </div>

        {/* KPI Row — large numbers in heading font */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Revenue", value: "$48,592", sub: "+12.5% vs last period", up: true, spark: [30,45,35,60,50,75,55,70,48,85,65,80] },
            { label: "Active Users", value: "2,847", sub: "+8.2% growth rate", up: true, spark: [40,35,50,45,55,50,60,55,65,58,70,68] },
            { label: "Conversion", value: "3.24%", sub: "+0.4pp improvement", up: true, spark: [28,30,29,32,31,33,30,34,32,35,33,36] },
            { label: "Avg. Order", value: "$67.30", sub: "-2.1% from target", up: false, spark: [72,70,68,71,69,67,70,66,68,65,67,64] },
          ].map((m) => (
            <div key={m.label} className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-3" style={{ fontFamily: bodyFont }}>{m.label}</div>
              <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: headingFont }}>{m.value}</div>
              <div className="flex items-center justify-between mt-3">
                <div className={`text-[10px] ${m.up ? "text-emerald-400" : "text-red-400"}`} style={{ fontFamily: bodyFont }}>
                  {m.sub}
                </div>
              </div>
              <div className="flex items-end gap-[2px] h-8 mt-3">
                {m.spark.map((v, i) => (
                  <div key={i} className={`flex-1 rounded-sm ${i === m.spark.length - 1 ? "bg-[var(--color-text-primary)]/40" : "bg-[var(--color-text-primary)]/12"}`}
                    style={{ height: `${v}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Font usage annotation */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--color-bg-secondary)]/50 border border-[var(--color-border)]/50">
          <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
            heading → KPI values, section titles, amounts &nbsp;|&nbsp; body → labels, descriptions, table data, navigation
          </span>
        </div>

        {/* Main chart area */}
        <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-semibold" style={{ fontFamily: headingFont }}>Revenue & Users</div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5" style={{ fontFamily: bodyFont }}>Dual-axis comparison over time</div>
            </div>
            <div className="flex gap-4 text-[10px]" style={{ fontFamily: bodyFont }}>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--color-text-primary)]/30" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400/50" /> Users</span>
            </div>
          </div>
          {/* Y axis labels + chart */}
          <div className="flex gap-2 mt-4">
            <div className="flex flex-col justify-between text-[9px] text-[var(--color-text-muted)] py-1" style={{ fontFamily: bodyFont }}>
              <span>$12k</span><span>$9k</span><span>$6k</span><span>$3k</span><span>$0</span>
            </div>
            <div className="flex-1">
              <div className="h-44 flex items-end gap-[3px] relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0,1,2,3,4].map((i) => <div key={i} className="border-t border-[var(--color-border)]/30" />)}
                </div>
                {[35,48,42,65,55,78,62,85,58,92,75,88,68,95,72,90,78,88,82,96].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-[1px] relative z-10">
                    <div className="rounded-sm bg-emerald-400/20" style={{ height: `${v * 0.4}%` }} />
                    <div className="rounded-sm bg-[var(--color-text-primary)]/20 hover:bg-[var(--color-text-primary)]/35 transition-colors" style={{ height: `${v}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-[var(--color-text-muted)]" style={{ fontFamily: bodyFont }}>
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"].map((d) => <span key={d}>{d}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column: Table + Activity */}
        <div className="grid grid-cols-[3fr_2fr] gap-4">
          {/* Rich table */}
          <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="text-sm font-semibold" style={{ fontFamily: headingFont }}>Top Customers</div>
              <div className="flex gap-1">
                {["All", "Enterprise", "SMB"].map((f, i) => (
                  <span key={f} className={`px-2 py-0.5 rounded text-[10px] ${i === 0 ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`}
                    style={{ fontFamily: bodyFont }}>{f}</span>
                ))}
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border)]" style={{ fontFamily: bodyFont }}>
                  <th className="text-left px-5 py-2.5 font-medium">Customer</th>
                  <th className="text-left px-3 py-2.5 font-medium">Plan</th>
                  <th className="text-right px-3 py-2.5 font-medium">MRR</th>
                  <th className="text-right px-5 py-2.5 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Stripe", plan: "Enterprise", mrr: "$12,400", growth: "+18%", avatar: "ST" },
                  { name: "Vercel", plan: "Enterprise", mrr: "$8,900", growth: "+24%", avatar: "VE" },
                  { name: "Linear", plan: "Business", mrr: "$6,200", growth: "+31%", avatar: "LI" },
                  { name: "Notion", plan: "Enterprise", mrr: "$5,800", growth: "+12%", avatar: "NO" },
                  { name: "Raycast", plan: "Business", mrr: "$4,100", growth: "+45%", avatar: "RA" },
                ].map((c) => (
                  <tr key={c.name} className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[8px] font-bold" style={{ fontFamily: headingFont }}>{c.avatar}</div>
                        <span className="text-xs font-medium" style={{ fontFamily: headingFont }}>{c.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] bg-[var(--color-bg-tertiary)]" style={{ fontFamily: bodyFont }}>{c.plan}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-right font-semibold tabular-nums" style={{ fontFamily: headingFont }}>{c.mrr}</td>
                    <td className="px-5 py-3 text-xs text-right text-emerald-400 tabular-nums" style={{ fontFamily: bodyFont }}>{c.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity feed + quick stats */}
          <div className="space-y-4">
            <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5">
              <div className="text-sm font-semibold mb-4" style={{ fontFamily: headingFont }}>Live Feed</div>
              <div className="space-y-0">
                {[
                  { icon: "↑", color: "text-emerald-400", action: "New signup", detail: "sarah@linear.app", time: "now" },
                  { icon: "$", color: "text-emerald-400", action: "Payment received", detail: "$2,400.00 · Stripe", time: "2m" },
                  { icon: "→", color: "text-blue-400", action: "Plan upgraded", detail: "Business → Enterprise", time: "5m" },
                  { icon: "↓", color: "text-red-400", action: "Churn risk", detail: "Acme Corp · 90 days inactive", time: "12m" },
                  { icon: "★", color: "text-amber-400", action: "Review", detail: "5/5 · 'Best tool we've used'", time: "18m" },
                  { icon: "$", color: "text-emerald-400", action: "Payment received", detail: "$890.00 · Notion", time: "25m" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--color-border)]/50 last:border-0">
                    <span className={`text-[10px] ${a.color} w-4 text-center mt-0.5`}>{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium" style={{ fontFamily: bodyFont }}>{a.action}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] truncate mt-0.5" style={{ fontFamily: bodyFont }}>{a.detail}</div>
                    </div>
                    <div className="text-[9px] text-[var(--color-text-muted)] shrink-0 mt-0.5" style={{ fontFamily: bodyFont }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "NPS Score", value: "72", sub: "Excellent" },
                { label: "Support", value: "1.2h", sub: "Avg response" },
                { label: "Uptime", value: "99.98%", sub: "Last 30 days" },
                { label: "API Calls", value: "2.4M", sub: "This month" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                  <div className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]" style={{ fontFamily: bodyFont }}>{s.label}</div>
                  <div className="text-lg font-bold mt-1" style={{ fontFamily: headingFont }}>{s.value}</div>
                  <div className="text-[9px] text-[var(--color-text-muted)]" style={{ fontFamily: bodyFont }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PairPreview({ headingFamily, bodyFamily }: PairPreviewProps) {
  const [template, setTemplate] = useState<Template>("blog");
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
        {template === "blog" && <BlogTemplate h={h} b={b} />}
        {template === "dashboard" && <DashboardTemplate h={h} b={b} />}
        {template === "dashboard2" && <CrmTemplate h={h} b={b} />}
      </div>

      {/* Font loaders */}
      <FontPreview family={headingFamily} text="" weight={700} weights={[700]} className="hidden" />
      <FontPreview family={bodyFamily} text="" weight={400} weights={[400]} className="hidden" />
    </div>
  );
}

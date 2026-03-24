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
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-52 shrink-0 border-r border-[var(--color-border)] p-4 space-y-1">
        <div className="font-bold text-sm mb-6" style={{ fontFamily: h.fontFamily }}>◈ Acme</div>
        {[
          { label: "Overview", active: true },
          { label: "Analytics", active: false },
          { label: "Customers", active: false },
          { label: "Products", active: false },
          { label: "Orders", active: false },
          { label: "Settings", active: false },
        ].map((item) => (
          <div key={item.label}
            className={`px-3 py-2 rounded-lg text-xs ${item.active ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`}
            style={{ fontFamily: b.fontFamily }}>
            {item.label}
          </div>
        ))}
        <div className="pt-6 mt-6 border-t border-[var(--color-border)]">
          <div className="px-3 py-2 text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>Team Plan</div>
          <div className="px-3 mt-1">
            <div className="h-1.5 rounded-full bg-[var(--color-bg-tertiary)] overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-[var(--color-text-primary)]/40" />
            </div>
            <div className="text-[10px] text-[var(--color-text-muted)] mt-1" style={{ fontFamily: b.fontFamily }}>75% of plan used</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>Good morning, Alex</div>
            <div contentEditable suppressContentEditableWarning className="outline-none mt-1" style={hs(0.5)}>
              Dashboard
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-xs" style={{ fontFamily: b.fontFamily }}>
              Mar 17 – Mar 23
            </div>
            <div className="px-3 py-2 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-xs" style={{ fontFamily: b.fontFamily }}>
              Download Report
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Revenue", value: "$48,592", change: "+12.5%", up: true, spark: [3,5,4,7,6,8,7] },
            { label: "Active Users", value: "2,847", change: "+8.2%", up: true, spark: [4,3,5,4,6,5,7] },
            { label: "Conversion", value: "3.24%", change: "+0.4%", up: true, spark: [3,3,4,3,4,4,5] },
            { label: "Churn Rate", value: "1.2%", change: "-0.3%", up: false, spark: [5,4,5,4,3,3,2] },
          ].map((m) => (
            <div key={m.label} className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>{m.label}</div>
                <div className="flex items-end gap-px h-4">
                  {m.spark.map((v, i) => (
                    <div key={i} className="w-1 rounded-sm bg-[var(--color-text-primary)]/20" style={{ height: `${v * 14}%` }} />
                  ))}
                </div>
              </div>
              <div className="mt-2 text-xl font-bold" style={{ fontFamily: h.fontFamily }}>{m.value}</div>
              <div className={`text-xs mt-1 ${m.up ? "text-green-400" : "text-red-400"}`} style={{ fontFamily: b.fontFamily }}>
                {m.change} vs last week
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          {/* Chart */}
          <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium" style={{ fontFamily: h.fontFamily }}>Revenue Overview</div>
              <div className="flex gap-1 p-0.5 rounded-lg bg-[var(--color-bg-tertiary)]">
                {["Daily", "Weekly", "Monthly"].map((p, i) => (
                  <span key={p} className={`px-2.5 py-1 rounded-md text-[10px] ${i === 1 ? "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`}
                    style={{ fontFamily: b.fontFamily }}>{p}</span>
                ))}
              </div>
            </div>
            <div className="h-40 flex items-end gap-2">
              {[35, 55, 40, 70, 50, 85, 65, 80, 55, 90, 72, 88, 60, 95].map((v, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-[var(--color-text-primary)]/15 hover:bg-[var(--color-text-primary)]/30 transition-colors"
                  style={{ height: `${v}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-5">
            <div className="text-sm font-medium mb-4" style={{ fontFamily: h.fontFamily }}>Recent Activity</div>
            <div className="space-y-3">
              {[
                { action: "New order", detail: "#4821 · $234.00", time: "2m ago" },
                { action: "User signed up", detail: "alex@company.io", time: "5m ago" },
                { action: "Refund processed", detail: "#4789 · $67.00", time: "12m ago" },
                { action: "New order", detail: "#4820 · $89.00", time: "18m ago" },
                { action: "Review received", detail: "★★★★★ · Desk Lamp", time: "25m ago" },
                { action: "Subscription", detail: "Pro plan · Monthly", time: "34m ago" },
              ].map((a, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                  <div>
                    <div className="text-xs" style={{ fontFamily: b.fontFamily }}>{a.action}</div>
                    <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5" style={{ fontFamily: b.fontFamily }}>{a.detail}</div>
                  </div>
                  <div className="text-[10px] text-[var(--color-text-muted)] shrink-0" style={{ fontFamily: b.fontFamily }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="text-sm font-medium" style={{ fontFamily: h.fontFamily }}>Top Products</div>
            <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: b.fontFamily }}>This week</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider" style={{ fontFamily: b.fontFamily }}>
                <th className="text-left px-5 py-2.5 font-medium">Product</th>
                <th className="text-right px-5 py-2.5 font-medium">Sales</th>
                <th className="text-right px-5 py-2.5 font-medium">Revenue</th>
                <th className="text-right px-5 py-2.5 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Aura Pendant Light", sales: "142", revenue: "$48,280", growth: "+24%" },
                { name: "Mono Desk Organizer", sales: "98", revenue: "$16,170", growth: "+18%" },
                { name: "Arc Floor Mirror", sales: "67", revenue: "$34,840", growth: "+12%" },
                { name: "Zen Ceramic Vase", sales: "203", revenue: "$18,067", growth: "+31%" },
              ].map((p) => (
                <tr key={p.name} className="border-t border-[var(--color-border)]">
                  <td className="px-5 py-3 text-xs" style={{ fontFamily: b.fontFamily }}>{p.name}</td>
                  <td className="px-5 py-3 text-xs text-right" style={{ fontFamily: b.fontFamily }}>{p.sales}</td>
                  <td className="px-5 py-3 text-xs text-right font-medium" style={{ fontFamily: h.fontFamily }}>{p.revenue}</td>
                  <td className="px-5 py-3 text-xs text-right text-green-400" style={{ fontFamily: b.fontFamily }}>{p.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

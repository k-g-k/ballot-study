// AI-synthesis presentation blocks. "AI synthesis" is a layer, not a section:
// a labeled purple treatment with a prompt/sources popover.

import type { ReactNode } from "react";
import { Card } from "./Card";
import { Cite, SynthSourcesNote } from "./citations";
import type { SrcKind } from "../types";

// Lead summary card for a tab: card title, AI-synthesized paragraphs in a
// purple citation-line block, then the AI Synthesis chip + prompt/sources
// popover.
export function SynthSummaryCard({
  title,
  subtitle,
  ids,
  prompt,
  children,
}: {
  title: string;
  subtitle?: string;
  ids: string[];
  prompt?: string;
  children: ReactNode;
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div className="border-l-[3px] border-[#a855f7] pl-[14px]">
        <div className="space-y-[12px] font-['Nunito'] text-[14px] text-black leading-[1.6]">
          {children}
        </div>
        <SynthSourcesNote ids={ids} prompt={prompt} />
      </div>
    </Card>
  );
}

// A labeled purple AI-synthesis block. Pass `ids` for its own prompt/sources
// popover; omit them when a parent renders one shared attribution instead.
export function AnalysisSection({
  title,
  ids,
  prompt,
  children,
}: {
  title: string;
  ids?: string[];
  prompt?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-[3px] border-[#a855f7] pl-[14px]">
      <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[6px]">
        {title}
      </p>
      {children}
      {ids && <SynthSourcesNote ids={ids} prompt={prompt} />}
    </div>
  );
}

// Compact purple synthesis box with an inline chip.
export function AISynth({
  title,
  ids,
  children,
}: {
  title: string;
  ids?: string[];
  children: ReactNode;
}) {
  return (
    <div className="bg-[#f5f3ff] border border-[#d8b4fe] rounded-[6px] p-[16px]">
      <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
        <span className="bg-[#ede9fe] text-[#6b21a8] font-['Nunito'] font-bold text-[9px] tracking-[0.08em] uppercase px-[7px] py-[2px] rounded-[4px]">
          AI synthesis
        </span>
        <p className="font-['Nunito'] font-semibold text-[14px] text-[#6b21a8]">
          {title}
          {ids && <Cite ids={ids} />}
        </p>
      </div>
      <div className="font-['Nunito'] text-[14px] text-black leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

// Source-type-coded content box (official / user / outside / ai).
export function ContentItem({
  type,
  children,
}: {
  type: SrcKind;
  children: ReactNode;
}) {
  const c = {
    official: {
      bg: "bg-[#dbeafe]",
      bd: "border-[#93c5fd]",
      tx: "text-[#1e40af]",
    },
    user: { bg: "bg-[#fed7aa]", bd: "border-[#fdba74]", tx: "text-[#9a3412]" },
    outside: {
      bg: "bg-[#bbf7d0]",
      bd: "border-[#86efac]",
      tx: "text-[#166534]",
    },
    ai: { bg: "bg-[#e9d5ff]", bd: "border-[#d8b4fe]", tx: "text-[#6b21a8]" },
  }[type];
  return (
    <div className={`${c.bg} border ${c.bd} rounded-[6px] px-[12px] py-[8px]`}>
      <div className={`font-['Nunito'] text-[14px] ${c.tx} tracking-[0.14px]`}>
        {children}
      </div>
    </div>
  );
}

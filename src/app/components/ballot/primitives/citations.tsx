// The citation / provenance stack. Every component here resolves source ids
// against the registry supplied by <SourcesProvider> (useSources()), so the
// same components work for any ballot question.

import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { useSources } from "../sources-context";
import { SRC_CHIP } from "../types";
import { shortSourceName } from "../helpers";

// Inline superscript citation chips — each links out to a verified source.
export function Cite({ ids }: { ids: string[] }) {
  const sources = useSources();
  return (
    <sup className="ml-[3px] whitespace-nowrap">
      {ids.map((id, i) => {
        const s = sources[id];
        if (!s) return null;
        return (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            className="font-['Nunito'] font-bold text-[10px] text-[#6b21a8] no-underline hover:text-[#12266f]"
          >
            [{i > 0 ? "" : "src"}
            {i > 0 ? i + 1 : ""}↗]
          </a>
        );
      })}
    </sup>
  );
}

// Muted "Source: …" line linking each id.
export function SourceNote({ ids, text }: { ids?: string[]; text?: string }) {
  const sources = useSources();
  return (
    <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[8px] leading-[1.5]">
      {text ? `${text} ` : "Source: "}
      {ids?.map((id, i) => {
        const s = sources[id];
        if (!s) return null;
        return (
          <span key={id}>
            {i > 0 && "; "}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#12266f] hover:text-[#c71e32]"
            >
              {s.label}
              {s.date ? ` (${s.date})` : ""}
            </a>
          </span>
        );
      })}
    </p>
  );
}

// Source line for AI-synthesized passages: sparkle badge, then each source as
// a short-name link with an outbound arrow.
export function AISynthSources({ ids }: { ids: string[] }) {
  const sources = useSources();
  return (
    <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[8px] leading-[1.5]">
      <Sparkles className="w-[12px] h-[12px] text-[#6b21a8] inline-block align-[-1.5px] mr-[4px]" />
      AI Synthesis of{" "}
      {ids.map((id, i) => {
        const s = sources[id];
        if (!s) return null;
        return (
          <span key={id}>
            {i > 0 && "; "}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#12266f] hover:text-[#c71e32] whitespace-nowrap"
            >
              {shortSourceName(s)}
              <ArrowUpRight className="w-[11px] h-[11px] inline-block align-[-1px]" />
            </a>
          </span>
        );
      })}
    </p>
  );
}

// Sources popover trigger.
//  - "ai" (default): muted AI Synthesis chip + "View Prompt & Sources".
//  - "plain": no chip, "View Sources" — for non-AI provenance (e.g. claims).
// Opens a bibliography popover (optional prompt, then each source with
// provenance chip, title, issuer · date, note, outbound link). Closes on
// outside click or Escape.
export function SynthSourcesNote({
  ids,
  prompt,
  variant = "ai",
  linkClass,
  inline = false,
}: {
  ids: string[];
  prompt?: string;
  variant?: "ai" | "plain";
  /** Tailwind text/hover classes for the plain-variant trigger. */
  linkClass?: string;
  /** Render as an inline trigger (e.g. at the end of a sentence). */
  inline?: boolean;
}) {
  const sources = useSources();
  const [open, setOpen] = useState(false);
  // Open downward by default; flip up when there isn't room below the trigger.
  const [placement, setPlacement] = useState<"down" | "up">("down");
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = wrapRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const POPOVER_MAX = 440; // max-h-[420px] + margin
      setPlacement(
        spaceBelow < POPOVER_MAX && spaceAbove > spaceBelow ? "up" : "down",
      );
    }
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerLabel =
    variant === "ai"
      ? "View Prompt & Sources"
      : ids.length === 1
        ? "View Source"
        : "View Sources";
  const triggerClass = `font-['Nunito'] font-semibold text-[13px] underline decoration-dotted underline-offset-[4px] cursor-pointer ${
    variant === "ai"
      ? "text-[#6b21a8] hover:text-[#4c1d95]"
      : (linkClass ?? "text-[#12266f] hover:text-[#c71e32]")
  }`;
  const trigger = (
    <button
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={triggerClass}
    >
      {triggerLabel}
    </button>
  );
  const popover = open && (
    <div
      role="dialog"
      aria-label="Sources"
      className={`absolute left-0 ${
        placement === "up" ? "bottom-full mb-[8px]" : "top-full mt-[8px]"
      } w-[440px] max-w-[80vw] max-h-[420px] overflow-y-auto bg-white border border-[#d1d1d1] rounded-[8px] shadow-[0_10px_28px_rgba(0,0,0,0.14)] p-[18px] z-30 text-left`}
    >
      {prompt && (
        <div className="border-b border-dotted border-[#d1d1d1] mb-[14px] pb-[14px]">
          <span className="inline-block bg-white border border-[#d8b4fe] text-[#6b21a8] font-['Nunito'] font-bold text-[10px] tracking-[0.08em] uppercase px-[8px] py-[2px] rounded-[6px]">
            Prompt
          </span>
          <p className="font-['Nunito'] text-[13px] text-black leading-[1.5] mt-[8px]">
            {prompt}
          </p>
        </div>
      )}
      {ids.map((id, i) => {
        const s = sources[id];
        if (!s) return null;
        const chip = SRC_CHIP[s.kind];
        const metaLine =
          s.meta && s.date && !s.meta.includes(s.date)
            ? `${s.meta} · ${s.date}`
            : (s.meta ?? s.date);
        return (
          <div
            key={id}
            className={
              i > 0
                ? "border-t border-dotted border-[#d1d1d1] mt-[14px] pt-[14px]"
                : ""
            }
          >
            <span
              className={`inline-block bg-white border ${chip.bd} ${chip.tx} font-['Nunito'] font-bold text-[10px] tracking-[0.08em] uppercase px-[8px] py-[2px] rounded-[6px]`}
            >
              {chip.label}
            </span>
            <p className="font-['Nunito'] font-bold text-[14px] text-black leading-[1.4] mt-[8px]">
              {s.title ?? s.label}
            </p>
            {metaLine && (
              <p className="font-['Nunito'] text-[13px] text-[#808080] mt-[2px]">
                {metaLine}
              </p>
            )}
            {s.note && (
              <p className="font-['Nunito'] text-[13px] text-black leading-[1.5] mt-[4px]">
                {s.note}
              </p>
            )}
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[3px] font-['Nunito'] font-bold text-[13px] text-[#12266f] underline underline-offset-2 hover:text-[#c71e32] mt-[6px]"
              >
                Open source <ArrowUpRight className="w-[13px] h-[13px]" />
              </a>
            ) : (
              <p className="font-['Nunito'] text-[13px] text-[#808080] mt-[6px]">
                Link not yet on file
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  if (inline) {
    return (
      <span ref={wrapRef} className="relative inline-block">
        {trigger}
        {popover}
      </span>
    );
  }
  return (
    <span ref={wrapRef} className="relative block mt-[10px]">
      <span className="flex items-center gap-[10px] flex-wrap">
        {variant === "ai" && (
          <span className="inline-flex items-center gap-[4px] bg-white border border-[#e2d6f5] text-[#8b6fb3] font-['Nunito'] font-bold text-[10px] tracking-[0.08em] uppercase px-[7px] py-[2px] rounded-[4px]">
            <Sparkles className="w-[10px] h-[10px]" />
            AI Synthesis
          </span>
        )}
        {trigger}
      </span>
      {popover}
    </span>
  );
}

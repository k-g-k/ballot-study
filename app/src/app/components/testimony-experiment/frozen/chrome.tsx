// FROZEN COPY. Do not edit to follow a change made elsewhere.
//
// /testimony-experiment is a snapshot: it should keep looking and behaving
// exactly as it did the day it was taken, while the ballot page it came from
// keeps moving. So it owns this copy rather than importing the original, and
// nothing outside this folder should import from here.
//
// Copied from tax-rebate-62f-alt/index.tsx (the viewport hook and the site nav).

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV = ["Ballot questions", "Bills", "Hearings", "Testimony", "About"];

/**
 * index.html pins the layout viewport to 875px and scales it to fit, which is
 * how the fixed-width pages reach a phone. This page reflows instead, so it
 * opts out and asks for the real device width. The flag is read by the script
 * in index.html, including on rotation, and cleared on the way out.
 */
export function useDeviceWidthViewport() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.viewport = "device";
    const refit = (window as unknown as { __mapleFitViewport?: () => void })
      .__mapleFitViewport;
    refit?.();
    return () => {
      delete root.dataset.viewport;
      refit?.();
    };
  }, []);
}
/** Paper rather than a coloured slab: the page's material starts at the top. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    // Not pinned at all here: the feed's own filter bar is the thing worth
    // keeping in view, and two stacked sticky bars eat the top of the window.
    <header className="relative z-30 bg-ground border-b border-line">
      <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] h-[var(--nav-h)] flex items-center gap-[32px]">
        <span className="font-display font-semibold text-xl text-brand tracking-heading">
          MAPLE
        </span>
        <nav className="hidden lg:flex items-center gap-[22px]">
          {NAV.map((n) => (
            <button
              key={n}
              className="font-body text-base text-ink-muted hover:text-ink cursor-pointer"
            >
              {n}
            </button>
          ))}
        </nav>
        <button className="ml-auto hidden sm:inline-flex font-body font-semibold text-sm text-ink-inverse bg-brand hover:bg-brand-hover px-[16px] py-[8px] rounded-control cursor-pointer">
          Sign in
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto lg:hidden inline-flex items-center justify-center w-[40px] h-[40px] -mr-[8px] rounded-control text-ink hover:bg-wash cursor-pointer"
        >
          {open ? (
            <X className="w-[20px] h-[20px]" />
          ) : (
            <Menu className="w-[20px] h-[20px]" />
          )}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-line">
          <nav className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] py-[8px] flex flex-col">
            {NAV.map((n) => (
              <button
                key={n}
                className="text-left font-body text-lg text-ink py-[10px] border-b border-line last:border-0 cursor-pointer"
              >
                {n}
              </button>
            ))}
            <button className="sm:hidden mt-[12px] mb-[8px] font-body font-semibold text-base text-ink-inverse bg-brand px-[16px] py-[10px] rounded-control cursor-pointer">
              Sign in
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}


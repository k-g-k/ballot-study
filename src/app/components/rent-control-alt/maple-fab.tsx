// "Maple" — a floating assistant button (bottom-right). Clicking opens a small
// "Ask Maple a question" panel. Prototype stub: the input doesn't submit
// anywhere yet, consistent with the page's other "Ask MAPLE" affordances.

import { useState } from "react";
import { X } from "lucide-react";
import mapleUrl from "../../../assets/maplesunniesheadtilt.png";

export function MapleFab() {
  const [open, setOpen] = useState(false);
  // Bumped on every click to replay the one-shot "pop" animation (via key).
  const [pop, setPop] = useState(0);
  return (
    <div className="fixed bottom-[24px] right-[24px] z-50 flex flex-col items-end gap-[12px]">
      {/* Easter-egg animation: bouncy spin on click (keyframe), lift + tilt on hover. */}
      <style>{`
        @keyframes maple-wave {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(-12deg); }
          40%  { transform: rotate(9deg); }
          60%  { transform: rotate(-6deg); }
          80%  { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
      {open && (
        <div className="w-[320px] bg-white border border-[#dee2e6] rounded-[14px] shadow-[0_12px_32px_rgba(0,0,0,0.18)] p-[16px]">
          <div className="flex items-center gap-[8px] mb-[6px]">
            <img src={mapleUrl} alt="" className="w-[24px] h-[24px]" />
            <p className="font-['Nunito'] font-bold text-[15px] text-black flex-1">
              Ask Maple a question
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-[#808080] hover:text-black cursor-pointer"
            >
              <X className="w-[16px] h-[16px]" />
            </button>
          </div>
          <p className="font-['Nunito'] text-[12px] text-[#606060] leading-[1.5] mb-[10px]">
            Answers draw only from the sources on this page and cite them.
          </p>
          <textarea
            rows={3}
            placeholder="e.g. I own a two-family and live upstairs; would my building be covered?"
            className="w-full resize-none border border-[#d1d1d1] rounded-[8px] p-[10px] font-['Nunito'] text-[13px] text-black placeholder:text-[#a0a0a0] focus:outline-none focus:border-[#12266f]"
          />
          <button className="mt-[10px] w-full bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[12px] py-[8px] rounded-[8px] cursor-pointer">
            Ask Maple
          </button>
        </div>
      )}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setPop((c) => c + 1);
        }}
        aria-label="Ask Maple a question"
        aria-expanded={open}
        title="Ask Maple a question"
        className="group w-[56px] h-[56px] rounded-full bg-white border border-[#dee2e6] shadow-[0_8px_24px_rgba(0,0,0,0.18)] flex items-center justify-center cursor-pointer hover:shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition-shadow duration-200"
      >
        {/* Wrapper carries the one-shot click "wave" (rotation); the img inside
            carries the hover grow/tilt, so the two compose without fighting.
            Remounting via key restarts the wave on each click. */}
        <span
          key={pop}
          className={`inline-flex ${pop > 0 ? "animate-[maple-wave_0.6s_ease-out]" : ""}`}
        >
          <img
            src={mapleUrl}
            alt=""
            className="w-[50px] h-[50px] transition-transform duration-200 group-hover:scale-[1.14] group-hover:-rotate-[8deg]"
          />
        </span>
      </button>
    </div>
  );
}

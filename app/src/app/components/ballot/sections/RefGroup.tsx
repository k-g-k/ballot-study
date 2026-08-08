import { ExternalLink } from "lucide-react";
import { useSources } from "../sources-context";

// A titled, bulleted bibliography group rendered from source ids in the
// registry (title — meta · date — note — link).
export function RefGroup({ title, ids }: { title?: string; ids: string[] }) {
  const sources = useSources();
  return (
    <div>
      {title && (
        <p className="font-['Nunito'] font-semibold text-[14px] text-black mb-[8px]">
          {title}
        </p>
      )}
      <ul className="list-disc list-outside pl-[18px] space-y-[8px]">
        {ids.map((id) => {
          const s = sources[id];
          if (!s) return null;
          const metaLine =
            s.meta && s.date && !s.meta.includes(s.date)
              ? `${s.meta} · ${s.date}`
              : (s.meta ?? s.date);
          return (
            <li
              key={id}
              className="font-['Nunito'] text-[13px] text-[#334156] leading-[1.5]"
            >
              <span className="font-semibold text-black">
                {s.title ?? s.label}
              </span>
              {metaLine && (
                <span className="italic text-[#606060]"> — {metaLine}</span>
              )}
              {s.note && <> — {s.note}</>}
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Nunito'] text-[12px] font-bold text-[#12266f] hover:text-[#c71e32] inline-flex items-center gap-[3px] ml-[4px] align-baseline"
                >
                  Source <ExternalLink className="w-[11px] h-[11px]" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

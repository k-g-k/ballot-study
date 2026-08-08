import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageWindow } from "../helpers";

// Numbered pager: ‹ 1 2 3 … n › — current page bold black, others link blue,
// chevrons disabled at the ends.
export function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-[14px] mt-[18px]">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="text-[#334156] hover:text-[#c71e32] cursor-pointer disabled:text-[#c9c9c9] disabled:cursor-default"
      >
        <ChevronLeft className="w-[16px] h-[16px]" />
      </button>
      {pageWindow(page, pageCount).map((item, i) =>
        item === "…" ? (
          <span
            key={`gap-${i}`}
            className="font-['Nunito'] text-[13px] text-[#808080]"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPage(item)}
            aria-current={item === page ? "page" : undefined}
            className={`font-['Nunito'] text-[13px] cursor-pointer ${
              item === page
                ? "font-bold text-black cursor-default"
                : "text-[#12266f] hover:text-[#c71e32]"
            }`}
          >
            {item + 1}
          </button>
        ),
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page >= pageCount - 1}
        aria-label="Next page"
        className="text-[#334156] hover:text-[#c71e32] cursor-pointer disabled:text-[#c9c9c9] disabled:cursor-default"
      >
        <ChevronRight className="w-[16px] h-[16px]" />
      </button>
    </div>
  );
}

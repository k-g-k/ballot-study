// Empty / invitation state. `shareOnly` drops every action except
// "Share your perspective".
export function EmptyState({
  title,
  body,
  shareOnly = false,
}: {
  title: string;
  body: string;
  shareOnly?: boolean;
}) {
  return (
    <div className="border-[1.5px] border-dashed border-[#d1d1d1] rounded-[12px] p-[22px] text-center bg-[#fbfaf7]">
      <p className="font-['Nunito'] font-bold text-[15px] text-black mb-[4px]">
        {title}
      </p>
      <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.5] max-w-[560px] mx-auto">
        {body}
      </p>
      <div className="flex gap-[10px] justify-center mt-[14px] flex-wrap">
        <button className="bg-[#12266f] text-white font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px]">
          Share your perspective
        </button>
        {!shareOnly && (
          <button className="bg-white border border-[#12266f] text-[#12266f] font-['Nunito'] font-bold text-[13px] px-[18px] py-[8px] rounded-[100px]">
            Ask a question
          </button>
        )}
      </div>
    </div>
  );
}

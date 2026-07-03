import { Card, DelibStat, DelibThemeCol } from "../../ballot";
import { DELIB_THEMES, DELIB_TRANSCRIPTS } from "../../../data/rent-control";

export function CitizenDeliberationsTab() {
  const linkClass =
    "font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] cursor-pointer";
  return (
    <div className="flex flex-col gap-[16px]">
      <Card
        title="Deliberation on This Question"
        subtitle="Sample layout — deliberations begin fall 2026."
      >
        <p className="font-['Nunito'] text-[14px] text-black leading-[1.6]">
          Massachusetts residents meet in facilitated groups — in person through
          GenUnity and the Mass Voter Table's Democracy Hubs, and online every
          Wednesday at 7pm — to reason through this question together. Sessions
          are recorded and synthesized with Dembrane ECHO; anonymized
          transcripts are public, so every synthesized claim below can be
          checked against what was actually said.
        </p>
        <div className="flex gap-[10px] flex-wrap mt-[16px]">
          <DelibStat n="3" label="in-person cohorts" />
          <DelibStat n="2" label="online sessions" />
          <DelibStat n="87" label="deliberators" />
          <DelibStat n="6" label="regions" />
          <DelibStat n="5" label="public transcripts" />
        </div>
        <p className="font-['Nunito'] text-[13px] text-[#606060] leading-[1.55] mt-[14px]">
          Deliberators are recruited across geography, age, housing situation
          (renters, owners, landlords), and politics, with informed consent for
          recording and publication.{" "}
          <button className={linkClass}>How deliberations work →</button>
        </p>
      </Card>

      <Card
        title="Themes from Deliberation"
        subtitle="Each theme shows where groups agreed, where they split, and the trade-off they weighed — synthesized from session transcripts; every theme links to its transcript segments. (Illustrative)"
      >
        <div className="space-y-[26px]">
          {DELIB_THEMES.map((th) => (
            <div key={th.title}>
              <p className="font-['Nunito'] font-bold text-[15px] text-black leading-[1.45]">
                {th.title}
              </p>
              <div className="flex gap-[24px] max-lg:flex-col max-lg:gap-[14px] mt-[12px]">
                <DelibThemeCol label="Where groups agreed" text={th.agreed} />
                <DelibThemeCol label="Where they split" text={th.split} />
                <DelibThemeCol label="The trade-off weighed" text={th.tradeoff} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Anonymized Transcripts"
        subtitle="Full session transcripts with names and identifying details removed. The synthesis above is generated from these — check it. (Sample listing)"
      >
        <div>
          {DELIB_TRANSCRIPTS.map((t) => (
            <div
              key={t.title}
              className="flex items-center justify-between gap-[24px] py-[16px] border-b border-dotted border-[#d1d1d1] first:pt-0"
            >
              <div className="min-w-0">
                <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.4]">
                  {t.title}
                </p>
                <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[2px]">
                  {t.meta}
                </p>
              </div>
              <button className="font-['Nunito'] font-bold text-[13px] text-[#12266f] hover:text-[#c71e32] underline underline-offset-[4px] cursor-pointer whitespace-nowrap shrink-0">
                Read transcript →
              </button>
            </div>
          ))}
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#808080] mt-[18px] leading-[1.5]">
          Recording, transcription, and theme extraction run on Dembrane ECHO.
          Participants consent to publication; redaction follows our privacy
          policy.
        </p>
      </Card>
    </div>
  );
}

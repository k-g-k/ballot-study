// The compose form on a page of its own.
//
// The testimony rail can hold this form, and for a paragraph that is enough
// room. For an argument it is not: 420px is a narrow column to build a case in,
// and the guidance has to sit above the writing rather than beside it. So the
// rail offers a way out to here, where the form gets the page's full measure
// and the guidance gets its own column back.
//
// Same fields, same wording, same order. Only the shell differs, so the two
// cannot drift into two slightly different forms.

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { RC, SOURCES } from "../../data/tax-rebate-62f";
import { SourcesProvider } from "../ballot";
import {
  COMPOSE_TITLE,
  ComposeActions,
  ComposeFields,
  ComposeGuidance,
} from "../tax-rebate-62f/testimony";
import type { TestimonyStance } from "../../data/tax-rebate-62f";
import { SiteNav } from "./index";

/** Where the rail's "More room" link goes. */
export const COMPOSE_PATH = "/ballotQuestions/tax-rebate-62f-alt3/compose";

export default function ComposePage() {
  const [stance, setStance] = useState<TestimonyStance>("endorse");

  return (
    <SourcesProvider value={SOURCES}>
      <div className="bg-ground min-h-screen font-body text-ink flex flex-col">
        <SiteNav />
        <main className="flex-1 mx-auto w-full max-w-[1180px] px-[20px] sm:px-[32px] py-[32px] sm:py-[44px] flex flex-col">
          {/* Back to the question, not to history. The page is usually opened
              in a new tab, where the back button has nothing to go back to. */}
          <a
            href="/ballotQuestions/tax-rebate-62f-alt3#public"
            className="inline-flex items-center gap-[6px] self-start font-body font-semibold text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="w-[15px] h-[15px]" />
            Question {RC.number}
          </a>

          <h1 className="font-display font-medium text-2xl sm:text-3xl tracking-display text-ink mt-[18px]">
            {COMPOSE_TITLE}
          </h1>
          <p className="font-body text-sm text-ink-muted leading-[1.65] mt-[8px] max-w-[74ch]">
            {RC.title}. Your perspective is posted publicly and stays attached
            to your account.
          </p>

          {/* Guidance in its own column, which is the whole reason this page
              exists. It leads on the wider window because reading the rules
              before writing is the order that helps; stacked, it would sit
              under the form where nobody reaches it. */}
          <div className="mt-[28px] flex-1 flex flex-col gap-[24px] lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-[40px] lg:items-start">
            <div className="lg:sticky lg:top-[24px]">
              <ComposeGuidance />
            </div>
            <div className="flex flex-col gap-[20px] min-h-[420px] lg:min-h-[560px]">
              <ComposeFields
                stance={stance}
                onStanceChange={setStance}
                grow
              />
              <ComposeActions
                onCancel={() => window.close()}
                cancelLabel="Close"
              />
            </div>
          </div>
        </main>
      </div>
    </SourcesProvider>
  );
}

import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SynthSourcesNote } from "../ballot";

/**
 * The page is built on one idea: a ballot question is a binary decision, so the
 * page has a centre.
 *
 * Material that belongs to a side sits on that side of a hairline spine.
 * Material both sides share spans the full width and the spine simply is not
 * drawn. So the gutter opens where the campaigns diverge and closes where they
 * meet, and a reader can see the shape of the disagreement before reading a
 * word of it.
 *
 * The two sides are told apart by position and label only, never by colour.
 * Green-for-yes and red-for-no is the single most common way a civic page stops
 * looking neutral, and this platform does not take positions.
 */

/** Material both sides share. The spine closes here. */
export function Span({ children }: { children: ReactNode }) {
  return <div className="max-w-[74ch]">{children}</div>;
}

/** Material that belongs to a side. The spine opens. */
export function Split({
  heads = false,
  headLabels,
  stackOnPhone = false,
  variant = "rule",
  left,
  right,
}: {
  /** Name the sides. Worth it the first time a chapter splits, noise after. */
  heads?: boolean;
  /** Override the names, for splits where the sides are not the vote itself. */
  headLabels?: { yes: string; no: string };
  /**
   * Let the sides stack below sm. Two columns on a 390px phone leaves about
   * 175px each, which is fine for a sentence and hostile to three arguments, a
   * donor table, or a filed statement. Comparison is the point, so pairing is
   * the default and this is the exception.
   */
  stackOnPhone?: boolean;
  /**
   * "rule" draws the spine between the sides. "cards" gives each side its own
   * container and drops the rule, because a border on each side plus a rule
   * between them is three vertical lines in fifty pixels and none of them reads
   * as the centre. "bare" pairs the sides with neither: for chapters that
   * already carry enough vertical edges without the spine adding another.
   */
  variant?: "rule" | "cards" | "bare";
  left: ReactNode;
  right: ReactNode;
}) {
  const carded = variant === "cards";
  const gutter = carded
    ? "gap-x-[12px] sm:gap-x-[20px] lg:gap-x-[24px]"
    : "gap-x-[14px] sm:gap-x-[28px] lg:gap-x-[48px]";
  // Carded sides stretch to the taller of the two, so the pair reads as one
  // object with a divide rather than two boxes of different sizes. Ruled sides
  // stay top-aligned: there is no edge there for a ragged bottom to betray.
  const align = carded ? "" : "items-start";
  const frame = stackOnPhone
    ? `flex flex-col gap-[28px] sm:grid sm:grid-cols-[1fr_1px_1fr] ${carded ? "" : "sm:items-start"} ${gutter}`
    : `grid grid-cols-[1fr_1px_1fr] ${align} ${gutter}`;
  const side = carded
    ? "flex flex-col gap-[16px] min-w-0 rounded-card border border-line p-[14px] sm:p-[24px] lg:p-[28px]"
    : "flex flex-col gap-[16px] min-w-0";
  // Stacked, the label is the only thing saying which side you are reading, so
  // it shows regardless. Paired, position already says it.
  const headClass = stackOnPhone
    ? heads
      ? ""
      : "sm:hidden"
    : heads
      ? ""
      : "hidden";
  return (
    <div className={frame}>
      <div className={side}>
        <SideHead vote="yes" label={headLabels?.yes} className={headClass} />
        {left}
      </div>
      <div
        className={`self-stretch ${variant === "rule" ? "bg-line" : ""} ${stackOnPhone ? "hidden sm:block" : ""}`}
        aria-hidden
      />
      <div className={side}>
        <SideHead vote="no" label={headLabels?.no} className={headClass} />
        {right}
      </div>
    </div>
  );
}

export function SideHead({
  vote,
  label,
  className = "",
}: {
  vote: "yes" | "no";
  label?: string;
  className?: string;
}) {
  return (
    <p
      // All caps needs letterspacing to stay legible; without it the forms
      // crowd. No rule under it: inside a bordered card the border is already
      // doing that job.
      className={`font-display font-medium text-base sm:text-lg uppercase tracking-[0.08em] text-ink ${className}`}
    >
      {label ?? (vote === "yes" ? "Voting yes" : "Voting no")}
    </p>
  );
}

/**
 * One question a voter actually asks, answered before any evidence appears.
 *
 * The scale gap is the scaffolding: the question and its answer are set large
 * enough to be the only thing a hurried reader takes in, and the evidence
 * underneath is deliberately quieter. Stopping early still leaves you with
 * something true.
 */
export function Chapter({
  id,
  question,
  action,
  adornment,
  answer,
  band,
  children,
}: {
  id: string;
  question: string;
  /** Sits opposite the question, for the one thing you can do in the chapter. */
  action?: ReactNode;
  /** Sits directly beside the question, for a control that qualifies it. */
  adornment?: ReactNode;
  /** The plain-language answer. Large, and the first thing after the question. */
  answer?: ReactNode;
  /**
   * Material that shares a full-bleed white band with the question itself.
   *
   * A band is not a card. A card says "this is one object on the page"; the
   * band says "for this stretch, the page itself is a different surface", so
   * the heading sits inside it rather than above it and the white runs to the
   * window edge. `children` continue below on the ground, which is what lets a
   * chapter open at hero weight and then drop back to reading weight.
   */
  band?: ReactNode;
  children?: ReactNode;
}) {
  const heading = (
    <>
      <div className="flex items-start justify-between gap-[20px]">
        <div className="flex items-baseline gap-[14px] flex-wrap min-w-0">
          <h2
            id={`${id}-q`}
            className="font-display font-medium text-xl sm:text-2xl lg:text-3xl tracking-display text-ink max-w-[20ch] text-balance"
          >
            {question}
          </h2>
          {adornment}
        </div>
        {action && <div className="shrink-0 mt-[4px]">{action}</div>}
      </div>
      {answer && <div className="mt-[16px]">{answer}</div>}
    </>
  );
  const body = children && (
    <div className="flex flex-col gap-[28px] sm:gap-[40px]">{children}</div>
  );
  return (
    <section
      id={id}
      aria-labelledby={`${id}-q`}
      // Clears whatever is pinned: the contents bar alone on narrow, the nav
      // and the bar together once the nav becomes sticky at lg.
      className={`scroll-mt-[64px] lg:scroll-mt-[120px] ${
        band ? "" : "pt-[28px] sm:pt-[40px]"
      }`}
    >
      {band ? (
        <>
          {/* Out of the centred column and back into it: the white runs to
              the window edge, the words stay on the same measure as every
              other chapter. `w-screen` can exceed the content box where the
              scrollbar takes width, so the page root clips the overflow rather
              than gaining a horizontal scroll. */}
          <div className="ml-[calc(50%-50vw)] w-screen">
            <div className="mx-auto max-w-[1180px] px-[20px] sm:px-[32px] pt-[28px] sm:pt-[40px] pb-[32px] sm:pb-[44px]">
              {heading}
              <div className="mt-[28px] sm:mt-[40px]">{band}</div>
            </div>
          </div>
          {body && <div className="mt-[28px] sm:mt-[40px]">{body}</div>}
        </>
      ) : (
        <>
          {heading}
          {body && <div className="mt-[28px] sm:mt-[40px]">{body}</div>}
        </>
      )}
    </section>
  );
}

/**
 * The AI layer, wherever it appears. A coral hairline and a quiet mark rather
 * than a box: synthesis runs through this page as a texture, so it has to be
 * identifiable at a glance without becoming the loudest thing on screen.
 */
export function Synth({
  ids,
  prompt,
  children,
}: {
  ids: string[];
  prompt?: string;
  children: ReactNode;
}) {
  return (
    // `group` here rather than on the chip: hovering anywhere in the passage
    // reveals the link, so the whole synthesis is the affordance rather than a
    // small target inside it.
    <div className="group relative ml-[6px] pl-[14px] sm:pl-[20px]">
      {/* The rule is an element rather than a border, because a filter applies
          to a whole element: desaturating a border would desaturate the
          passage along with it. Same treatment as the chip, and the same group
          drives both, so the mark and its label come back to colour together
          when you hover the synthesis. */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-ai grayscale-[50%] group-hover:filter-none"
      />
      {children}
      <div className="mt-[10px]">
        <SynthSourcesNote ids={ids} prompt={prompt} />
      </div>
    </div>
  );
}

/** A quiet label above a block of evidence. */
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-body font-semibold text-xs text-ink-muted mb-[10px]">
      {children}
    </p>
  );
}

/**
 * A labelled block the reader opens, for material that answers a question they
 * may not have asked yet.
 *
 * Closed by default, so the chapter reads at its shortest and the depth is
 * there for whoever wants it. The label keeps `Label`'s voice rather than
 * becoming a heading: this is a control, not a section, and a page with several
 * of these should not look like it has gained several sections.
 */
export function Disclosure({
  label,
  defaultOpen = false,
  anchorId,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  /**
   * Element to bring to the top of the viewport when this opens. Given the
   * group's id, opening any one of a stack puts the whole stack in view, so
   * the labels you did not pick stay reachable instead of being pushed off
   * screen by what you did pick.
   */
  anchorId?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => {
    const opening = !open;
    setOpen(opening);
    if (!opening || !anchorId) return;
    // After the browser has laid the opened content out, so the scroll lands
    // where the element actually ends up.
    requestAnimationFrame(() => {
      document.getElementById(anchorId)?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  };
  return (
    <div>
      <button
        onClick={toggle}
        aria-expanded={open}
        // Negative margin against the padding, so the hover target is bigger
        // than the words without the words moving.
        className="group -mx-[8px] -my-[4px] px-[8px] py-[4px] rounded-control flex items-center gap-[6px] hover:bg-wash cursor-pointer"
      >
        <ChevronRight
          aria-hidden
          className={`w-[14px] h-[14px] text-ink-faint group-hover:text-ink-muted transition-transform duration-150 ${
            open ? "rotate-90" : ""
          }`}
        />
        <span className="font-body font-semibold text-sm text-ink-muted">
          {label}
        </span>
      </button>
      {open && <div className="mt-[14px] pl-[20px]">{children}</div>}
    </div>
  );
}

/**
 * Copy whose emphasis was decided in the data rather than at the call site.
 *
 * The page sets a clause in bold in two places, and both read their segments
 * from `content.ts`. This is the only thing that knows what emphasis looks
 * like, so the two cannot drift apart.
 */
export function Segments({
  parts,
  notes,
  strongClass = "font-extrabold",
}: {
  /** Note bodies, indexed by marker number, shown when a marker is hovered. */
  notes?: {
    text: string;
    emphasis?: boolean;
    italic?: boolean;
    block?: boolean;
  }[][];
  parts: {
    text: string;
    emphasis?: boolean;
    italic?: boolean;
    href?: string;
    /** Starts its own line, for a note that wants a heading above its body. */
    block?: boolean;
    /** Marks this phrase with a superscript, and hangs a note off it. */
    footnote?: number;
  }[];
  strongClass?: string;
}) {
  return (
    <>
      {parts.map((part, i) => {
        const cls = [
          part.emphasis ? strongClass : "",
          part.italic ? "italic" : "",
        ]
          .filter(Boolean)
          .join(" ");
        // `strong` where the point is weight and `em` where it is stress, so
        // the markup says which kind of emphasis this is rather than leaving
        // it to the class.
        const Tag = part.emphasis ? "strong" : "em";
        // An anchor on this page is a different promise from a link off it, so
        // it looks different: brand ink and no underline for a jump, official
        // blue and an underline for something that leaves. Emphasis composes
        // with either, so a phrase can be bold and be a link.
        const jump = part.href?.startsWith("#");
        const linkCls = jump
          ? "text-brand hover:text-brand-hover"
          : "text-official-ink hover:text-official underline decoration-[1.5px] underline-offset-[3px]";
        const inner = part.href ? (
          <a
            href={part.href}
            {...(jump ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className={`group ${cls} ${linkCls}`.trim()}
          >
            {part.text}
            {jump && (
              // Sized in em so it tracks the type it sits in, and inline
              // rather than flexed so a long phrase can still wrap.
              <ArrowRight
                aria-hidden
                className="inline-block align-[-0.13em] ml-[6px] w-[0.85em] h-[0.85em] group-hover:[stroke-width:2.75]"
              />
            )}
          </a>
        ) : cls ? (
          <Tag className={cls}>{part.text}</Tag>
        ) : (
          part.text
        );

        if (!part.footnote)
          return (
            <span
              key={i}
              className={part.block ? "block mt-[8px] first:mt-0" : undefined}
            >
              {inner}
            </span>
          );
        const note = notes?.[part.footnote - 1];
        return (
          // The phrase and its marker share one hover target, so the note is
          // reachable by aiming at the words rather than at a 12px digit. The
          // wrapper stays inline rather than inline-block: a marked phrase can
          // be several words long and still has to break across lines.
          <span key={i} className="group/fn relative cursor-default">
            {inner}
            <sup className="font-body font-semibold text-[0.55em] ml-[1px] align-super text-ink-faint group-hover/fn:text-ink">
              {part.footnote}
            </sup>
            {note && (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-0 bottom-full mb-[8px] hidden group-hover/fn:block w-[320px] max-w-[80vw] bg-surface border border-line-strong rounded-control shadow-popover p-[12px] z-40 font-body font-normal text-sm text-ink leading-[1.55] text-left"
              >
                <Segments parts={note} strongClass="font-semibold" />
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

/**
 * A boxed aside inside a passage, for something that qualifies what was just
 * said rather than continuing it.
 *
 * A recessed surface rather than a card: it sits inside a passage that already
 * has a rule down its left, so another bordered object there would be a box in
 * a box. Sinking it says "same passage, different register".
 */
export function Callout({
  variant = "panel",
  children,
}: {
  /** "bare" drops the surface and keeps only the spacing and the type. */
  variant?: "panel" | "bare";
  children: ReactNode;
}) {
  return (
    <div
      className={`font-body text-lg sm:text-xl text-ink-muted leading-[1.5] ${
        variant === "panel"
          ? "mt-[20px] bg-sunken rounded-panel px-[18px] py-[16px]"
          : "mt-[22px] mb-[22px]"
      }`}
    >
      {children}
    </div>
  );
}

/** Body copy, the page's default voice. */
export function Body({
  children,
  size = "base",
}: {
  children: ReactNode;
  size?: "base" | "lead";
}) {
  return (
    <p
      className={`font-body text-ink ${
        size === "lead"
          ? "text-xl sm:text-[22px] sm:leading-[1.5] leading-[1.55] text-pretty"
          : "text-lg leading-[1.65] text-pretty"
      }`}
    >
      {children}
    </p>
  );
}

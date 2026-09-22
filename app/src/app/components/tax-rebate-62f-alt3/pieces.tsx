import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight, MessagesSquare } from "lucide-react";
import { Modal, SourceNote, shuffled, useSources } from "../ballot";
import {
  POSITION_USERS,
  RC,
  orgTestifiers,
  type PositionUser,
  type TestimonyItem,
} from "../../data/tax-rebate-62f";
import { AvatarWithTooltip } from "../tax-rebate-62f/accounts";
import {
  ARGUMENT_FOR,
  ARGUMENT_AGAINST,
} from "../../data/tax-rebate-62f/official-2026";
import { Body, Label } from "./spine";

/** An account's real logo, or its initials when there is no image. */
export function Logo({ u, size = 34 }: { u: PositionUser; size?: number }) {
  if (u.avatar) {
    return (
      <img
        src={u.avatar}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover bg-surface border border-line"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: size / 2.8 }}
      className="shrink-0 rounded-full bg-sunken border border-line flex items-center justify-center font-body font-semibold text-ink-muted"
    >
      {u.initials ?? u.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

/**
 * A logo with the coalition rows' hover label.
 *
 * The same treatment `AvatarWithTooltip` gives the campaign coalitions, rebuilt
 * here rather than reused because that one draws through `UserAvatar` and
 * cannot crop to a face. Keep the two visually identical: a reader should not
 * be able to tell that two rows of faces on the same page are different
 * components.
 */
export function LogoWithTooltip({
  u,
  size = 34,
  label,
}: {
  u: PositionUser;
  size?: number;
  /** Overrides the account name, for a row that names people another way. */
  label?: string;
}) {
  // "Fourth Middlesex · Signed the majority report (D)" is two facts. The
  // district is the one a tooltip wants; which report they signed is already
  // the heading this row sits under.
  const sub = u.descriptor.split("·")[0]?.trim();
  return (
    <span className="relative group shrink-0 inline-block leading-none">
      <Logo u={u} size={size} />
      {/* Name on top, then whatever the account's descriptor adds: for a
          legislator that is the district they were elected in, which is the
          part a reader can act on. Two lines rather than one long one, and the
          name stays first so the tooltip reads the same as every other one on
          the page. */}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[6px] hidden group-hover:block bg-ink text-ink-inverse font-body text-xs px-[8px] py-[4px] rounded-control whitespace-nowrap z-20 pointer-events-none text-center">
        <span className="block font-semibold">{label ?? u.name}</span>
        {!label && sub && (
          <span className="block text-ink-inverse/70">{sub}</span>
        )}
      </span>
    </span>
  );
}

/**
 * One account on the record. The unit the roster is built from: who they are,
 * what they do, and nothing about whether they are right.
 */
export function RosterRow({
  u,
  onOpen,
}: {
  u: PositionUser;
  onOpen?: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      disabled={!onOpen}
      className="group w-full text-left flex items-start gap-[12px] py-[12px] border-b border-line cursor-pointer disabled:cursor-default"
    >
      <Logo u={u} />
      <span className="min-w-0">
        <span className="block font-body font-semibold text-base text-ink group-hover:text-brand">
          {u.name}
        </span>
        <span className="block font-body text-sm text-ink-muted">
          {u.descriptor}
        </span>
      </span>
    </button>
  );
}

/**
 * A filed statement, shown as itself rather than as a card. Clicking opens the
 * whole thing, because an excerpt is an editorial act and the full text is not.
 */
export function TestimonyBlock({ t }: { t: TestimonyItem }) {
  const [open, setOpen] = useState(false);
  const u = POSITION_USERS.find((x) => x.id === t.userId);
  if (!u) return null;
  return (
    <>
      <div className="rounded-card border border-line p-[18px] sm:p-[20px]">
        <button
          onClick={() => setOpen(true)}
          className="group w-full text-left flex items-center gap-[10px] cursor-pointer"
        >
          <Logo u={u} size={28} />
          <span className="min-w-0">
            <span className="block font-body font-semibold text-base text-ink group-hover:text-brand truncate">
              {u.name}
            </span>
            <span className="block font-body text-xs text-ink-muted">
              {t.date}
            </span>
          </span>
        </button>
        <p className="font-body text-base text-ink leading-[1.65] mt-[10px] line-clamp-4">
          {t.body}
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-[8px] font-body font-semibold text-sm text-brand hover:text-alert cursor-pointer"
        >
          Read in full
        </button>
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)} title={u.name} maxWidth="680px">
          <div className="bg-surface rounded-card border border-line p-[28px]">
            <p className="font-body text-sm text-ink-muted">
              {u.descriptor} · Filed {t.date}
            </p>
            <p className="font-body text-lg text-ink leading-[1.7] mt-[16px] whitespace-pre-line">
              {t.body}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}

/** A source list rendered as a reference column rather than a card. */
export function RefList({ ids }: { ids: string[] }) {
  const sources = useSources();
  return (
    <ul className="flex flex-col gap-[10px]">
      {ids.map((id) => {
        const s = sources[id];
        if (!s) return null;
        return (
          <li key={id} className="border-b border-line pb-[10px]">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-[4px] font-body text-base text-ink hover:text-brand"
            >
              <span>{s.title ?? s.label}</span>
              <ArrowUpRight className="w-[13px] h-[13px] mt-[4px] shrink-0 text-ink-faint group-hover:text-brand" />
            </a>
            {(s.meta || s.date) && (
              <p className="font-body text-xs text-ink-muted mt-[2px]">
                {[s.meta, s.date].filter(Boolean).join(" · ")}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** A figure given the room a figure deserves. */
export function Figure({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: ReactNode;
}) {
  return (
    <div>
      <p className="font-display font-medium text-2xl text-ink tracking-heading">
        {value}
      </p>
      <p className="font-body text-sm text-ink-muted mt-[2px]">{label}</p>
      {note && <div className="mt-[6px]">{note}</div>}
    </div>
  );
}

export { Body, Label, SourceNote };

const AVATAR = 48;
const AVATAR_GAP = 6;

/**
 * How many avatars fit the row, measured rather than assumed.
 *
 * Counts against the real width left after the testimony link, and reserves a
 * slot for the "+N" circle only once it knows one is needed: reserving it
 * unconditionally would hide an avatar on rows that had room for every one.
 */
function useAvatarFit(total: number) {
  const rowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(total);
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const available =
        row.clientWidth - (linkRef.current?.offsetWidth ?? 0) - AVATAR_GAP;
      const slots = Math.floor(
        (available + AVATAR_GAP) / (AVATAR + AVATAR_GAP),
      );
      setShown(
        slots >= total ? total : Math.max(0, Math.min(total, slots - 1)),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [total]);
  return { rowRef, linkRef, shown };
}

/**
 * A campaign, as an organisation rather than as an argument: who runs it, what
 * it has raised, and which organisations have filed on its side. This is the
 * material the old vote cards carried, in the arrangement they carried it.
 *
 * The title comes from the split above rather than from inside, and the summary
 * and the official statement live elsewhere on this page, so what is left is
 * the two-column organizer and funding row and the coalition beneath it.
 */
export function CampaignCard({
  d,
  stance,
  onViewTestimony,
  finance,
}: {
  d: typeof RC.overviewVotes.yes;
  stance: "endorse" | "oppose";
  /** Called before the jump, so the feed is already narrowed on arrival. */
  onViewTestimony?: () => void;
  /**
   * The side's money, below the coalition. Passed in rather than read here so
   * this file stays free of the committee data and the page decides how much
   * of it to show.
   */
  finance?: ReactNode;
}) {
  const organizers = d.organizerIds
    .map((id) => POSITION_USERS.find((u) => u.id === id))
    .filter((u): u is PositionUser => Boolean(u));
  // The organizer has its own row above, so it is dropped from the list rather
  // than appearing twice on the same card. Memoised so the shuffle survives the
  // re-renders the fit measurement causes.
  const sideOrgs = useMemo(
    () =>
      shuffled(orgTestifiers(stance)).filter(
        (u) => !d.organizerIds.includes(u.id),
      ),
    [stance, d.organizerIds],
  );
  const { rowRef, linkRef, shown } = useAvatarFit(sideOrgs.length);
  const visible = sideOrgs.slice(0, shown);
  const overflow = sideOrgs.slice(shown);
  const arg = stance === "endorse" ? ARGUMENT_FOR : ARGUMENT_AGAINST;

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-2 gap-[8px]">
        <div>
          <p className="font-body font-semibold text-sm text-ink-muted mb-[6px]">
            Campaign Organizer
          </p>
          <div className="flex gap-[6px]">
            {organizers.map((u) => (
              <AvatarWithTooltip key={u.id} user={u} size={48} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-body font-semibold text-sm text-ink-muted mb-[4px]">
            Funding Raised
          </p>
          {/* One figure to scan. The cash and in-kind split is the second
              question, so it waits for a hover. */}
          <div className="relative group inline-block">
            <a
              href="#funding"
              className="group inline-flex items-center gap-[5px] whitespace-nowrap font-body font-semibold text-xl text-brand hover:text-brand-hover cursor-pointer"
            >
              {d.funding}
              <ArrowRight className="w-[13px] h-[13px] shrink-0 group-hover:[stroke-width:2.75]" />
            </a>
            {d.fundingCash && d.fundingInKind && (
              <div className="absolute left-0 bottom-full mb-[6px] hidden group-hover:block w-[260px] bg-surface border border-line-strong rounded-control shadow-popover p-[12px] z-30 text-left font-body text-xs text-ink leading-[1.5] pointer-events-none">
                <span className="block">
                  <span className="font-semibold">{d.fundingCash}</span> cash
                </span>
                <span className="block text-ink-muted">
                  Money given to the campaign as cash donations.
                </span>
                <span className="block mt-[8px]">
                  <span className="font-semibold">{d.fundingInKind}</span>{" "}
                  in-kind
                </span>
                <span className="block text-ink-muted">
                  Goods and services provided directly, such as staff time or
                  advertising.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* The statutory 150-word argument, as the campaign wrote it and as the
          Commonwealth prints it. Not a summary of the campaign's position: the
          argument itself, which is the only thing on this card the campaign
          chose every word of. */}
      <div className="pt-[4px] pl-[6px]">
        <Label>{arg.heading}</Label>
        <div className="flex flex-col gap-[10px] border-l-2 border-official pl-[16px]">
          {arg.paragraphs.map((t) => (
            <p key={t} className="font-body text-sm text-ink leading-[1.65]">
              {t}
            </p>
          ))}
          <p className="font-body text-xs text-ink-muted leading-[1.6] mt-[2px]">
            {arg.authoredBy}
          </p>
        </div>
      </div>
      {/* Closes the card, so it takes the slack when the two sides run to
          different depths. */}
      <div className="mt-auto pt-[14px]">
        <p className="flex items-center gap-[6px] font-body font-semibold text-sm text-ink-muted mb-[6px]">
          <MessagesSquare className="w-[15px] h-[15px] shrink-0" />
          {d.sideLabel}
        </p>
        <div ref={rowRef} className="flex items-center gap-[6px]">
          {visible.map((u) => (
            <AvatarWithTooltip key={u.id} user={u} size={AVATAR} />
          ))}
          {overflow.length > 0 && (
            <div
              title={overflow.map((u) => u.name).join(", ")}
              className="w-[48px] h-[48px] rounded-full bg-brand-soft border border-brand-edge flex items-center justify-center shrink-0"
            >
              <span className="font-body font-semibold text-xs text-brand-ink">
                +{overflow.length}
              </span>
            </div>
          )}
          <button
            ref={linkRef}
            onClick={onViewTestimony}
            className="group ml-auto shrink-0 font-body font-semibold text-sm text-brand hover:text-brand-hover cursor-pointer inline-flex items-center gap-[4px]"
          >
            View testimony
            <ArrowRight className="w-[14px] h-[14px] group-hover:[stroke-width:2.75]" />
          </button>
        </div>
        {finance && (
          <div className="mt-[18px]">{finance}</div>
        )}
      </div>

    </div>
  );
}

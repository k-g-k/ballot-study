// Account/user presentation, bound to this question's account model
// (PositionUser / TestimonyStance). Kept with the page rather than the generic
// ballot library because it depends on that data model; generalize later by
// lifting those types into ballot/types.

import { Megaphone, Scale, Lectern } from "lucide-react";
import type { PositionUser, TestimonyStance } from "../../data/rent-control";

// Circular avatar — uploaded image when on file, initials otherwise.
export function UserAvatar({
  user,
  size = 40,
}: {
  user: PositionUser;
  size?: number;
}) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover bg-white border border-[#e5e7eb] shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[rgba(232,239,255,0.68)] border border-[#c9d8ff] flex items-center justify-center shrink-0"
    >
      <span
        style={{ fontSize: size >= 40 ? 12 : 10 }}
        className="font-['Nunito'] font-bold text-[#1e3f8a] tracking-[0.02em]"
      >
        {user.initials}
      </span>
    </div>
  );
}

// Avatar with a hover-name tooltip, no link-out.
export function AvatarWithTooltip({
  user,
  size = 40,
}: {
  user: PositionUser;
  size?: number;
}) {
  return (
    <div className="relative group shrink-0">
      <UserAvatar user={user} size={size} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[6px] hidden group-hover:block bg-[#1a1a1a] text-white font-['Nunito'] text-[12px] px-[8px] py-[4px] rounded-[6px] whitespace-nowrap z-20 pointer-events-none">
        {user.name}
      </div>
    </div>
  );
}

// Account-type iconography — small lucide icon, meaning spelled out in the
// tooltip.
const USER_TYPE_ICON: Record<
  PositionUser["userType"],
  { Icon: typeof Megaphone; color?: string; label: string }
> = {
  organization: { Icon: Megaphone, label: "Organization" },
  legislator: { Icon: Scale, label: "Legislator" },
  government: { Icon: Lectern, label: "Executive office" },
};

export function UserTypeIcon({
  type,
  size = 15,
}: {
  type: PositionUser["userType"];
  size?: number;
}) {
  const { Icon, color, label } = USER_TYPE_ICON[type];
  return (
    <span title={label} aria-label={label} className="shrink-0 leading-none">
      <Icon style={{ width: size, height: size, color }} />
    </span>
  );
}

export function PositionUserRow({ user }: { user: PositionUser }) {
  return (
    <div className="flex items-center gap-[12px] min-w-0">
      <UserAvatar user={user} />
      <div className="min-w-0">
        <div className="flex items-center gap-[6px] flex-wrap">
          <p className="font-['Nunito'] font-semibold text-[14px] text-black leading-[1.3]">
            {user.name}
          </p>
          <UserTypeIcon type={user.userType} />
        </div>
        <p className="font-['Nunito'] text-[12px] text-[#808080] leading-[1.4]">
          {user.descriptor}
        </p>
      </div>
    </div>
  );
}

export function PositionUserGroup({
  heading,
  users,
}: {
  heading: string;
  users: PositionUser[];
}) {
  return (
    <div>
      <p className="font-['Nunito'] font-semibold text-[13px] text-[#606060] uppercase tracking-[0.08em] mb-[10px]">
        {heading} ({users.length})
      </p>
      <div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px] max-lg:grid-cols-1">
        {users.map((u) => (
          <PositionUserRow key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}

const STANCE_CHIP: Record<
  TestimonyStance,
  { bg: string; bd: string; tx: string; label: string }
> = {
  endorse: {
    bg: "bg-[#dcfce7]",
    bd: "border-[#86efac]",
    tx: "text-[#166534]",
    label: "Endorses",
  },
  oppose: {
    bg: "bg-[#fee2e2]",
    bd: "border-[#fca5a5]",
    tx: "text-[#991b1b]",
    label: "Opposes",
  },
  "no-position": {
    bg: "bg-[#f0f0f0]",
    bd: "border-[#d1d1d1]",
    tx: "text-[#606060]",
    label: "No Position",
  },
};

export function StanceChip({ stance }: { stance: TestimonyStance }) {
  const c = STANCE_CHIP[stance];
  return (
    <span
      className={`${c.bg} border ${c.bd} ${c.tx} px-[8px] py-[1px] rounded-[100px] font-['Nunito'] font-bold text-[11px]`}
    >
      {c.label}
    </span>
  );
}

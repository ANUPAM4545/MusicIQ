import React from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
  className?: string;
}

const COLORS = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-green-500",
  "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-blue-500",
  "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500",
  "bg-pink-500", "bg-rose-500"
];

function getDeterministicColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}

export function UserAvatar({ firstName = "", lastName = "", avatarUrl, className }: UserAvatarProps) {
  if (avatarUrl) {
    return (
      <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
        <img src={avatarUrl} alt={`${firstName} ${lastName}`} className="aspect-square h-full w-full object-cover" />
      </div>
    );
  }

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
  const fullName = `${firstName} ${lastName}`.trim() || "User";
  const bgColor = getDeterministicColor(fullName);

  return (
    <div className={cn(`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-white font-medium ${bgColor}`, className)}>
      {initials}
    </div>
  );
}

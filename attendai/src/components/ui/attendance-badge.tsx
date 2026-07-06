"use client";

import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "@/types";

const statusConfig: Record<
  AttendanceStatus,
  { label: string; className: string }
> = {
  present: { label: "Present", className: "badge-present" },
  absent: { label: "Absent", className: "badge-absent" },
  late: { label: "Late", className: "badge-late" },
  excused: {
    label: "Excused",
    className:
      "bg-info/10 text-info border border-info/20 text-xs font-medium px-2 py-0.5 rounded-full",
  },
  holiday: {
    label: "Holiday",
    className:
      "bg-muted text-muted-foreground border border-border text-xs font-medium px-2 py-0.5 rounded-full",
  },
};

interface AttendanceBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

export function AttendanceBadge({ status, className }: AttendanceBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn(config.className, className)}>
      {config.label}
    </span>
  );
}

// ─────────────────────────────────────────
// Attendance percentage badge
// ─────────────────────────────────────────

interface AttendancePctBadgeProps {
  pct: number;
  threshold?: number;
  className?: string;
}

export function AttendancePctBadge({
  pct,
  threshold = 75,
  className,
}: AttendancePctBadgeProps) {
  const isGood = pct >= threshold;
  const isWarning = pct >= threshold - 10 && pct < threshold;

  return (
    <span
      className={cn(
        "text-xs font-semibold px-2 py-0.5 rounded-full border",
        isGood
          ? "badge-present"
          : isWarning
          ? "badge-late"
          : "badge-absent",
        className
      )}
    >
      {pct}%
    </span>
  );
}

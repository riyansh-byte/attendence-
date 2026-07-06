"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StatVariant = "primary" | "success" | "warning" | "danger" | "default";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: StatVariant;
  trend?: {
    value: number; // percentage change
    label?: string;
  };
  suffix?: string;
  className?: string;
  delay?: number;
  animate?: boolean;
}

function useCountUp(target: number, duration = 1200, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled]);

  return count;
}

const variantStyles: Record<StatVariant, string> = {
  primary: "stat-card-primary",
  success: "stat-card-success",
  warning: "stat-card-warning",
  danger: "stat-card-danger",
  default: "bg-card",
};

const variantIcon: Record<StatVariant, string> = {
  primary: "bg-brand-500/10 text-brand-500",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  default: "bg-muted text-muted-foreground",
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  trend,
  suffix,
  className,
  delay = 0,
  animate = true,
}: StatsCardProps) {
  const numericValue = typeof value === "number" ? value : parseInt(String(value), 10);
  const isNumeric = !isNaN(numericValue) && typeof value === "number";
  const displayCount = useCountUp(isNumeric ? numericValue : 0, 1200, animate && isNumeric);

  const trendPositive = trend && trend.value > 0;
  const trendNeutral = trend && trend.value === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "relative rounded-xl border p-5 overflow-hidden",
        "hover:shadow-card-hover transition-shadow duration-300",
        variantStyles[variant],
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 -mr-4 -mt-4">
        <div className="w-full h-full rounded-full bg-current" />
      </div>

      <div className="flex items-start justify-between gap-4 relative">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            {title}
          </p>
          <div className="flex items-end gap-1.5">
            <span className="metric-number">
              {isNumeric ? displayCount.toLocaleString() : value}
            </span>
            {suffix && (
              <span className="text-sm text-muted-foreground mb-0.5">{suffix}</span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-medium",
              trendPositive ? "text-success" : trendNeutral ? "text-muted-foreground" : "text-danger"
            )}>
              {trendPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : trendNeutral ? (
                <Minus className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
                {Math.abs(trend.value)}% {trend.label ?? "vs last week"}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", variantIcon[variant])}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}

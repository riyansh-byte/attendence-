"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { mockDashboardStats } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { TrendingUp, Brain, Sparkles } from "lucide-react";

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-card text-xs">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground capitalize">{p.name}:</span>
          <span className="font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

const COLORS = [
  "hsl(160,84%,39%)",
  "hsl(347,77%,50%)",
  "hsl(38,92%,50%)",
  "hsl(207,90%,54%)",
  "hsl(270,91%,65%)",
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  const stats = mockDashboardStats;

  const trendData = stats.weekly_trend.slice(-30).map((t) => ({
    ...t,
    date: format(new Date(t.date), "MMM d"),
  }));

  const deptPieData = stats.department_comparison.map((d) => ({
    name: d.department_name.split(" ")[0],
    value: d.percentage,
  }));

  // Monthly breakdown mock
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    percentage: Math.floor(Math.random() * 15) + 78,
    late: Math.floor(Math.random() * 10) + 5,
  }));

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Analytics" }]}
    >
      <PageHeader
        title="Analytics"
        description="Deep insights into attendance patterns, trends, and risk indicators"
        actions={
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">This year</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* Summary stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Avg Attendance", value: "83%", change: "+2.1%", positive: true },
          { label: "Best Department", value: "Business Admin", change: "91%", positive: true },
          { label: "Risk Students", value: "12", change: "+3 this week", positive: false },
          { label: "Perfect Attendance", value: "47", change: "students", positive: true },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border bg-card p-4 shadow-card"
          >
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="text-xl font-bold">{item.value}</p>
            <p className={`text-xs mt-1 ${item.positive ? "text-success" : "text-danger"}`}>
              {item.change}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left — 2 col */}
        <div className="xl:col-span-2 space-y-6">

          {/* Trend chart */}
          <SectionCard title="Attendance Trend" description="Daily breakdown — present, absent, late">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g-present" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160,84%,39%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-absent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(347,77%,50%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(347,77%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="present" stroke="hsl(160,84%,39%)" strokeWidth={2} fill="url(#g-present)" dot={false} />
                <Area type="monotone" dataKey="absent" stroke="hsl(347,77%,50%)" strokeWidth={2} fill="url(#g-absent)" dot={false} />
                <Area type="monotone" dataKey="late" stroke="hsl(38,92%,50%)" strokeWidth={1.5} fill="none" strokeDasharray="4 2" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>

          {/* Monthly % bar */}
          <SectionCard title="Monthly Attendance %" description="Percentage by month — this year">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={32}>
                  {monthlyData.map((_, index) => (
                    <Cell key={index} fill={monthlyData[index].percentage >= 85 ? "hsl(160,84%,39%)" : monthlyData[index].percentage >= 75 ? "hsl(var(--primary))" : "hsl(347,77%,50%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* Right — 1 col */}
        <div className="space-y-6">

          {/* Dept pie */}
          <SectionCard title="By Department">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={deptPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {deptPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-1">
              {deptPieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="flex-1 text-muted-foreground">{d.name}</span>
                  <span className="font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* AI Insights Placeholder */}
          <SectionCard>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold">AI Insights</h4>
                  <Badge variant="outline" className="text-[10px]">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    Coming Soon
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AI-powered anomaly detection, risk prediction, and personalized attendance improvement suggestions will appear here once the AI module is enabled.
                </p>
                <Button size="sm" variant="outline" className="mt-3 text-xs h-7" disabled>
                  Enable AI Analytics
                </Button>
              </div>
            </div>
          </SectionCard>

          {/* Late arrivals */}
          <SectionCard title="Late Arrival Pattern" description="By hour of day">
            <div className="space-y-2">
              {[
                { time: "8:00 — 8:30", count: 12, pct: 35 },
                { time: "8:31 — 9:00", count: 8, pct: 23 },
                { time: "9:01 — 9:30", count: 9, pct: 26 },
                { time: "9:30+", count: 5, pct: 15 },
              ].map((row) => (
                <div key={row.time} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{row.time}</span>
                    <span className="font-medium">{row.count} students</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-warning h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  );
}

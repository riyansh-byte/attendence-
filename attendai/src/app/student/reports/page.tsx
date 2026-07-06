"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, AlertTriangle, CheckCircle, Percent, ArrowRight, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const subjectStats = [
  { code: "CS301", name: "Design & Analysis of Algorithms", attended: 24, total: 26, rate: 92.3, status: "good" },
  { code: "CS302", name: "Database Management Systems", attended: 18, total: 22, rate: 81.8, status: "warning" },
  { code: "CS305", name: "Software Engineering", attended: 21, total: 22, rate: 95.4, status: "good" },
  { code: "CS402", name: "Artificial Intelligence", attended: 12, total: 18, rate: 66.6, status: "critical" },
];

const monthlyTrend = [
  { name: "Jan", rate: 94 },
  { name: "Feb", rate: 91 },
  { name: "Mar", rate: 88 },
  { name: "Apr", rate: 86 },
  { name: "May", rate: 76 },
  { name: "Jun", rate: 86 },
];

const absentLogs = [
  { date: "2026-06-18", code: "CS402", subject: "Artificial Intelligence", reason: "Medical Leave (Excused)", type: "excused" },
  { date: "2026-06-14", code: "CS302", subject: "Database Management Systems", reason: "Unexcused Absence", type: "unexcused" },
  { date: "2026-05-22", code: "CS402", subject: "Artificial Intelligence", reason: "Unexcused Absence", type: "unexcused" },
  { date: "2026-05-19", code: "CS402", subject: "Artificial Intelligence", reason: "Fever (Excused)", type: "excused" },
];

export default function StudentReportsPage() {
  return (
    <DashboardLayout
      role="student"
      breadcrumbs={[{ label: "Dashboard", href: "/student" }, { label: "Reports" }]}
    >
      <PageHeader
        title="Attendance Performance"
        description="Detailed analytics of your presence rates, subject metrics, and documented absences."
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Trend Area Chart */}
        <div className="lg:col-span-2">
          <SectionCard title="Attendance Rate Over Time" description="Monthly trend of your cumulative attendance percentage.">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Highlight Metrics */}
        <div className="lg:col-span-1 space-y-6">
          <StatsCard
            title="Cumulative Score"
            value={86.5}
            suffix="%"
            subtitle="Min requirement: 75%"
            icon={<Percent className="w-5 h-5 text-primary" />}
            variant="default"
          />
          
          <SectionCard title="At Risk Courses" description="Action required for low attendance.">
            <div className="space-y-4 mt-2">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-danger/20 bg-danger/5">
                <ShieldAlert className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-danger">CS402 — Artificial Intelligence</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Your rate is <strong>66.6%</strong>. You need to attend 3 more classes to reach 75%.</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Grid of Subject details */}
      <h3 className="text-sm font-semibold mb-4">Subject-wise Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {subjectStats.map((sub) => (
          <motion.div
            key={sub.code}
            className="rounded-xl border bg-card p-5 flex flex-col justify-between shadow-card hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground">{sub.code}</span>
                <Badge
                  className={
                    sub.status === "good"
                      ? "bg-success/10 text-success border-success/30 font-semibold"
                      : sub.status === "warning"
                      ? "bg-warning/10 text-warning border-warning/30 font-semibold"
                      : "bg-danger/10 text-danger border-danger/30 font-semibold"
                  }
                >
                  {sub.status === "good" ? "Good" : sub.status === "warning" ? "Warning" : "Critical"}
                </Badge>
              </div>
              <h4 className="font-bold text-sm leading-snug line-clamp-2 min-h-[40px] text-foreground">{sub.name}</h4>
              <p className="text-xs text-muted-foreground mt-3">
                Attended: <strong className="font-semibold text-foreground">{sub.attended}/{sub.total}</strong> lectures
              </p>
            </div>
            <div className="mt-4 border-t border-border/60 pt-3 flex items-baseline justify-between">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Attendance</span>
              <span className="text-lg font-bold text-foreground">{sub.rate}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Absences Log */}
      <SectionCard title="Attendance Incident Logs" description="Review dates of absences or excused leaves.">
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Incident Date</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead>Documented Reason</TableHead>
                <TableHead className="text-right">Incident Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absentLogs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{log.date}</TableCell>
                  <TableCell className="font-mono text-xs">{log.code}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{log.subject}</TableCell>
                  <TableCell className="italic text-xs">{log.reason}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={log.type === "excused" ? "bg-success/10 text-success border-success/30 font-semibold" : "bg-danger/10 text-danger border-danger/30 font-semibold"}>
                      {log.type === "excused" ? "Excused" : "Unexcused"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </DashboardLayout>
  );
}

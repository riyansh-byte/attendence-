"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays, BookOpen, Clock, AlertTriangle, ArrowRight,
  Sparkles, FileText, CheckCircle2, ChevronRight
} from "lucide-react";
import { useAuthStore } from "@/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const today = new Date();

  // Student specific mock details
  const attendanceRate = 86; // 86% average attendance rate
  const classesToday = [
    { id: "cs1", code: "CS301", name: "Design & Analysis of Algorithms", time: "09:00 AM — 10:30 AM", status: "present" },
    { id: "cs2", code: "CS305", name: "Operating Systems Lab", time: "11:00 AM — 01:00 PM", status: "present" },
    { id: "cs3", code: "CS402", name: "Artificial Intelligence", time: "02:30 PM — 04:00 PM", status: "scheduled" },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Student Portal" }]}
      role="student"
    >
      {/* Top Banner */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Hello, {user?.full_name ?? "Rahul Sharma"} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Student Dashboard · Roll No: CSE-24-0012 · {format(today, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
          <Link href="/student/leave">
            <Button size="sm" className="btn-brand gap-1.5">
              <CalendarDays className="w-4 h-4" /> Request Leave
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Attendance Rate"
          value={attendanceRate}
          suffix="%"
          subtitle="Above 75% threshold"
          icon={<CheckCircle2 className="w-5 h-5 text-success" />}
          variant="success"
          delay={0}
        />
        <StatsCard
          title="Classes Conducted"
          value={42}
          subtitle="Total recorded sessions"
          icon={<BookOpen className="w-5 h-5 text-primary" />}
          delay={0.05}
        />
        <StatsCard
          title="Absences Recorded"
          value={6}
          subtitle="Includes 2 excused leaves"
          icon={<AlertTriangle className="w-5 h-5 text-danger" />}
          variant="danger"
          delay={0.1}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column (2/3): Today's Lectures timeline */}
        <div className="xl:col-span-2 space-y-6">
          <SectionCard
            title="Today's Classes & Roll Calls"
            description="Timeline of class sessions conducted today"
          >
            <div className="space-y-4">
              {classesToday.map((cls, i) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 border rounded-2xl bg-card hover:shadow-card transition-all gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">{cls.code}</Badge>
                        <h4 className="text-sm font-semibold">{cls.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {cls.time}
                      </p>
                    </div>
                  </div>

                  <div>
                    {cls.status === "present" ? (
                      <Badge className="bg-success/10 text-success border-success/30 font-semibold px-2.5 py-0.5 rounded-full">
                        Present
                      </Badge>
                    ) : cls.status === "scheduled" ? (
                      <Badge variant="outline" className="text-muted-foreground font-semibold px-2.5 py-0.5 rounded-full">
                        Scheduled
                      </Badge>
                    ) : (
                      <Badge className="bg-danger/10 text-danger border-danger/30 font-semibold px-2.5 py-0.5 rounded-full">
                        Absent
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column (1/3): Summary heatmap/recent logs */}
        <div className="space-y-6">
          
          {/* Calendar Heatmap card */}
          <SectionCard title="Attendance Heatmap" description="Recent weeks activity tracker">
            <div className="grid grid-cols-7 gap-1 bg-muted/30 p-4 rounded-xl border border-border">
              {Array.from({ length: 28 }).map((_, i) => {
                const colors = [
                  "bg-success/80 border-success/30",
                  "bg-success/40 border-success/20",
                  "bg-danger/60 border-danger/20",
                  "bg-muted border-border",
                ];
                let colorClass = colors[0];
                if (i === 12 || i === 23) colorClass = colors[2]; // Absences
                if (i === 6 || i === 19) colorClass = colors[1]; // Late
                if (i % 7 === 0 || i % 7 === 6) colorClass = colors[3]; // Weekends

                return (
                  <div
                    key={i}
                    className={`aspect-square rounded border transition-all ${colorClass}`}
                    title={`Day ${i + 1}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-3 px-1">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-muted border" />
                <span className="w-2.5 h-2.5 rounded bg-success/40 border" />
                <span className="w-2.5 h-2.5 rounded bg-success/80 border" />
              </div>
              <span>More</span>
            </div>
          </SectionCard>

          {/* AI Advisor Placeholder */}
          <SectionCard>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-semibold flex items-center gap-1.5">
                  AI Academic Advisor
                  <Badge variant="outline" className="text-[9px]">Beta</Badge>
                </h4>
                <p className="text-muted-foreground mt-0.5 leading-relaxed">
                  Your attendance rate of 86% is optimal. Maintain this to remain eligible for end-semester examinations.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

      </div>
    </DashboardLayout>
  );
}

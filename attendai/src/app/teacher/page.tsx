"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarCheck, BookOpen, Clock, Users, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useAuthStore } from "@/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

export default function TeacherDashboardPage() {
  const { user } = useAuthStore();
  const today = new Date();

  const classesToday = [
    { id: "c1", code: "CS301", name: "Algorithms & Complexities", time: "09:00 AM — 10:30 AM", room: "Room 402", studentsCount: 48, status: "completed" },
    { id: "c2", code: "CS305", name: "Operating Systems Lab", time: "11:00 AM — 01:00 PM", room: "Lab A", studentsCount: 45, status: "pending" },
    { id: "c3", code: "CS402", name: "Artificial Intelligence", time: "02:30 PM — 04:00 PM", room: "Room 102", studentsCount: 42, status: "pending" },
  ];

  const pendingLeaves = [
    { id: "l1", name: "Rahul Sharma", roll: "CSE-24-0012", reason: "Fever/Medical Checkup", date: "July 07 — July 09", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { id: "l2", name: "Pooja Patel", roll: "CSE-24-0043", reason: "Family Event", date: "July 08", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja" },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Teacher Portal" }]}
      role="teacher"
    >
      {/* Welcome strip */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome Back, {user?.full_name ?? "Prof. Anand Krishnan"} 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Faculty Portal · {format(today, "EEEE, MMMM d, yyyy")}
            </p>
          </div>
          <Link href="/teacher/attendance">
            <Button size="sm" className="btn-brand gap-1.5">
              <CalendarCheck className="w-4 h-4" /> Start Marking Attendance
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Classes Today"
          value={classesToday.length}
          subtitle="2 Completed · 1 Remaining"
          icon={<BookOpen className="w-5 h-5 text-primary" />}
          delay={0}
        />
        <StatsCard
          title="Assigned Students"
          value={135}
          subtitle="Across 3 sections"
          icon={<Users className="w-5 h-5 text-success" />}
          delay={0.05}
        />
        <StatsCard
          title="Pending Leaves"
          value={pendingLeaves.length}
          subtitle="Awaiting authorization"
          icon={<Clock className="w-5 h-5 text-warning" />}
          delay={0.1}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Today's Schedule */}
        <div className="xl:col-span-2 space-y-6">
          <SectionCard
            title="Today's Teaching Schedule"
            description="Complete attendance records for each assigned lecture session"
          >
            <div className="space-y-4">
              {classesToday.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-2xl bg-card hover:shadow-card transition-all gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">{c.code}</Badge>
                        <h4 className="text-sm font-semibold">{c.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {c.time} · {c.room}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <span className="text-xs text-muted-foreground">
                      {c.studentsCount} Students
                    </span>
                    {c.status === "completed" ? (
                      <Badge className="bg-success/10 text-success border-success/30">
                        Submitted
                      </Badge>
                    ) : (
                      <Link href={`/teacher/attendance?class=${c.id}`}>
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          Mark Attendance
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column (1/3): Leave Requests Action list */}
        <div className="space-y-6">
          <SectionCard
            title="Pending Leave Requests"
            description="Authorize student absence approvals"
            action={
              <Link href="/teacher/leave-requests" className="text-xs text-brand-600 hover:underline">
                View all
              </Link>
            }
          >
            <div className="space-y-4">
              {pendingLeaves.map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 border rounded-xl bg-card space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={l.avatar} />
                      <AvatarFallback className="text-xs">{l.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{l.name}</p>
                      <p className="text-[10px] text-muted-foreground">{l.roll}</p>
                    </div>
                  </div>

                  <div className="bg-muted/40 rounded-lg p-2.5 text-[10px]">
                    <p className="font-semibold text-muted-foreground">Reason</p>
                    <p className="font-medium mt-0.5">{l.reason}</p>
                    <p className="text-[9px] text-muted-foreground mt-1">Period: {l.date}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-[10px] h-7 w-full text-success hover:bg-success/10">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-[10px] h-7 w-full text-danger hover:bg-danger/10">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </DashboardLayout>
  );
}

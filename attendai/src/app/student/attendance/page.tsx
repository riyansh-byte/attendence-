"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { StatsCard } from "@/components/ui/stats-card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Percent, ShieldAlert, CheckCircle2, CalendarCheck, Clock, BookOpen } from "lucide-react";

interface SubjectStat {
  code: string;
  name: string;
  attended: number;
  total: number;
  rate: number;
  status: "good" | "warning" | "critical";
}

interface MonthlyTrendPoint {
  name: string;
  rate: number;
}

interface AttendanceLog {
  id: string;
  date: string;
  subject: string;
  time: string;
  status: "present" | "absent" | "late";
  markedBy: string;
}

interface IncidentLog {
  date: string;
  code: string;
  subject: string;
  reason: string;
  type: "excused" | "unexcused";
}

interface SemesterData {
  cumulativeScore: number;
  monthlyTrend: MonthlyTrendPoint[];
  subjectStats: SubjectStat[];
  atRiskCourses: { code: string; name: string; rate: number; classesNeeded: number }[];
  attendanceLogs: AttendanceLog[];
  incidentLogs: IncidentLog[];
}

const semesterDatasets: Record<string, SemesterData> = {
  "sem4": {
    cumulativeScore: 86.5,
    monthlyTrend: [
      { name: "Jan", rate: 94 },
      { name: "Feb", rate: 91 },
      { name: "Mar", rate: 88 },
      { name: "Apr", rate: 86 },
      { name: "May", rate: 76 },
      { name: "Jun", rate: 86 },
    ],
    subjectStats: [
      { code: "CS301", name: "Design & Analysis of Algorithms", attended: 24, total: 26, rate: 92.3, status: "good" },
      { code: "CS302", name: "Database Management Systems", attended: 18, total: 22, rate: 81.8, status: "warning" },
      { code: "CS305", name: "Software Engineering", attended: 21, total: 22, rate: 95.4, status: "good" },
      { code: "CS402", name: "Artificial Intelligence", attended: 12, total: 18, rate: 66.6, status: "critical" },
    ],
    atRiskCourses: [
      { code: "CS402", name: "Artificial Intelligence", rate: 66.6, classesNeeded: 3 },
    ],
    attendanceLogs: [
      { id: "h1", date: "2026-07-06", subject: "Design & Analysis of Algorithms", time: "09:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
      { id: "h2", date: "2026-07-06", subject: "Operating Systems Lab", time: "11:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
      { id: "h3", date: "2026-07-05", subject: "Design & Analysis of Algorithms", time: "09:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
      { id: "h4", date: "2026-07-03", subject: "Artificial Intelligence", time: "02:30 PM", status: "absent", markedBy: "Dr. Ramesh Iyer" },
      { id: "h5", date: "2026-07-02", subject: "Design & Analysis of Algorithms", time: "09:00 AM", status: "late", markedBy: "Prof. Anand Krishnan" },
      { id: "h6", date: "2026-07-01", subject: "Operating Systems Lab", time: "11:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
    ],
    incidentLogs: [
      { date: "2026-06-18", code: "CS402", subject: "Artificial Intelligence", reason: "Medical Leave (Excused)", type: "excused" },
      { date: "2026-06-14", code: "CS302", subject: "Database Management Systems", reason: "Unexcused Absence", type: "unexcused" },
      { date: "2026-05-22", code: "CS402", subject: "Artificial Intelligence", reason: "Unexcused Absence", type: "unexcused" },
      { date: "2026-05-19", code: "CS402", subject: "Artificial Intelligence", reason: "Fever (Excused)", type: "excused" },
    ]
  },
  "sem3": {
    cumulativeScore: 91.2,
    monthlyTrend: [
      { name: "Jul", rate: 95 },
      { name: "Aug", rate: 92 },
      { name: "Sep", rate: 94 },
      { name: "Oct", rate: 89 },
      { name: "Nov", rate: 90 },
      { name: "Dec", rate: 92 },
    ],
    subjectStats: [
      { code: "CS201", name: "Data Structures", attended: 28, total: 30, rate: 93.3, status: "good" },
      { code: "CS202", name: "Computer Organization", attended: 22, total: 25, rate: 88.0, status: "good" },
      { code: "CS203", name: "Discrete Mathematics", attended: 24, total: 26, rate: 92.3, status: "good" },
      { code: "CS204", name: "Object Oriented Programming", attended: 19, total: 24, rate: 79.1, status: "warning" },
    ],
    atRiskCourses: [],
    attendanceLogs: [
      { id: "h201", date: "2025-11-28", subject: "Data Structures", time: "10:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
      { id: "h202", date: "2025-11-26", subject: "Object Oriented Programming", time: "11:30 AM", status: "absent", markedBy: "Dr. Ramesh Iyer" },
      { id: "h203", date: "2025-11-25", subject: "Computer Organization", time: "09:00 AM", status: "present", markedBy: "Prof. S. Sharma" },
      { id: "h204", date: "2025-11-22", subject: "Discrete Mathematics", time: "02:00 PM", status: "present", markedBy: "Prof. Anand Krishnan" },
      { id: "h205", date: "2025-11-20", subject: "Data Structures", time: "10:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
    ],
    incidentLogs: [
      { date: "2025-11-26", code: "CS204", subject: "Object Oriented Programming", reason: "Personal Work (Unexcused)", type: "unexcused" },
      { date: "2025-10-14", code: "CS202", subject: "Computer Organization", reason: "Cold & Cough (Excused)", type: "excused" },
    ]
  },
  "sem2": {
    cumulativeScore: 73.8,
    monthlyTrend: [
      { name: "Jan", rate: 72 },
      { name: "Feb", rate: 78 },
      { name: "Mar", rate: 70 },
      { name: "Apr", rate: 75 },
      { name: "May", rate: 73 },
      { name: "Jun", rate: 75 },
    ],
    subjectStats: [
      { code: "CS105", name: "Digital Logic", attended: 18, total: 25, rate: 72.0, status: "critical" },
      { code: "CS106", name: "Basic Electronics", attended: 20, total: 26, rate: 76.9, status: "warning" },
      { code: "CS107", name: "Environmental Sciences", attended: 15, total: 22, rate: 68.1, status: "critical" },
      { code: "MA102", name: "Engineering Mathematics II", attended: 22, total: 28, rate: 78.5, status: "warning" },
    ],
    atRiskCourses: [
      { code: "CS105", name: "Digital Logic", rate: 72.0, classesNeeded: 1 },
      { code: "CS107", name: "Environmental Sciences", rate: 68.1, classesNeeded: 2 },
    ],
    attendanceLogs: [
      { id: "h101", date: "2025-05-15", subject: "Digital Logic", time: "09:00 AM", status: "absent", markedBy: "Prof. S. Sharma" },
      { id: "h102", date: "2025-05-14", subject: "Basic Electronics", time: "11:00 AM", status: "present", markedBy: "Dr. Ramesh Iyer" },
      { id: "h103", date: "2025-05-12", subject: "Engineering Mathematics II", time: "02:00 PM", status: "late", markedBy: "Prof. Anand Krishnan" },
      { id: "h104", date: "2025-05-10", subject: "Environmental Sciences", time: "11:00 AM", status: "absent", markedBy: "Prof. S. Sharma" },
    ],
    incidentLogs: [
      { date: "2025-05-15", code: "CS105", subject: "Digital Logic", reason: "Slept Late (Unexcused)", type: "unexcused" },
      { date: "2025-05-10", code: "CS107", subject: "Environmental Sciences", reason: "Missed Bus (Unexcused)", type: "unexcused" },
      { date: "2025-04-05", code: "CS105", subject: "Digital Logic", reason: "Medical Checkup (Excused)", type: "excused" },
    ]
  }
};

export default function StudentAttendancePage() {
  const [selectedSem, setSelectedSem] = useState<string>("sem4");
  const data = semesterDatasets[selectedSem] || semesterDatasets["sem4"];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Student Portal", href: "/student" },
        { label: "Attendance & Performance" }
      ]}
      role="student"
    >
      <PageHeader
        title="Attendance & Analytics"
        description="Comprehensive summary of your semester lectures attendance, presence history, and metrics."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Select Semester:</span>
            <Select value={selectedSem} onValueChange={(v) => v && setSelectedSem(v)}>
              <SelectTrigger className="w-48 bg-card border-border">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sem4">Semester 4 (Current)</SelectItem>
                <SelectItem value="sem3">Semester 3</SelectItem>
                <SelectItem value="sem2">Semester 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSem}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Top Section: Table logs & highlights */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column (2/3): Table logs */}
            <div className="xl:col-span-2">
              <SectionCard title="Attendance Logs History" description="Chronological record of classroom session logs for this semester.">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Recorded By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.attendanceLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-xs text-muted-foreground">
                            No attendance records found for this semester.
                          </TableCell>
                        </TableRow>
                      ) : (
                        data.attendanceLogs.map((row, i) => (
                          <motion.tr
                            key={row.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                              {format(new Date(row.date), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell className="text-xs font-semibold">{row.subject}</TableCell>
                            <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">{row.time}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`text-[9px] font-bold ${
                                  row.status === "present"
                                    ? "bg-success/15 text-success border-success/30"
                                    : row.status === "absent"
                                    ? "bg-danger/15 text-danger border-danger/30"
                                    : "bg-warning/15 text-warning border-warning/30"
                                }`}
                              >
                                {row.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{row.markedBy}</TableCell>
                          </motion.tr>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </SectionCard>
            </div>

            {/* Right Column (1/3): Metrics breakdown */}
            <div className="xl:col-span-1 space-y-6">
              <StatsCard
                title="Cumulative Attendance"
                value={data.cumulativeScore}
                suffix="%"
                subtitle="Minimum requirement: 75%"
                icon={<Percent className="w-5 h-5 text-primary" />}
                variant={data.cumulativeScore >= 75 ? "success" : "danger"}
              />

              <SectionCard title="At Risk Courses" description="Action required for low attendance courses.">
                <div className="space-y-4 mt-2">
                  {data.atRiskCourses.length === 0 ? (
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-success/20 bg-success/5">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-success">All Courses On Track!</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Excellent job! All your courses are safely above the 75% attendance threshold.
                        </p>
                      </div>
                    </div>
                  ) : (
                    data.atRiskCourses.map((course) => (
                      <div key={course.code} className="flex items-start gap-3 p-3 rounded-lg border border-danger/20 bg-danger/5">
                        <ShieldAlert className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-danger">{course.code} — {course.name}</h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Your rate is <strong>{course.rate}%</strong>. You need to attend <strong>{course.classesNeeded}</strong> more classes to reach 75%.
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </SectionCard>
            </div>

          </div>

          {/* Middle Section: Attendance Rate Over Time (Filled Line Graph) */}
          <SectionCard title="Attendance Rate Over Time" description="Monthly trend of your cumulative attendance percentage.">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="white" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance Rate"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={0.15} fill="hsl(var(--primary))" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* Bottom Sections: Subject-wise cards and Incident logs */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Subject-wise Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.subjectStats.map((sub) => (
                <motion.div
                  key={sub.code}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border bg-card p-5 flex flex-col justify-between shadow-card hover:shadow-md transition-all duration-200"
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
          </div>

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
                  {data.incidentLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-xs text-muted-foreground">
                        No incidents or absence logs recorded for this semester.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.incidentLogs.map((log, i) => (
                      <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="font-medium text-xs whitespace-nowrap">
                          {format(new Date(log.date), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{log.code}</TableCell>
                        <TableCell className="text-muted-foreground text-xs">{log.subject}</TableCell>
                        <TableCell className="italic text-xs text-muted-foreground">{log.reason}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={log.type === "excused" ? "bg-success/10 text-success border-success/30 font-semibold" : "bg-danger/10 text-danger border-danger/30 font-semibold"}>
                            {log.type === "excused" ? "Excused" : "Unexcused"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </SectionCard>

        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}

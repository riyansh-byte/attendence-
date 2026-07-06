"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";

export default function StudentAttendancePage() {
  const [history] = useState([
    { id: "h1", date: "2026-07-06", subject: "Design & Analysis of Algorithms", time: "09:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
    { id: "h2", date: "2026-07-06", subject: "Operating Systems Lab", time: "11:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
    { id: "h3", date: "2026-07-05", subject: "Design & Analysis of Algorithms", time: "09:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
    { id: "h4", date: "2026-07-03", subject: "Artificial Intelligence", time: "02:30 PM", status: "absent", markedBy: "Dr. Ramesh Iyer" },
    { id: "h5", date: "2026-07-02", subject: "Design & Analysis of Algorithms", time: "09:00 AM", status: "late", markedBy: "Prof. Anand Krishnan" },
    { id: "h6", date: "2026-07-01", subject: "Operating Systems Lab", time: "11:00 AM", status: "present", markedBy: "Prof. Anand Krishnan" },
  ]);

  const subjectSummary = [
    { name: "Algorithms", percentage: 92 },
    { name: "OS Lab", percentage: 88 },
    { name: "AI", percentage: 76 },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Student Portal", href: "/student" }, { label: "Attendance History" }]}
      role="student"
    >
      <PageHeader
        title="Attendance Records"
        description="Comprehensive summary of your semester lectures attendance, presence history, and metrics"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column (2/3): Table logs */}
        <div className="xl:col-span-2">
          <SectionCard title="Attendance Logs History" description="Chronological record of classroom session logs">
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
                  {history.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {format(new Date(row.date), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="text-xs font-semibold">{row.subject}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">{row.time}</TableCell>
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
                      <TableCell className="text-xs text-muted-foreground">{row.markedBy}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </div>

        {/* Right Column (1/3): Metrics breakdown bar */}
        <div className="xl:col-span-1 space-y-6">
          <SectionCard title="Subject Wise Attendance %" description="Percentage distribution by course subjects">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={subjectSummary} layout="vertical" margin={{ left: -10, right: 10, top: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t space-y-2.5">
              {subjectSummary.map((sub) => (
                <div key={sub.name} className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{sub.name}</span>
                  <Badge variant="outline" className={sub.percentage >= 75 ? "text-success border-success/30" : "text-danger border-danger/30"}>
                    {sub.percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </DashboardLayout>
  );
}

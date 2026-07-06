"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CalendarDays, Save, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StudentLeaveApp {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export default function StudentLeavePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const [history, setHistory] = useState<StudentLeaveApp[]>([
    { id: "lv_s1", startDate: "2026-07-07", endDate: "2026-07-09", reason: "Medical Leave (Fever)", status: "pending" },
    { id: "lv_s2", startDate: "2026-06-12", endDate: "2026-06-12", reason: "Attended hackathon event", status: "approved" },
    { id: "lv_s3", startDate: "2026-05-18", endDate: "2026-05-19", reason: "Personal family function out of town", status: "approved" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      toast.error("Please fill in all application fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);

    const newApp: StudentLeaveApp = {
      id: `lv_s_${Date.now()}`,
      startDate,
      endDate,
      reason,
      status: "pending",
    };

    setHistory([newApp, ...history]);
    setStartDate("");
    setEndDate("");
    setReason("");
    toast.success("Leave application submitted successfully!", {
      description: "Awaiting approval from department head.",
    });
  };

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Student Portal", href: "/student" }, { label: "Leave Requests" }]}
      role="student"
    >
      <PageHeader
        title="Leave Applications"
        description="Apply for session excuse tokens and track authorized exceptions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Form: Apply */}
        <div className="xl:col-span-1">
          <SectionCard title="Submit Application">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Start Date</Label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">End Date</Label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reason" className="text-xs">Reason for Absence</Label>
                <textarea
                  id="reason"
                  rows={3}
                  required
                  placeholder="State the reason clearly..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-ring resize-none outline-none"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full btn-brand gap-2 text-xs font-semibold">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting request...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Submit Application
                  </>
                )}
              </Button>
            </form>
          </SectionCard>
        </div>

        {/* Right: History applications */}
        <div className="xl:col-span-2">
          <SectionCard title="My Applied Leave Requests" description="History of submitted exceptions and approvals status">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {history.map((app, i) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 border rounded-2xl flex items-center justify-between text-xs hover:bg-muted/10 transition-colors bg-card gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-semibold">
                          {app.startDate} {app.startDate !== app.endDate && `— ${app.endDate}`}
                        </span>
                      </div>
                      <p className="text-muted-foreground truncate leading-normal max-w-sm sm:max-w-md">{app.reason}</p>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] font-bold shrink-0 px-2.5 py-0.5 rounded-full",
                        app.status === "approved"
                          ? "bg-success/15 text-success border-success/30"
                          : app.status === "rejected"
                          ? "bg-danger/15 text-danger border-danger/30"
                          : "bg-warning/15 text-warning border-warning/30"
                      )}
                    >
                      {app.status.toUpperCase()}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SectionCard>
        </div>

      </div>
    </DashboardLayout>
  );
}

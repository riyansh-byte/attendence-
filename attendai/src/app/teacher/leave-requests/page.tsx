"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, XCircle, FileText, AlertCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LeaveRequest {
  id: string;
  studentName: string;
  roll: string;
  avatar: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
}

export default function TeacherLeaveRequestsPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    { id: "lv_1", studentName: "Rahul Sharma", roll: "CSE-24-0012", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", reason: "Fever and doctor advised bed rest for 3 days.", startDate: "2026-07-07", endDate: "2026-07-09", status: "pending" },
    { id: "lv_2", studentName: "Pooja Patel", roll: "CSE-24-0043", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja", reason: "Attending elder sister's wedding ceremony.", startDate: "2026-07-08", endDate: "2026-07-08", status: "pending" },
    { id: "lv_3", studentName: "Vikram Malhotra", roll: "CSE-24-0029", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram", reason: "Participating in national level coding hackathon.", startDate: "2026-07-12", endDate: "2026-07-14", status: "approved" },
    { id: "lv_4", studentName: "Anjali Gupta", roll: "ECE-24-0091", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali", reason: "Personal work out of station.", startDate: "2026-07-01", endDate: "2026-07-03", status: "rejected" },
  ]);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    toast.success(`Leave request successfully ${action}!`);
  };

  const pending = requests.filter((r) => r.status === "pending");
  const processed = requests.filter((r) => r.status !== "pending");

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Teacher Portal", href: "/teacher" }, { label: "Leave Requests" }]}
      role="teacher"
    >
      <PageHeader
        title="Leave Requests"
        description="Review, approve, and record students' absence permissions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column: Pending Actions (2/3) */}
        <div className="xl:col-span-2 space-y-4">
          <SectionCard
            title={`Pending Requests (${pending.length})`}
            description="Require your review and approval authorization"
          >
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {pending.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground flex flex-col items-center gap-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-success opacity-75" />
                    <p className="text-sm">All pending leave applications cleared!</p>
                  </motion.div>
                ) : (
                  pending.map((req, i) => (
                    <motion.div
                      key={req.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 border rounded-2xl bg-card space-y-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarImage src={req.avatar} />
                            <AvatarFallback>{req.studentName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-semibold">{req.studentName}</h4>
                            <p className="text-[10px] text-muted-foreground font-mono">{req.roll}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{req.startDate} {req.startDate !== req.endDate && `— ${req.endDate}`}</span>
                        </div>
                      </div>

                      <div className="bg-muted/40 rounded-xl p-3 text-xs leading-relaxed text-muted-foreground">
                        <p className="font-semibold text-foreground mb-1">Reason for Absence</p>
                        {req.reason}
                      </div>

                      <div className="flex gap-2 justify-end pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(req.id, "rejected")}
                          className="text-xs h-8 text-danger hover:bg-danger/10"
                        >
                          <XCircle className="w-4 h-4 mr-1.5" /> Reject Request
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAction(req.id, "approved")}
                          className="btn-brand text-xs h-8"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1.5" /> Approve Leave
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Historical logs (1/3) */}
        <div className="xl:col-span-1">
          <SectionCard title="Recently Processed" description="Audit log of authorized leaves">
            <div className="space-y-3">
              {processed.map((req) => (
                <div key={req.id} className="p-3 border rounded-xl bg-card space-y-2 text-xs opacity-80">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{req.studentName}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] font-bold",
                        req.status === "approved"
                          ? "bg-success/10 text-success border-success/30"
                          : "bg-danger/10 text-danger border-danger/30"
                      )}
                    >
                      {req.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{req.reason}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </DashboardLayout>
  );
}

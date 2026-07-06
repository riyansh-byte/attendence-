"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AttendanceBadge } from "@/components/ui/attendance-badge";
import { mockStudents, mockSessions } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CalendarCheck, CheckCircle2, XCircle, Clock, Users,
  ChevronDown, Save, Loader2, Camera, QrCode, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "@/types";
import { toast } from "sonner";

const STATUS_OPTIONS: { value: AttendanceStatus; label: string; color: string }[] = [
  { value: "present", label: "Present", color: "text-success" },
  { value: "absent", label: "Absent", color: "text-danger" },
  { value: "late", label: "Late", color: "text-warning" },
  { value: "excused", label: "Excused", color: "text-info" },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("cls001");
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(mockStudents.slice(0, 12).map((s) => [s.id, "present"]))
  );
  const [isSaving, setIsSaving] = useState(false);

  const students = mockStudents.slice(0, 12);
  const presentCount = Object.values(records).filter((v) => v === "present").length;
  const absentCount = Object.values(records).filter((v) => v === "absent").length;
  const lateCount = Object.values(records).filter((v) => v === "late").length;

  const markAll = (status: AttendanceStatus) => {
    setRecords(Object.fromEntries(students.map((s) => [s.id, status])));
    toast.success(`Marked all students as ${status}`);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSaving(false);
    toast.success("Attendance saved successfully!", {
      description: `${presentCount} present, ${absentCount} absent, ${lateCount} late`,
    });
  };

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Attendance Center" },
      ]}
    >
      <PageHeader
        title="Attendance Center"
        description="Mark and manage attendance for your classes"
        actions={
          <Button
            size="sm"
            className="btn-brand gap-2"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Attendance"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* ── Session Config (left) ── */}
        <div className="xl:col-span-1 space-y-4">
          <SectionCard title="Session Setup">
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5">Class / Section</Label>
                <Select value={selectedClass} onValueChange={(v) => v && setSelectedClass(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cls001">CS301 — Algorithms</SelectItem>
                    <SelectItem value="cls002">EC201 — Signals</SelectItem>
                    <SelectItem value="cls003">ME101 — Thermodynamics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1.5">Date</Label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 ring-ring"
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Mode</Label>
                <Select defaultValue="manual">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">✍️ Manual</SelectItem>
                    <SelectItem value="qr" disabled>📱 QR Code (coming soon)</SelectItem>
                    <SelectItem value="face" disabled>🤖 Face Recognition (coming soon)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionCard>

          {/* Stats */}
          <SectionCard title="Session Summary">
            <div className="space-y-3">
              {[
                { label: "Present", count: presentCount, color: "text-success", bg: "bg-success/10", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
                { label: "Absent", count: absentCount, color: "text-danger", bg: "bg-danger/10", icon: <XCircle className="w-3.5 h-3.5" /> },
                { label: "Late", count: lateCount, color: "text-warning", bg: "bg-warning/10", icon: <Clock className="w-3.5 h-3.5" /> },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className={cn("flex items-center gap-2 text-xs font-medium", item.color)}>
                    <span className={cn("p-1 rounded-md", item.bg)}>{item.icon}</span>
                    {item.label}
                  </div>
                  <span className={cn("text-lg font-bold", item.color)}>{item.count}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Students</span>
                <span className="text-sm font-semibold">{students.length}</span>
              </div>
            </div>
          </SectionCard>

          {/* Bulk Actions */}
          <SectionCard title="Bulk Actions">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-success" onClick={() => markAll("present")}>
                <CheckCircle2 className="w-4 h-4" /> Mark All Present
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-danger" onClick={() => markAll("absent")}>
                <XCircle className="w-4 h-4" /> Mark All Absent
              </Button>
            </div>
          </SectionCard>

          {/* Future placeholders */}
          <SectionCard title="Coming Soon" className="opacity-60">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Camera className="w-4 h-4" />
                <span>Face Recognition Mode</span>
                <Badge variant="outline" className="text-[10px] ml-auto">AI</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <QrCode className="w-4 h-4" />
                <span>QR Attendance Mode</span>
                <Badge variant="outline" className="text-[10px] ml-auto">Beta</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>n8n Workflow Trigger</span>
                <Badge variant="outline" className="text-[10px] ml-auto">n8n</Badge>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── Student Grid (right) ── */}
        <div className="xl:col-span-3">
          <SectionCard
            title={`Students — CS301 Algorithms`}
            description={`${students.length} students enrolled`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {students.map((student, i) => {
                const status = records[student.id] ?? "present";
                return (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer",
                      status === "present" && "border-success/30 bg-success/5",
                      status === "absent" && "border-danger/30 bg-danger/5",
                      status === "late" && "border-warning/30 bg-warning/5",
                      status === "excused" && "border-info/30 bg-info/5"
                    )}
                  >
                    <Avatar className="w-9 h-9 shrink-0">
                      <AvatarImage src={student.avatar_url} />
                      <AvatarFallback className="text-xs">
                        {student.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{student.full_name}</p>
                      <p className="text-xs text-muted-foreground">{student.roll_number}</p>
                    </div>
                    <Select
                      value={status}
                      onValueChange={(v) =>
                        setRecords((prev) => ({ ...prev, [student.id]: v as AttendanceStatus }))
                      }
                    >
                      <SelectTrigger className="w-24 h-7 text-xs shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className={opt.color}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  );
}

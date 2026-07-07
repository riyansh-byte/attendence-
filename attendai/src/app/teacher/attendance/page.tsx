"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, XCircle, Clock, Save, Loader2 } from "lucide-react";
import { mockStudents } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type StatusType = "present" | "absent" | "late";

export default function TeacherAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("cs305");
  const [records, setRecords] = useState<Record<string, StatusType>>(
    Object.fromEntries(mockStudents.slice(0, 10).map((s) => [s.id, "present"]))
  );
  const [isSaving, setIsSaving] = useState(false);

  const students = mockStudents.slice(0, 10);
  const presentCount = Object.values(records).filter((v) => v === "present").length;
  const absentCount = Object.values(records).filter((v) => v === "absent").length;
  const lateCount = Object.values(records).filter((v) => v === "late").length;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSaving(false);
    toast.success("Attendance saved successfully!", {
      description: `${presentCount} present, ${absentCount} absent, ${lateCount} late saved.`,
    });
  };

  const markAll = (status: StatusType) => {
    setRecords(Object.fromEntries(students.map((s) => [s.id, status])));
    toast.success(`Marked all students as ${status}`);
  };

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard", href: "/teacher" }, { label: "Classes", href: "/teacher/classes" }, { label: "Attendance" }]}
      role="teacher"
    >
      <PageHeader
        title="Mark Attendance"
        description="Select class session, set student marks, and commit records"
        actions={
          <Button size="sm" className="btn-brand gap-1.5" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save Session"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Column: Select Options */}
        <div className="xl:col-span-1 space-y-4">
          <SectionCard title="Session Configuration">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Select Lecture Course</Label>
                <Select value={selectedClass} onValueChange={(v) => v && setSelectedClass(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs305">CS305 — Operating Systems Lab</SelectItem>
                    <SelectItem value="cs402">CS402 — Artificial Intelligence</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Class Date</Label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </SectionCard>

          {/* Quick Counter */}
          <SectionCard title="Roll Call Counts">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-success">
                <span className="font-semibold">Present</span>
                <span className="text-lg font-bold">{presentCount}</span>
              </div>
              <div className="flex justify-between items-center text-danger">
                <span className="font-semibold">Absent</span>
                <span className="text-lg font-bold">{absentCount}</span>
              </div>
              <div className="flex justify-between items-center text-warning">
                <span className="font-semibold">Late Arrivals</span>
                <span className="text-lg font-bold">{lateCount}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center font-medium">
                <span>Class Total</span>
                <span>{students.length}</span>
              </div>
            </div>
          </SectionCard>

          {/* Quick actions */}
          <SectionCard title="Bulk Commands">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full text-success hover:bg-success/10 justify-start gap-2" onClick={() => markAll("present")}>
                <CheckCircle2 className="w-4 h-4" /> Mark All Present
              </Button>
              <Button variant="outline" size="sm" className="w-full text-danger hover:bg-danger/10 justify-start gap-2" onClick={() => markAll("absent")}>
                <XCircle className="w-4 h-4" /> Mark All Absent
              </Button>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Grid Roll Call */}
        <div className="xl:col-span-3">
          <SectionCard title="Roll Call Sheet" description={`${students.length} students enrolled in active section`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {students.map((student, i) => {
                const status = records[student.id] ?? "present";
                return (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "p-3.5 border rounded-2xl flex items-center justify-between transition-all gap-4",
                      status === "present" && "bg-success/5 border-success/30",
                      status === "absent" && "bg-danger/5 border-danger/30",
                      status === "late" && "bg-warning/5 border-warning/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={student.avatar_url} />
                        <AvatarFallback className="text-xs">{student.full_name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold truncate max-w-[140px]">{student.full_name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{student.roll_number}</p>
                      </div>
                    </div>

                    {/* Status controller pills */}
                    <div className="flex gap-1">
                      {[
                        { type: "present", label: "P", color: "hover:bg-success/20", activeColor: "bg-success text-white" },
                        { type: "absent", label: "A", color: "hover:bg-danger/20", activeColor: "bg-danger text-white" },
                        { type: "late", label: "L", color: "hover:bg-warning/20", activeColor: "bg-warning text-white" },
                      ].map((item) => (
                        <button
                          key={item.type}
                          onClick={() => setRecords({ ...records, [student.id]: item.type as StatusType })}
                          className={cn(
                            "w-8 h-8 rounded-lg text-xs font-bold border transition-colors",
                            status === item.type ? item.activeColor : `bg-card text-muted-foreground ${item.color}`
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
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

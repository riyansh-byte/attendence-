"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Sliders, Bell, Eye, Save } from "lucide-react";
import { toast } from "sonner";

export default function TeacherSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  // Preference states
  const [autoSaveAttendance, setAutoSaveAttendance] = useState(true);
  const [sendWeeklyReports, setSendWeeklyReports] = useState(true);
  const [notifyOnLeaves, setNotifyOnLeaves] = useState(true);
  const [showInActiveStudents, setShowInActiveStudents] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success("Preferences updated successfully!");
  };

  return (
    <DashboardLayout
      role="teacher"
      breadcrumbs={[{ label: "Dashboard", href: "/teacher" }, { label: "Settings" }]}
    >
      <PageHeader
        title="Settings"
        description="Configure your dashboard controls, reporting frequency, and student attendance taking preferences"
      />

      <div className="max-w-3xl space-y-6">
        <SectionCard title="Attendance Taking Preferences" description="Configure default values when marking records.">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Auto-save draft</Label>
                  <p className="text-xs text-muted-foreground">Periodically commit attendance sheet drafts automatically while offline/inactive.</p>
                </div>
                <Switch checked={autoSaveAttendance} onCheckedChange={setAutoSaveAttendance} />
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Hide Inactive/Suspended Students</Label>
                  <p className="text-xs text-muted-foreground">Keep the active roll call sheet clean by hiding students with inactive profiles.</p>
                </div>
                <Switch checked={!showInActiveStudents} onCheckedChange={(val) => setShowInActiveStudents(!val)} />
              </div>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Notifications & Reporting Preferences" description="Manage alerts when students submit requests.">
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Leave Request Alerts</Label>
                <p className="text-xs text-muted-foreground">Receive instant notifications when students in your assigned courses apply for leave.</p>
              </div>
              <Switch checked={notifyOnLeaves} onCheckedChange={setNotifyOnLeaves} />
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Weekly Report Summaries</Label>
                <p className="text-xs text-muted-foreground">Receive compiled PDF attendance sheets for your assigned departments via email.</p>
              </div>
              <Switch checked={sendWeeklyReports} onCheckedChange={setSendWeeklyReports} />
            </div>
          </div>

          <div className="flex justify-end border-t border-border pt-4 mt-4">
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" /> Save Settings
            </Button>
          </div>
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}

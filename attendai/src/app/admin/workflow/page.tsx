"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Workflow, Play, CheckCircle2, MessageSquare, Mail, Bell,
  ArrowRight, ShieldAlert, Cpu, ExternalLink, Code2, RefreshCcw
} from "lucide-react";
import { toast } from "sonner";

interface WorkflowLog {
  id: string;
  triggerName: string;
  status: "success" | "failed";
  timestamp: string;
  duration: string;
  response: string;
}

export default function WorkflowPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [logs, setLogs] = useState<WorkflowLog[]>([
    { id: "wf_1", triggerName: "Attendance Anomaly Detection", status: "success", timestamp: "2026-07-06 18:24:10", duration: "1.2s", response: "{ 'status': 'notified', 'sent': 12 }" },
    { id: "wf_2", triggerName: "Weekly Student PDF compiler", status: "success", timestamp: "2026-07-05 12:00:00", duration: "4.8s", response: "{ 's3_uploaded': true, 'key': 'CSE_W2' }" },
    { id: "wf_3", triggerName: "Slack Dean Alerts", status: "success", timestamp: "2026-07-05 09:30:15", duration: "0.4s", response: "{ 'channel': '#dean-ops', 'status': 'ok' }" },
    { id: "wf_4", triggerName: "n8n Parent WhatsApp auto-ping", status: "failed", timestamp: "2026-07-04 10:15:32", duration: "2.1s", response: "{ 'error': 'API quota exceeded' }" },
  ]);

  const handleTestTrigger = async () => {
    toast.info("Sending test webhook request to n8n...");
    await new Promise((r) => setTimeout(r, 1200));

    const newLog: WorkflowLog = {
      id: `wf_${Date.now()}`,
      triggerName: "Manual Webhook Verification",
      status: "success",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      duration: "0.8s",
      response: "{ 'message': 'Endpoint verified. Connection active.' }",
    };

    setLogs([newLog, ...logs]);
    toast.success("Webhook test run successful!");
  };

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Workflow Center" }]}
    >
      <PageHeader
        title="Workflow Center"
        description="Automate attendance alerts, sync data with third-party ERPs, and trace background n8n node executions"
        actions={
          <Button size="sm" className="btn-brand gap-1.5" onClick={handleTestTrigger}>
            <Play className="w-4 h-4" /> Trigger Test Run
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left column: Setup & visual */}
        <div className="xl:col-span-1 space-y-4">
          <SectionCard title="Workflow Controller">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">Automatic triggers</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Allow webhooks to fire on anomaly records
                  </p>
                </div>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">n8n Gateway Endpoint</Label>
                  <input
                    type="text"
                    readOnly
                    value="https://n8n.workflow.myorg.com/webhook/attendance"
                    className="w-full text-xs font-mono bg-muted/50 border rounded-lg p-2.5 outline-none select-all cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Secret Token Header</Label>
                  <input
                    type="password"
                    readOnly
                    value="••••••••••••••••••••••••••••••••"
                    className="w-full text-xs font-mono bg-muted/50 border rounded-lg p-2.5 outline-none"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Workflow nodes diagram visualization */}
          <SectionCard title="Pipeline Visualizer">
            <div className="space-y-3 relative text-xs">
              <div className="flex flex-col gap-4 relative">
                {/* Node 1 */}
                <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-card">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Attendance Log</p>
                    <p className="text-[10px] text-success font-medium">Webhook Trigger</p>
                  </div>
                </div>

                <div className="w-px bg-border h-4 ml-6" />

                {/* Node 2 */}
                <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-card relative">
                  <div className="w-7 h-7 rounded-lg bg-warning/10 text-warning flex items-center justify-center shrink-0">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">n8n Router Node</p>
                    <p className="text-[10px] text-muted-foreground">Anomaly filter &gt; 25%</p>
                  </div>
                </div>

                <div className="w-px bg-border h-4 ml-6" />

                {/* Node 3 */}
                <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-card">
                  <div className="w-7 h-7 rounded-lg bg-success/10 text-success flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Alert Parents</p>
                    <p className="text-[10px] text-muted-foreground">Auto-email / WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right column: Execution log */}
        <div className="xl:col-span-2">
          <SectionCard
            title="Execution History"
            description="Trace recent webhook payloads, run-times, and server response states"
          >
            <div className="space-y-3">
              {logs.map((log, i) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 border rounded-xl bg-card text-xs flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={log.status === "success" ? "outline" : "destructive"}
                        className={log.status === "success" ? "bg-success/10 text-success border-success/30" : ""}
                      >
                        {log.status === "success" ? "Success" : "Failed"}
                      </Badge>
                      <span className="font-semibold">{log.triggerName}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{log.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-1 bg-muted/40 rounded-lg p-2.5 font-mono text-[10px]">
                    <div>
                      <p className="text-muted-foreground font-sans">Node Time</p>
                      <p className="font-semibold mt-0.5">{log.duration}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground font-sans text-right">Response payload</p>
                      <p className="font-semibold mt-0.5 text-right text-brand-500 truncate">{log.response}</p>
                    </div>
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

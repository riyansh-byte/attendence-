"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Bell, CheckCheck, Trash2, CalendarCheck, ShieldAlert,
  Sliders, MessageSquare, AlertCircle, HeartCrack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SystemNotification {
  id: string;
  category: "attendance" | "system" | "workflow";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const { unreadCount, clearUnread, decrementUnread } = useNotificationStore();
  const [tab, setTab] = useState<"all" | "attendance" | "system" | "workflow">("all");

  const [items, setItems] = useState<SystemNotification[]>([
    { id: "not_1", category: "attendance", title: "Anomaly Detected in CS301", message: "Class CS301 attendance dropped below 75% for 3 consecutive lectures.", timestamp: "10 mins ago", read: false },
    { id: "not_2", category: "workflow", title: "n8n Webhook Sent", message: "Successfully triggered auto-escalation alert for 5 absent students.", timestamp: "1 hour ago", read: false },
    { id: "not_3", category: "system", title: "AWS S3 Sync Completed", message: "All semester monthly report PDF compilations were successfully synced.", timestamp: "Yesterday", read: true },
    { id: "not_4", category: "attendance", title: "Leave Request Approved", message: "Student Rahul Sharma (CSE) leave request approved by Dean.", timestamp: "2 days ago", read: true },
    { id: "not_5", category: "system", title: "Weekly Security Audit Run", message: "Supabase JWT authentication logs reviewed. 0 failed attempts.", timestamp: "3 days ago", read: true },
  ]);

  const handleMarkAllRead = () => {
    setItems(items.map((i) => ({ ...i, read: true })));
    clearUnread();
    toast.success("All notifications marked as read");
  };

  const handleToggleRead = (id: string, currentlyRead: boolean) => {
    setItems(items.map((item) => (item.id === id ? { ...item, read: true } : item)));
    if (!currentlyRead) {
      decrementUnread();
    }
  };

  const handleDelete = (id: string, currentlyRead: boolean) => {
    setItems(items.filter((item) => item.id !== id));
    if (!currentlyRead) {
      decrementUnread();
    }
    toast.success("Notification deleted");
  };

  const filtered = items.filter((i) => tab === "all" || i.category === tab);

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Notifications" }]}
    >
      <PageHeader
        title="Notifications Center"
        description="Manage alerts, system updates, and automated workflow triggers"
        actions={
          unreadCount > 0 && (
            <Button size="sm" variant="outline" className="gap-1.5" onClick={handleMarkAllRead}>
              <CheckCheck className="w-4 h-4" /> Mark all read
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <SectionCard title="Categories">
            <div className="flex flex-col gap-1 text-xs">
              {[
                { id: "all", label: "All Alerts", icon: <Bell className="w-4 h-4" /> },
                { id: "attendance", label: "Attendance Logs", icon: <CalendarCheck className="w-4 h-4 text-success" /> },
                { id: "workflow", label: "Workflows", icon: <MessageSquare className="w-4 h-4 text-warning" /> },
                { id: "system", label: "System Updates", icon: <ShieldAlert className="w-4 h-4 text-info" /> },
              ].map((category) => {
                const count = category.id === "all" 
                  ? items.filter(i => !i.read).length 
                  : items.filter(i => i.category === category.id && !i.read).length;

                return (
                  <button
                    key={category.id}
                    onClick={() => setTab(category.id as any)}
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-lg transition-colors font-medium text-left",
                      tab === category.id
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      {category.label}
                    </div>
                    {count > 0 && (
                      <Badge className={tab === category.id ? "bg-white text-primary" : "bg-primary text-white"}>
                        {count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Notifications List */}
        <div className="xl:col-span-3">
          <SectionCard
            title={tab.charAt(0).toUpperCase() + tab.slice(1) + " Alerts"}
            description={`Viewing ${filtered.length} notification logs`}
          >
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-muted-foreground flex flex-col items-center gap-2"
                  >
                    <AlertCircle className="w-8 h-8 opacity-45" />
                    <p className="text-sm">No notifications found in this category</p>
                  </motion.div>
                ) : (
                  filtered.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      onClick={() => handleToggleRead(item.id, item.read)}
                      className={cn(
                        "p-4 border rounded-2xl flex items-start gap-4 transition-all relative overflow-hidden cursor-pointer",
                        item.read ? "bg-card" : "bg-brand-50/20 dark:bg-brand-950/15 border-brand-200/50"
                      )}
                    >
                      {!item.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500" />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="text-sm font-semibold">{item.title}</h4>
                          <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.message}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.read);
                        }}
                        className="h-8 w-8 text-muted-foreground hover:text-danger hover:bg-danger/10 opacity-40 hover:opacity-100 shrink-0 self-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </SectionCard>
        </div>

      </div>
    </DashboardLayout>
  );
}

"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "org_admin" | "teacher" | "student";
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function DashboardLayout({
  children,
  role = "org_admin",
  title,
  breadcrumbs,
}: DashboardLayoutProps) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar role={role} />
      <TopBar title={title} breadcrumbs={breadcrumbs} />
      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="pt-16 min-h-screen"
      >
        <div className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}

"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader, SectionCard } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockDepartments } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Plus, Search, GraduationCap, Users, BookOpen, Trash2, Edit3, Settings
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState(mockDepartments);

  // Modal / Input forms triggers
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptCode, setNewDeptCode] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || !newDeptCode) {
      toast.error("Please fill in department name and code");
      return;
    }
    const newDept = {
      id: `dept_${Date.now()}`,
      organization_id: "org_default",
      name: newDeptName,
      code: newDeptCode.toUpperCase(),
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDepartments([...departments, newDept]);
    setNewDeptName("");
    setNewDeptCode("");
    toast.success("Department added successfully!");
  };

  const handleToggleStatus = (id: string) => {
    setDepartments(
      departments.map((d) => (d.id === id ? { ...d, is_active: !d.is_active } : d))
    );
    toast.success("Department status updated");
  };

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Departments" }]}
    >
      <PageHeader
        title="Departments"
        description="Configure organization divisions, codes, and access permissions"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Form: Add department */}
        <div className="xl:col-span-1">
          <SectionCard title="Create Department">
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="deptName" className="text-xs">Department Name</Label>
                <Input
                  id="deptName"
                  placeholder="e.g. Electrical Engineering"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="deptCode" className="text-xs">Department Code</Label>
                <Input
                  id="deptCode"
                  placeholder="e.g. ECE"
                  value={newDeptCode}
                  onChange={(e) => setNewDeptCode(e.target.value)}
                  className="font-mono"
                />
              </div>

              <Button type="submit" className="w-full btn-brand gap-2 text-xs font-semibold">
                <Plus className="w-4 h-4" /> Add Department
              </Button>
            </form>
          </SectionCard>

          {/* Quick Stats Panel */}
          <SectionCard title="Department Insights" className="mt-4">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Departments</span>
                <span className="font-bold">{departments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Divisions</span>
                <span className="font-bold text-success">
                  {departments.filter((d) => d.is_active).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Standardized Codes</span>
                <span className="font-bold font-mono">ISO-3166 Grade</span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Grid: Department list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`border rounded-2xl bg-card p-5 hover:shadow-card-hover transition-all flex flex-col justify-between ${
                  !dept.is_active && "opacity-60 bg-muted/20"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {dept.code}
                    </Badge>
                    <Badge
                      variant={dept.is_active ? "default" : "secondary"}
                      className={`text-[10px] cursor-pointer ${
                        dept.is_active
                          ? "bg-success/15 text-success hover:bg-success/20 border-success/30"
                          : ""
                      }`}
                      onClick={() => handleToggleStatus(dept.id)}
                    >
                      {dept.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <Link href={`/admin/teachers?department=${dept.id}`}>
                    <h3 className="text-sm font-semibold tracking-tight text-balance mb-1 leading-tight hover:text-primary transition-colors cursor-pointer">
                      {dept.name}
                    </h3>
                  </Link>

                  <div className="flex gap-3 text-[11px] mt-1.5 text-muted-foreground font-medium">
                    <Link
                      href={`/admin/students?department=${dept.id}`}
                      className="flex items-center gap-1 hover:text-primary hover:underline transition-all"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{dept.student_count ?? 0} Students</span>
                    </Link>
                    <Link
                      href={`/admin/teachers?department=${dept.id}`}
                      className="flex items-center gap-1 hover:text-primary hover:underline transition-all"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{dept.teacher_count ?? 0} Teachers</span>
                    </Link>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-3 mt-4 text-xs text-muted-foreground">
                  <Link
                    href={`/admin/teachers?department=${dept.id}`}
                    className="text-xs text-primary hover:text-primary/80 hover:underline font-semibold transition-all"
                  >
                    View Teachers →
                  </Link>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Edit3 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

// Inline Label for quick form creation helper
function Label({ className, children, ...props }: any) {
  return (
    <label className={`text-xs font-semibold text-muted-foreground ${className}`} {...props}>
      {children}
    </label>
  );
}

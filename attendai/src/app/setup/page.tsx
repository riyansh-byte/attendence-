"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Loader2, ArrowRight, ArrowLeft, Plus, Trash2, Mail,
  BookOpen, Users, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface DepartmentPreset {
  name: string;
  code: string;
}

interface TeacherInvite {
  email: string;
  name: string;
  departmentCode: string;
}

export default function SetupWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Departments State
  const [departments, setDepartments] = useState<DepartmentPreset[]>([
    { name: "Computer Science & Engineering", code: "CSE" },
    { name: "Electronics & Communication", code: "ECE" },
    { name: "Business Administration", code: "MBA" },
  ]);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptCode, setNewDeptCode] = useState("");

  // Step 2: Teachers State
  const [teachers, setTeachers] = useState<TeacherInvite[]>([
    { email: "krishnan@attendai.com", name: "Prof. Anand Krishnan", departmentCode: "CSE" },
    { email: "iyer@attendai.com", name: "Dr. Ramesh Iyer", departmentCode: "ECE" },
  ]);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherDept, setNewTeacherDept] = useState("CSE");



  // Handlers
  const addDepartment = () => {
    if (!newDeptName || !newDeptCode) {
      toast.error("Please enter department name and code");
      return;
    }
    if (departments.some((d) => d.code.toUpperCase() === newDeptCode.toUpperCase())) {
      toast.error("A department with this code already exists");
      return;
    }
    setDepartments([...departments, { name: newDeptName, code: newDeptCode.toUpperCase() }]);
    setNewDeptName("");
    setNewDeptCode("");
    toast.success("Department added");
  };

  const removeDepartment = (code: string) => {
    setDepartments(departments.filter((d) => d.code !== code));
  };

  const addTeacher = () => {
    if (!newTeacherName || !newTeacherEmail) {
      toast.error("Please enter teacher name and email");
      return;
    }
    if (teachers.some((t) => t.email.toLowerCase() === newTeacherEmail.toLowerCase())) {
      toast.error("This teacher email is already invited");
      return;
    }
    setTeachers([
      ...teachers,
      { name: newTeacherName, email: newTeacherEmail, departmentCode: newTeacherDept },
    ]);
    setNewTeacherName("");
    setNewTeacherEmail("");
    toast.success("Teacher invitation added");
  };

  const removeTeacher = (email: string) => {
    setTeachers(teachers.filter((t) => t.email !== email));
  };

  const handleCompleteSetup = async () => {
    setIsLoading(true);
    // Simulate multi-step onboarding submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast.success("Organization onboarding complete!");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-between font-sans">
      
      {/* Header bar */}
      <header className="h-16 border-b bg-card flex items-center px-6 sm:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold gradient-text">AttendAI Onboarding</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <span>Step {step} of 3</span>
          <div className="w-24 bg-muted h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl w-full mx-auto p-6 py-12 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Department settings */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border bg-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6"
            >
              <div>
                <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-500" />
                  Define Academic Departments
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Create departments to categorize students and classes. You can add or modify these later.
                </p>
              </div>

              {/* Added Departments list */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Active Departments</Label>
                <div className="flex flex-col gap-2">
                  {departments.map((dept) => (
                    <div
                      key={dept.code}
                      className="flex items-center justify-between p-3 border rounded-xl bg-muted/20"
                    >
                      <div>
                        <p className="text-sm font-semibold">{dept.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">Code: {dept.code}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDepartment(dept.code)}
                        className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10"
                        disabled={departments.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Department Form Inline */}
              <div className="border-t pt-4">
                <Label className="text-xs font-semibold mb-2 block">Add New Department</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <div className="col-span-2 space-y-1">
                    <Input
                      placeholder="e.g. Mechanical Engineering"
                      value={newDeptName}
                      onChange={(e) => setNewDeptName(e.target.value)}
                      className="h-10 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Code (e.g. MECH)"
                      value={newDeptCode}
                      onChange={(e) => setNewDeptCode(e.target.value)}
                      className="h-10 text-xs font-mono"
                    />
                  </div>
                  <Button
                    onClick={addDepartment}
                    className="h-10 text-xs font-semibold flex items-center justify-center gap-1 col-span-3 sm:col-span-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-muted-foreground">Setup departments before adding students.</span>
                <Button onClick={() => setStep(2)} className="btn-brand gap-2 text-xs font-semibold">
                  Continue to Teachers
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Invite teachers */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border bg-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6"
            >
              <div>
                <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-500" />
                  Invite Teaching Staff
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Invite your lecturers or staff to manage class attendance and leave requests.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold">Invited Teachers</Label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {teachers.map((teacher) => (
                    <div
                      key={teacher.email}
                      className="flex items-center justify-between p-3 border rounded-xl bg-muted/20 text-xs"
                    >
                      <div>
                        <p className="font-semibold">{teacher.name}</p>
                        <p className="text-muted-foreground">{teacher.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-[10px]">
                          {teacher.departmentCode}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTeacher(teacher.email)}
                          className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invite Teacher Form */}
              <div className="border-t pt-4 space-y-3">
                <Label className="text-xs font-semibold">Invite a Teacher</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    placeholder="Full Name"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    className="h-10 text-xs"
                  />
                  <Input
                    placeholder="Email address"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                    className="h-10 text-xs"
                  />
                  <div className="flex gap-2">
                    <select
                      value={newTeacherDept}
                      onChange={(e) => setNewTeacherDept(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-ring"
                    >
                      {departments.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.code}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={addTeacher}
                      className="h-10 text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-4 h-4" /> Invite
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="ghost" onClick={() => setStep(1)} className="gap-2 text-xs font-semibold">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={() => setStep(3)} className="btn-brand gap-2 text-xs font-semibold">
                  Continue to Summary
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Onboarding Summary & Finish */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border bg-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-500/10 text-brand-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">Onboarding Configuration Ready!</h1>
                <p className="text-xs text-muted-foreground mt-1.5 max-w-sm mx-auto">
                  You're all set. We're ready to deploy your workspace database schemas, departments, and teachers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border rounded-xl p-4 bg-muted/20 text-left text-xs">
                <div>
                  <p className="text-muted-foreground">Departments</p>
                  <p className="font-bold text-lg">{departments.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Staff Invited</p>
                  <p className="font-bold text-lg">{teachers.length}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="ghost" onClick={() => setStep(2)} className="gap-2 text-xs font-semibold" disabled={isLoading}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleCompleteSetup}
                  disabled={isLoading}
                  className="btn-brand gap-2 text-xs font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deploying infrastructure...
                    </>
                  ) : (
                    <>
                      Finish & Go to Dashboard
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer bar */}
      <footer className="h-12 border-t bg-card/60 flex items-center justify-center text-[10px] text-muted-foreground">
        © 2026 AttendAI Platform Inc. · Built for high availability.
      </footer>
    </div>
  );
}

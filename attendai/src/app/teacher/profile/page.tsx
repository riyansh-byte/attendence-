"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { UserProfileEditor } from "@/components/profile/UserProfileEditor";

export default function TeacherProfilePage() {
  return (
    <DashboardLayout
      role="teacher"
      breadcrumbs={[{ label: "Dashboard", href: "/teacher" }, { label: "Profile" }]}
    >
      <PageHeader
        title="My Profile"
        description="Manage your teacher profile information, account credentials, and notification settings"
      />
      <UserProfileEditor roleLabel="teacher" />
    </DashboardLayout>
  );
}

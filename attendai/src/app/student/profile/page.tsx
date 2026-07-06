"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { UserProfileEditor } from "@/components/profile/UserProfileEditor";

export default function StudentProfilePage() {
  return (
    <DashboardLayout
      role="student"
      breadcrumbs={[{ label: "Dashboard", href: "/student" }, { label: "Profile" }]}
    >
      <PageHeader
        title="My Profile"
        description="View your student card details, edit profile bio, and manage notifications"
      />
      <UserProfileEditor roleLabel="student" />
    </DashboardLayout>
  );
}

"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { UserProfileEditor } from "@/components/profile/UserProfileEditor";

export default function AdminProfilePage() {
  return (
    <DashboardLayout
      role="org_admin"
      breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Profile" }]}
    >
      <PageHeader
        title="My Profile"
        description="View and update your personal details, credentials, and notification settings"
      />
      <UserProfileEditor roleLabel="organization admin" />
    </DashboardLayout>
  );
}

// src/app/dashboard/layout.tsx
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardGuard from "./DashboardGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardGuard>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </DashboardGuard>
  );
}

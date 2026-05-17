import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar />
      <div className="ml-60">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

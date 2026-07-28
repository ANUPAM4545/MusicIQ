import { EmptyState } from "@/components/ui/EmptyState";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to MusicIQ.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <EmptyState 
          title="Dashboard Coming Soon" 
          description="The dashboard overview will be implemented in a future milestone."
          icon={<LayoutDashboard size={48} />}
        />
      </div>
    </div>
  );
}

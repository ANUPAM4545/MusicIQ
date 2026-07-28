import { EmptyState } from "@/components/ui/EmptyState";
import { BarChart2 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Visualise your listening habits and rating trends.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <EmptyState 
          title="Analytics Coming Soon" 
          description="The analytics charts and visualisations will be implemented in a future milestone."
          icon={<BarChart2 size={48} />}
        />
      </div>
    </div>
  );
}

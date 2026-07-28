import { EmptyState } from "@/components/ui/EmptyState";
import { BrainCircuit } from "lucide-react";

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
        <p className="text-muted-foreground">
          Intelligent analysis and recommendations based on your library.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <EmptyState 
          title="AI Insights Coming Soon" 
          description="The AI-powered insights engine will be implemented in a future milestone."
          icon={<BrainCircuit size={48} />}
        />
      </div>
    </div>
  );
}

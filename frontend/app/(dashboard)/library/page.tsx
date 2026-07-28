import { EmptyState } from "@/components/ui/EmptyState";
import { Library } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your Library</h2>
        <p className="text-muted-foreground">
          Manage your saved albums and personal ratings.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <EmptyState 
          title="Library Coming Soon" 
          description="The personal music library interface will be implemented in a future milestone."
          icon={<Library size={48} />}
        />
      </div>
    </div>
  );
}

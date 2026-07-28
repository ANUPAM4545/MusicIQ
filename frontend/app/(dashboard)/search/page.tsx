import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Search</h2>
        <p className="text-muted-foreground">
          Discover new music and add to your library.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <EmptyState 
          title="Album Search Coming Soon" 
          description="The iTunes search integration will be implemented in a future milestone."
          icon={<Search size={48} />}
        />
      </div>
    </div>
  );
}

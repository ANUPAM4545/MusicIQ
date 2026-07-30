import { BarChart3, Search } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function AnalyticsEmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 w-full">
      <EmptyState 
        title="No Analytics Available" 
        description="Add albums to your library to unlock analytics and generate insights about your music collection."
        icon={<BarChart3 size={48} />}
      />
      <div className="flex justify-center mt-6">
        <Link href="/search">
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search Albums
          </Button>
        </Link>
      </div>
    </div>
  );
}

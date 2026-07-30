import { Sparkles, Search } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function InsightsEmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 w-full">
      <EmptyState 
        title="No Insights Available" 
        description="Build your music library to unlock personalized AI insights about your collection."
        icon={<Sparkles size={48} />}
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

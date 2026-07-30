import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { InsightBadge } from '@/components/insights/InsightBadge';

interface LatestInsightCardProps {
  summary: string;
  healthStatus?: string;
}

export function LatestInsightCard({ summary, healthStatus }: LatestInsightCardProps) {
  return (
    <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 border-b border-gray-50 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Latest AI Insight
        </CardTitle>
        {healthStatus && (
          <InsightBadge
            label={healthStatus}
          />
        )}
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-between">
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
          {summary}
        </p>
        <Link href="/ai-insights" className="block w-full">
          <Button variant="outline" className="w-full justify-center group">
            View All Insights
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

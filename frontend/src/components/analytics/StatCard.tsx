import { ReactNode } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  tooltip?: string;
}

export function StatCard({ title, value, icon, tooltip }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm flex items-center justify-between transition-colors">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className="p-3 bg-primary/10 text-primary rounded-full">
        {icon}
      </div>
    </div>
  );
}

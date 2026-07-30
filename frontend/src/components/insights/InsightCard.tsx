import { ReactNode } from 'react';
import * as LucideIcons from 'lucide-react';
import { InsightBadge } from './InsightBadge';

interface InsightCardProps {
  title: string;
  description: string;
  iconName?: string;
  badgeLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function InsightCard({ title, description, iconName, badgeLabel, children, className = '' }: InsightCardProps) {
  // Dynamically resolve icon from lucide-react if provided
  const IconComponent = iconName ? (LucideIcons as unknown as Record<string, React.ElementType>)[iconName] : null;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {IconComponent && (
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <IconComponent size={20} />
            </div>
          )}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {badgeLabel && <InsightBadge label={badgeLabel} />}
      </div>
      
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
      
      {children && (
        <div className="mt-auto pt-4 border-t border-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

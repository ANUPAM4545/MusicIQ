import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="flex-1 min-h-[300px]">
        {children}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search, Library, BarChart3, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function QuickActionCard() {
  const actions = [
    {
      title: 'Search Music',
      description: 'Find new albums to add',
      icon: <Search className="w-6 h-6 text-blue-500" />,
      href: '/search',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50'
    },
    {
      title: 'My Library',
      description: 'Manage your collection',
      icon: <Library className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
      href: '/library',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      title: 'Analytics',
      description: 'View collection stats',
      icon: <BarChart3 className="w-6 h-6 text-teal-500 dark:text-teal-400" />,
      href: '/analytics',
      bgColor: 'bg-teal-50 dark:bg-teal-950/50'
    },
    {
      title: 'AI Insights',
      description: 'Discover your listening habits',
      icon: <Sparkles className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      href: '/ai-insights',
      bgColor: 'bg-purple-50 dark:bg-purple-950/50'
    }
  ];

  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="pb-3 border-b border-gray-50 dark:border-gray-800">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href} className="group block">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 h-full">
              <div className={`p-2.5 rounded-lg ${action.bgColor} shrink-0 transition-transform group-hover:scale-105`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

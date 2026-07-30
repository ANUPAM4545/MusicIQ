import { ActivityLog } from "@/types/profile";
import { formatDistanceToNow } from "date-fns";
import { Circle, User, Disc, Star, Edit3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface ActivityTimelineProps {
  activities: ActivityLog[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getIcon = (actionType: string) => {
    switch (actionType) {
      case "Album Added": return <Disc className="h-4 w-4 text-blue-500" />;
      case "Rating Updated": return <Star className="h-4 w-4 text-yellow-500" />;
      case "Profile Updated": return <User className="h-4 w-4 text-green-500" />;
      case "Notes Updated": return <Edit3 className="h-4 w-4 text-purple-500" />;
      default: return <Circle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent activity to show.
          </div>
        ) : (
          <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-6">
                <span className="absolute -left-[9px] top-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1 shadow-sm">
                  {getIcon(activity.actionType)}
                </span>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activity.actionType}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{activity.description}</p>
                  </div>
                  <time className="text-xs text-gray-400 shrink-0 mt-0.5">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

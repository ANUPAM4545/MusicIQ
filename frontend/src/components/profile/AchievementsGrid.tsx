import { Achievement } from "@/types/profile";
import { Star, Disc, Globe, Trophy, CheckCircle2, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface AchievementsGridProps {
  achievements: Achievement[];
}

export function AchievementsGrid({ achievements }: AchievementsGridProps) {
  const getIcon = (iconName: string, earned: boolean) => {
    const className = `h-8 w-8 ${earned ? 'text-yellow-500' : 'text-gray-400'}`;
    switch (iconName) {
      case "Star": return <Star className={className} />;
      case "Disc": return <Disc className={className} />;
      case "Globe": return <Globe className={className} />;
      default: return <Trophy className={className} />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border flex items-start space-x-4 transition-all duration-200 ${
                achievement.earned 
                  ? 'bg-yellow-50/50 border-yellow-200 shadow-sm' 
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="shrink-0 mt-1">
                {getIcon(achievement.icon, achievement.earned)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`font-semibold truncate ${achievement.earned ? 'text-gray-900' : 'text-gray-600'}`}>
                    {achievement.title}
                  </h4>
                  {achievement.earned ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400 shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${achievement.earned ? 'bg-yellow-400' : 'bg-gray-400'}`}
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 w-8 text-right">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

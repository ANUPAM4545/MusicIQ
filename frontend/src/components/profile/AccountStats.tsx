import { ProfileStats } from "@/types/profile";
import { Disc, Mic2, Music, Star, Activity, BarChart2, BrainCircuit, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface AccountStatsProps {
  stats: ProfileStats;
}

export function AccountStats({ stats }: AccountStatsProps) {
  const statCards = [
    {
      title: "Albums Saved",
      value: stats.albumsSaved,
      icon: Disc,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Artists",
      value: stats.artistsCount,
      icon: Mic2,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
    {
      title: "Genres",
      value: stats.genresCount,
      icon: Music,
      color: "text-pink-500",
      bg: "bg-pink-100",
    },
    {
      title: "Avg Rating",
      value: stats.averageRating ? stats.averageRating.toFixed(1) : "-",
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      title: "Collection Health",
      value: `${stats.collectionHealth}%`,
      icon: Activity,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Diversity Score",
      value: `${stats.diversityScore}%`,
      icon: BarChart2,
      color: "text-indigo-500",
      bg: "bg-indigo-100",
    },
    {
      title: "AI Insights",
      value: stats.aiInsightCount,
      icon: BrainCircuit,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-sm ring-1 ring-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Personality } from "@/types/profile";
import { Compass, Library, Music } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface ListeningPersonalityProps {
  personality: Personality;
}

export function ListeningPersonality({ personality }: ListeningPersonalityProps) {
  const getIcon = () => {
    switch (personality.icon) {
      case "Compass":
        return <Compass className="h-12 w-12 text-indigo-500" />;
      case "Library":
        return <Library className="h-12 w-12 text-purple-500" />;
      case "Music":
      default:
        return <Music className="h-12 w-12 text-blue-500" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-700 dark:text-gray-300">Listening Personality</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
        <div className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-sm">
          {getIcon()}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{personality.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">{personality.description}</p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
          {personality.confidence}% Match
        </div>
      </CardContent>
    </Card>
  );
}

import { format } from 'date-fns';

interface WelcomeBannerProps {
  firstName?: string;
}

export function WelcomeBanner({ firstName }: WelcomeBannerProps) {
  const hour = new Date().getHours();
  let greeting = 'Good Evening';
  if (hour < 12) greeting = 'Good Morning';
  else if (hour < 18) greeting = 'Good Afternoon';

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-md">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold mb-2">
          {greeting}{firstName ? `, ${firstName}` : ''}!
        </h2>
        <p className="text-blue-100 mb-6 text-lg">
          Welcome to your personal MusicIQ dashboard. Here&apos;s a quick overview of your music collection and latest AI insights.
        </p>
        <div className="text-sm font-medium bg-white/20 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm">
          {format(new Date(), 'EEEE, MMMM do, yyyy')}
        </div>
      </div>
    </div>
  );
}

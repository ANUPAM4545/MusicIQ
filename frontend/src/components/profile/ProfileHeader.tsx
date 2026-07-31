import { UserProfile } from "@/types/profile";
import { Calendar, MapPin, Globe } from "lucide-react";
import { formatDateSafe } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 w-full"></div>
      
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Avatar pulled up into banner */}
          <div className="-mt-12 p-1 bg-white dark:bg-gray-900 rounded-full">
            <UserAvatar 
              firstName={profile.firstName} 
              lastName={profile.lastName} 
              avatarUrl={profile.avatarUrl} 
              className="w-24 h-24 text-2xl border-2 border-white dark:border-gray-900"
            />
          </div>
          
          <div className="flex flex-col items-center md:items-start flex-1 mt-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
              {profile.username ? `@${profile.username}` : profile.email}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {profile.country && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.country}</span>
                </div>
              )}
              {profile.language && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>{profile.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Member since {formatDateSafe(profile.createdAt, "MMMM yyyy")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

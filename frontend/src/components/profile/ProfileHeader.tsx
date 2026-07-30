import { UserProfile } from "@/types/profile";
import { User, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-lg border shadow-sm">
      <div className="h-24 w-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shrink-0">
        {profile.avatarUrl ? (
          <img src={profile.avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
        ) : (
          initials || <User size={40} />
        )}
      </div>
      <div className="flex flex-col items-center md:items-start flex-1">
        <h1 className="text-2xl font-bold text-gray-900">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-gray-500 mb-4">{profile.username ? `@${profile.username}` : profile.email}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Member since {format(new Date(profile.createdAt), "MMMM yyyy")}</span>
          </div>
          {profile.lastLogin && (
            <div className="flex items-center gap-1">
              <span>Last login: {format(new Date(profile.lastLogin), "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { 
  useProfile, 
  useProfileStats, 
  useListeningPersonality, 
  useProfileAchievements, 
  useActivityTimeline 
} from "@/hooks/useProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { AccountStats } from "@/components/profile/AccountStats";
import { ListeningPersonality } from "@/components/profile/ListeningPersonality";
import { AchievementsGrid } from "@/components/profile/AchievementsGrid";
import { ActivityTimeline } from "@/components/profile/ActivityTimeline";
import { SecuritySection } from "@/components/profile/SecuritySection";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useProfile();
  const { data: stats, isLoading: isStatsLoading } = useProfileStats();
  const { data: personality, isLoading: isPersonalityLoading } = useListeningPersonality();
  const { data: achievements, isLoading: isAchievementsLoading } = useProfileAchievements();
  const { data: activities, isLoading: isActivitiesLoading } = useActivityTimeline();

  const isLoading = isProfileLoading || isStatsLoading || isPersonalityLoading || isAchievementsLoading || isActivitiesLoading;

  if (isLoading) {
    return (
      <div className="p-6">
        <ProfileSkeleton />
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <ErrorState 
          title="Failed to load profile" 
          message="There was an error loading your profile information. Please try again." 
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <ProfileHeader profile={profile} />
      
      {stats && <AccountStats stats={stats} />}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {achievements && <AchievementsGrid achievements={achievements} />}
            </div>
            <div className="space-y-6">
              {personality && <ListeningPersonality personality={personality} />}
              {activities && <ActivityTimeline activities={activities} />}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="edit" className="outline-none">
          <div className="max-w-3xl">
            <ProfileForm profile={profile} />
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="outline-none">
          <div className="max-w-3xl">
            <SecuritySection profile={profile} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

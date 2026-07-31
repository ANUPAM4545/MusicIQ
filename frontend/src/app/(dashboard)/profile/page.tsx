"use client";

import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("overview");

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 outline-none mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {personality && <ListeningPersonality personality={personality} />}
            </div>
            <div className="space-y-6">
              {achievements && <AchievementsGrid achievements={achievements} />}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="outline-none mt-6">
          <div className="max-w-4xl">
            {activities && <ActivityTimeline activities={activities} />}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="outline-none mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Details</h3>
              <ProfileForm profile={profile} />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Security & Appearance</h3>
              <SecuritySection profile={profile} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

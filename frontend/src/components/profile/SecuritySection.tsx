"use client";

import { UserProfile } from "@/types/profile";
import { format } from "date-fns";
import { Shield, Key, Mail, Clock, LogOut, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/authService";

interface SecuritySectionProps {
  profile: UserProfile;
}

export function SecuritySection({ profile }: SecuritySectionProps) {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-gray-700" />
          Security & Account
        </CardTitle>
        <CardDescription>Manage your account security settings and session</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border">
            <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email Address</p>
              <p className="text-sm text-gray-500 truncate">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Account Created</p>
              <p className="text-sm text-gray-500">
                {format(new Date(profile.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Password</h4>
              <p className="text-sm text-gray-500">Last changed: Never</p>
            </div>
            <Button variant="outline" size="sm" disabled>
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Current Session</h4>
              <p className="text-sm text-gray-500">
                Active since {profile.lastLogin ? format(new Date(profile.lastLogin), "MMM d, yyyy h:mm a") : 'Login'}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-gray-700">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100">
            <div>
              <h4 className="text-sm font-medium text-red-900">Danger Zone</h4>
              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700" disabled>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

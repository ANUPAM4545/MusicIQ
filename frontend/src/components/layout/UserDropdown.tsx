"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  LogOut, User, LayoutDashboard, Settings, 
  Moon, Sun, Laptop, Bell, Shield, Paintbrush
} from "lucide-react";

import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { authService } from "@/services/authService";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserDropdown() {
  const { data: profile, isLoading } = useProfile();
  const { theme, setTheme } = useTheme();
  const updateProfileMutation = useUpdateProfile();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear local session
    authService.logout();
    
    // 2. Clear React Query cache completely
    queryClient.clear();
    
    // 3. Force redirect and show toast
    router.push("/login");
    toast.success("Successfully logged out");
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (profile) {
      updateProfileMutation.mutate({ theme: newTheme });
    }
  };

  if (isLoading) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full overflow-hidden">
        <UserAvatar 
          firstName={profile?.firstName} 
          lastName={profile?.lastName} 
          avatarUrl={profile?.avatarUrl} 
          className="transition-transform hover:scale-105 active:scale-95"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground text-gray-500 dark:text-gray-400">
              {profile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <Paintbrush className="mr-2 h-4 w-4" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleThemeChange("light")} className="cursor-pointer">
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                  {theme === "light" && <span className="ml-auto flex h-2 w-2 rounded-full bg-blue-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                  {theme === "dark" && <span className="ml-auto flex h-2 w-2 rounded-full bg-blue-500" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")} className="cursor-pointer">
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                  {theme === "system" && <span className="ml-auto flex h-2 w-2 rounded-full bg-blue-500" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem disabled className="opacity-50">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications (Future Ready)</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="opacity-50">
            <Shield className="mr-2 h-4 w-4" />
            <span>Privacy (Future Ready)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 focus:text-red-600 dark:focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

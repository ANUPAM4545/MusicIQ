"use client";

import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/authService";

export function TopNav() {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex flex-1">
        {/* Can put a breadcrumb or page title here dynamically later */}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-gray-900">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

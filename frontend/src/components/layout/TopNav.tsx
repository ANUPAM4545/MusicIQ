"use client";

import { UserDropdown } from "./UserDropdown";

export function TopNav() {
  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b bg-white dark:bg-gray-900 dark:border-gray-800 px-6 transition-colors duration-300">
      <div className="flex flex-1">
        {/* Can put a breadcrumb or page title here dynamically later */}
      </div>
      <UserDropdown />
    </div>
  );
}

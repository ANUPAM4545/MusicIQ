"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Search, Library, BarChart2, BrainCircuit } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Search", href: "/search", icon: Search },
  { name: "Library", href: "/library", icon: Library },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "AI Insights", href: "/ai-insights", icon: BrainCircuit },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 shrink-0 items-center px-6 border-b">
        <h1 className="text-xl font-bold tracking-tight text-primary">MusicIQ</h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-5 w-5 shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

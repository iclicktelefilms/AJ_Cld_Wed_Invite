"use client";

import { Bell, Plus, Search } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function DashboardHeader() {
  return (
    <header className="h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search invitations..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-neutral-50 transition-colors">
          <Bell className="h-5 w-5 text-neutral-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <Link href="/builder/new">
          <Button variant="primary" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Invitation
          </Button>
        </Link>

        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-600">
          AJ
        </div>
      </div>
    </header>
  );
}

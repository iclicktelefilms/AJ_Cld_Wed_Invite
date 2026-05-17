"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Image } from "lucide-react";
import InvitationCard from "@/components/dashboard/InvitationCard";
import { Invitation } from "@/types";

const mockInvitations: Invitation[] = [
  {
    id: "inv-1",
    studio_id: "studio-1",
    user_id: "user-1",
    slug: "priya-weds-arjun-demo",
    title: "Priya & Arjun Wedding",
    status: "published",
    theme_id: "royal-rajasthani",
    couple: { bride_name: "Priya", groom_name: "Arjun" },
    events: [{ id: "e1", name: "Wedding", category: "wedding", date: "2025-02-14", time: "10:00", venue_name: "Grand Palace", venue_address: "MG Road", venue_city: "Jaipur" }],
    family_members: [],
    gallery: [],
    sections: [],
    views: 1247,
    rsvp_count: 89,
    whatsapp_shares: 234,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "inv-2",
    studio_id: "studio-1",
    user_id: "user-1",
    slug: "ananya-weds-rohit-demo",
    title: "Ananya & Rohit Wedding",
    status: "draft",
    theme_id: "ivory-floral",
    couple: { bride_name: "Ananya", groom_name: "Rohit" },
    events: [{ id: "e2", name: "Wedding", category: "wedding", date: "2025-03-20", time: "11:00", venue_name: "Royal Orchid", venue_address: "Brigade Road", venue_city: "Bangalore" }],
    family_members: [],
    gallery: [],
    sections: [],
    views: 0,
    rsvp_count: 0,
    whatsapp_shares: 0,
    created_at: "2025-01-10T00:00:00Z",
    updated_at: "2025-01-10T00:00:00Z",
  },
];

const tabs = ["All", "Published", "Drafts", "Archived"];

export default function InvitationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockInvitations.filter((inv) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Published" && inv.status === "published") ||
      (activeTab === "Drafts" && inv.status === "draft") ||
      (activeTab === "Archived" && inv.status === "archived");
    const matchesSearch =
      search === "" ||
      `${inv.couple.bride_name} ${inv.couple.groom_name}`.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Invitations</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{mockInvitations.length} total invitations</p>
        </div>
        <Link
          href="/builder/new"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Invitation
        </Link>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center bg-neutral-100 rounded-xl p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 w-52"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
          <Image className="h-8 w-8 text-neutral-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-neutral-900 mb-1">No invitations found</p>
          <p className="text-sm text-neutral-500">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((inv) => (
            <InvitationCard key={inv.id} invitation={inv} />
          ))}
        </div>
      )}
    </div>
  );
}

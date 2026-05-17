import Link from "next/link";
import { Image, Eye, Users, TrendingUp, Plus, ArrowRight } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import InvitationCard from "@/components/dashboard/InvitationCard";
import { Invitation } from "@/types";

// Mock data — replace with Supabase fetch
const mockInvitations: Invitation[] = [
  {
    id: "inv-1",
    studio_id: "studio-1",
    user_id: "user-1",
    slug: "priya-weds-arjun-demo",
    title: "Priya & Arjun Wedding",
    status: "published",
    theme_id: "royal-rajasthani",
    couple: {
      bride_name: "Priya",
      groom_name: "Arjun",
      hashtag: "PriyaWeds Arjun",
    },
    events: [
      {
        id: "evt-1",
        name: "Wedding Ceremony",
        category: "wedding",
        date: "2025-02-14",
        time: "10:00",
        venue_name: "The Grand Palace",
        venue_address: "MG Road",
        venue_city: "Jaipur",
      },
    ],
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
    couple: {
      bride_name: "Ananya",
      groom_name: "Rohit",
    },
    events: [
      {
        id: "evt-2",
        name: "Wedding",
        category: "wedding",
        date: "2025-03-20",
        time: "11:00",
        venue_name: "Royal Orchid",
        venue_address: "Brigade Road",
        venue_city: "Bangalore",
      },
    ],
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

export default function DashboardPage() {
  const published = mockInvitations.filter((i) => i.status === "published").length;
  const drafts = mockInvitations.filter((i) => i.status === "draft").length;
  const totalViews = mockInvitations.reduce((sum, i) => sum + i.views, 0);
  const totalRSVP = mockInvitations.reduce((sum, i) => sum + i.rsvp_count, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Welcome back — here&apos;s what&apos;s happening</p>
        </div>
        <Link
          href="/builder/new"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Invitation
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Invitations"
          value={mockInvitations.length}
          icon={<Image className="h-5 w-5" />}
          delta="2 this month"
          deltaPositive
        />
        <StatsCard
          label="Published"
          value={published}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatsCard
          label="Total Views"
          value={totalViews.toLocaleString()}
          icon={<Eye className="h-5 w-5" />}
          delta="18% vs last month"
          deltaPositive
        />
        <StatsCard
          label="RSVPs Collected"
          value={totalRSVP}
          icon={<Users className="h-5 w-5" />}
          delta="12 this week"
          deltaPositive
        />
      </div>

      {/* Invitations */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-neutral-900">Recent Invitations</h2>
          <Link
            href="/dashboard/invitations"
            className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {mockInvitations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
              <Image className="h-6 w-6 text-neutral-400" />
            </div>
            <p className="text-sm font-medium text-neutral-900 mb-1">No invitations yet</p>
            <p className="text-sm text-neutral-500 mb-6">Create your first luxury wedding invitation</p>
            <Link
              href="/builder/new"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Create Invitation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockInvitations.map((inv) => (
              <InvitationCard key={inv.id} invitation={inv} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

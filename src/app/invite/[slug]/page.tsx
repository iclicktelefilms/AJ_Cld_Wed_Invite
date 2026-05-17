import { Metadata } from "next";
import { themes } from "@/data/themes";
import { defaultSectionOrder } from "@/data/defaultSections";
import InvitationPage from "@/components/invitation/InvitationPage";
import { Invitation } from "@/types";

// Demo invitation for preview
const demoInvitation: Invitation = {
  id: "demo",
  studio_id: "demo",
  user_id: "demo",
  slug: "demo",
  title: "Demo Wedding Invitation",
  status: "published",
  theme_id: "royal-rajasthani",
  couple: {
    bride_name: "Priya",
    groom_name: "Arjun",
    bride_parents: "Mr. & Mrs. Sharma",
    groom_parents: "Mr. & Mrs. Verma",
    love_story: "Two souls who met by chance, stayed by choice, and will remain by love forever.",
    hashtag: "PriyaArjun2025",
  },
  events: [
    {
      id: "evt-1",
      name: "Wedding Ceremony",
      category: "wedding",
      date: "2025-02-14",
      time: "10:00",
      venue_name: "The Grand Palace",
      venue_address: "MG Road, Civil Lines",
      venue_city: "Jaipur",
      venue_maps_url: "https://maps.google.com",
      dress_code: "Indian Formal",
    },
    {
      id: "evt-2",
      name: "Reception",
      category: "reception",
      date: "2025-02-15",
      time: "19:00",
      venue_name: "The Grand Palace",
      venue_address: "MG Road, Civil Lines",
      venue_city: "Jaipur",
      venue_maps_url: "https://maps.google.com",
    },
  ],
  family_members: [
    { id: "f1", name: "Rahul Sharma", relation: "Father of Bride", side: "bride" },
    { id: "f2", name: "Meera Sharma", relation: "Mother of Bride", side: "bride" },
    { id: "f3", name: "Suresh Verma", relation: "Father of Groom", side: "groom" },
    { id: "f4", name: "Sunita Verma", relation: "Mother of Groom", side: "groom" },
  ],
  gallery: [],
  sections: [
    ...defaultSectionOrder.map((s) => ({
      ...s,
      enabled: ["hero", "couple_intro", "countdown", "events", "family", "venue", "rsvp", "footer"].includes(s.type),
    })),
  ],
  views: 0,
  rsvp_count: 0,
  whatsapp_shares: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const isDemo = params.slug === "demo";
  const invitation = isDemo ? demoInvitation : null;

  if (!invitation) return { title: "Invitation Not Found" };

  const { bride_name, groom_name } = invitation.couple;
  const title = `${bride_name} & ${groom_name} — Wedding Invitation`;

  return {
    title,
    description: `You're invited to the wedding of ${bride_name} & ${groom_name}. View their beautiful digital invitation.`,
    openGraph: {
      title,
      type: "website",
    },
  };
}

export default async function InvitePage({ params }: { params: { slug: string } }) {
  const isDemo = params.slug === "demo";
  const invitation = isDemo ? demoInvitation : null;

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 text-sm">Invitation not found</p>
        </div>
      </div>
    );
  }

  const theme = themes.find((t) => t.id === invitation.theme_id) ?? themes[0];

  return <InvitationPage invitation={invitation} theme={theme} />;
}

"use client";

import { useBuilderStore } from "@/store/builderStore";
import { getThemeById } from "@/data/themes";
import { themes } from "@/data/themes";
import InvitationPage from "@/components/invitation/InvitationPage";
import { Invitation } from "@/types";
import { defaultSectionOrder } from "@/data/defaultSections";

export default function LivePreview() {
  const { invitation } = useBuilderStore();
  const theme = getThemeById(invitation.theme_id ?? "royal-rajasthani") ?? themes[0];

  const previewInvitation: Invitation = {
    id: invitation.id ?? "preview",
    studio_id: "",
    user_id: "",
    slug: "preview",
    title: "Preview",
    status: "draft",
    theme_id: theme.id,
    couple: invitation.couple ?? { bride_name: "Priya", groom_name: "Arjun" },
    events: invitation.events ?? [
      {
        id: "evt-1",
        name: "Wedding Ceremony",
        category: "wedding",
        date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "10:00",
        venue_name: "The Grand Palace",
        venue_address: "MG Road",
        venue_city: "Jaipur",
      },
    ],
    family_members: invitation.family_members ?? [],
    gallery: invitation.gallery ?? [],
    sections: invitation.sections ?? defaultSectionOrder,
    views: 0,
    rsvp_count: 0,
    whatsapp_shares: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Live Preview</p>

      {/* Phone frame */}
      <div className="relative">
        <div
          className="w-64 h-[520px] rounded-[2.5rem] border-[6px] border-neutral-800 shadow-2xl overflow-hidden bg-white"
          style={{ boxShadow: "0 0 0 1px #333, 0 30px 60px rgba(0,0,0,0.5)" }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-neutral-800 rounded-b-2xl z-10" />

          <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
            <div style={{ zoom: 0.42 }}>
              <InvitationPage
                invitation={previewInvitation}
                theme={theme}
                isPreview
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { Invitation, Theme } from "@/types";
import { useThemeStyles } from "@/hooks/useTheme";
import SectionRenderer from "@/components/sections/SectionRenderer";
import FloatingActions from "./FloatingActions";

interface InvitationPageProps {
  invitation: Invitation;
  theme: Theme;
  isPreview?: boolean;
}

export default function InvitationPage({ invitation, theme, isPreview = false }: InvitationPageProps) {
  const themeStyles = useThemeStyles(theme);

  const sortedSections = [...(invitation.sections ?? [])].sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!isPreview) {
      fetch("/api/analytics/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitation_id: invitation.id }),
      }).catch(() => {});
    }
  }, [invitation.id, isPreview]);

  return (
    <div style={themeStyles}>
      <main
        className="min-h-screen"
        style={{ backgroundColor: theme.colors.background }}
      >
        {sortedSections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            invitation={invitation}
            theme={theme}
            isPreview={isPreview}
          />
        ))}
      </main>

      {!isPreview && (
        <FloatingActions invitation={invitation} theme={theme} />
      )}
    </div>
  );
}

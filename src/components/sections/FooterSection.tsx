"use client";

import { Invitation, Theme } from "@/types";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function FooterSection({ invitation, theme }: Props) {
  const { couple } = invitation;

  return (
    <footer className="py-16 px-6 text-center" style={{ backgroundColor: theme.colors.background }}>
      <div
        className="w-16 h-px mx-auto mb-8"
        style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
      />
      <p
        className="text-lg font-semibold mb-1"
        style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
      >
        {couple?.bride_name && couple?.groom_name
          ? `${couple.bride_name} & ${couple.groom_name}`
          : "With Love"}
      </p>
      <p
        className="text-xs opacity-40 mb-8 tracking-widest uppercase"
        style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
      >
        {couple?.hashtag ? `#${couple.hashtag}` : "Forever & Always"}
      </p>

      <p
        className="text-xs opacity-30"
        style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
      >
        Created with LoveStory
      </p>
    </footer>
  );
}

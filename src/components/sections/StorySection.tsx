"use client";

import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function StorySection({ invitation, theme }: Props) {
  const story = invitation.couple?.love_story;
  if (!story) return null;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.colors.surface ?? theme.colors.background }}>
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          Our Story
        </motion.p>

        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-base leading-relaxed italic"
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.body,
            opacity: 0.85,
          }}
        >
          &quot;{story}&quot;
        </motion.p>
      </div>
    </section>
  );
}

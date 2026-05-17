"use client";

import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function HashtagSection({ invitation, theme }: Props) {
  const hashtag = invitation.couple?.hashtag;
  if (!hashtag) return null;

  return (
    <section className="py-16 px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          Share Your Moments
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
        >
          #{hashtag}
        </motion.p>
      </div>
    </section>
  );
}

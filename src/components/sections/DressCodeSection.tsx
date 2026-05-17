"use client";

import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function DressCodeSection({ invitation, theme }: Props) {
  const dressCode = invitation.events?.[0]?.dress_code;
  if (!dressCode) return null;

  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: theme.colors.surface ?? theme.colors.background }}
    >
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          Dress Code
        </motion.p>
        <div
          className="w-16 h-px mx-auto mb-6"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
        />
        <p className="text-base" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
          {dressCode}
        </p>
      </div>
    </section>
  );
}

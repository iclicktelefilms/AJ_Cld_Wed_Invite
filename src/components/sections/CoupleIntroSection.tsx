"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Invitation, Theme } from "@/types";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function CoupleIntroSection({ invitation, theme }: Props) {
  const { couple } = invitation;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: theme.colors.surface ?? theme.colors.background }}
    >
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          The Couple
        </motion.p>

        {/* Couple photos */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className="w-28 h-28 rounded-full mx-auto mb-3 overflow-hidden"
              style={{ border: `2px solid ${theme.colors.primary}40` }}
            >
              {couple?.bride_photo ? (
                <Image src={couple.bride_photo} alt={couple.bride_name} width={112} height={112} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl" style={{ backgroundColor: `${theme.colors.primary}15` }}>
                  <span style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}>
                    {couple?.bride_name?.[0] || "B"}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm font-semibold" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
              {couple?.bride_name || "Bride"}
            </p>
            {couple?.bride_parents && (
              <p className="text-xs mt-0.5 opacity-60" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
                {couple.bride_parents}
              </p>
            )}
          </motion.div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8" style={{ background: `${theme.colors.primary}30` }} />
            <span className="text-xl" style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}>&</span>
            <div className="w-px h-8" style={{ background: `${theme.colors.primary}30` }} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className="w-28 h-28 rounded-full mx-auto mb-3 overflow-hidden"
              style={{ border: `2px solid ${theme.colors.primary}40` }}
            >
              {couple?.groom_photo ? (
                <Image src={couple.groom_photo} alt={couple.groom_name} width={112} height={112} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl" style={{ backgroundColor: `${theme.colors.primary}15` }}>
                  <span style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}>
                    {couple?.groom_name?.[0] || "G"}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm font-semibold" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
              {couple?.groom_name || "Groom"}
            </p>
            {couple?.groom_parents && (
              <p className="text-xs mt-0.5 opacity-60" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
                {couple.groom_parents}
              </p>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-20 h-px mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }} />

        {couple?.love_story && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm leading-relaxed italic opacity-75"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
          >
            &quot;{couple.love_story}&quot;
          </motion.p>
        )}
      </div>
    </section>
  );
}

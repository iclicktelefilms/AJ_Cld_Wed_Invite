"use client";

import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";
import { formatWeddingDate } from "@/utils/formatDate";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function HeroSection({ invitation, theme, isPreview }: Props) {
  const { couple, events } = invitation;
  const mainEvent = events?.[0];
  const weddingDate = mainEvent?.date ? formatWeddingDate(mainEvent.date) : "Coming Soon";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${theme.colors.primary}20 0%, transparent 65%),
                       radial-gradient(ellipse at 50% 100%, ${theme.colors.secondary}15 0%, transparent 65%)`,
        }}
      />

      {/* Top ornament */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 left-1/2 -translate-x-1/2"
      >
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
          <path d="M60 2 L115 38 L5 38 Z" stroke={theme.colors.primary} strokeWidth="0.5" fill="none" opacity="0.4" />
          <circle cx="60" cy="2" r="2" fill={theme.colors.primary} opacity="0.6" />
          <circle cx="5" cy="38" r="1.5" fill={theme.colors.primary} opacity="0.4" />
          <circle cx="115" cy="38" r="1.5" fill={theme.colors.primary} opacity="0.4" />
          <path d="M25 38 Q60 20 95 38" stroke={theme.colors.primary} strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-xs tracking-[0.4em] mb-8 uppercase"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
          style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
        >
          {couple?.bride_name || "Priya"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-4 justify-center my-5"
        >
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}60)` }} />
          <span className="text-2xl" style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}>
            &
          </span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${theme.colors.primary}60)` }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl sm:text-5xl font-bold leading-tight mb-8"
          style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
        >
          {couple?.groom_name || "Arjun"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="space-y-2"
        >
          <p
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
          >
            {weddingDate}
          </p>
          {mainEvent?.venue_city && (
            <p
              className="text-sm opacity-60"
              style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
            >
              {mainEvent.venue_city}
            </p>
          )}
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: theme.colors.primary, opacity: 0.5, fontFamily: theme.fonts.body }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, ${theme.colors.primary}80, transparent)` }}
        />
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";
import { MapPin, ExternalLink } from "lucide-react";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function VenueSection({ invitation, theme }: Props) {
  const mainEvent = invitation.events?.[0];
  if (!mainEvent) return null;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          Venue
        </motion.p>

        <div
          className="w-16 h-px mx-auto mb-10"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6"
            style={{ backgroundColor: `${theme.colors.primary}15` }}
          >
            <MapPin className="h-5 w-5" style={{ color: theme.colors.primary }} />
          </div>

          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
          >
            {mainEvent.venue_name}
          </h3>

          <p
            className="text-sm opacity-70 mb-1"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
          >
            {mainEvent.venue_address}
          </p>
          <p
            className="text-sm opacity-70 mb-8"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
          >
            {mainEvent.venue_city}
          </p>

          {mainEvent.venue_maps_url && (
            <a
              href={mainEvent.venue_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                fontFamily: theme.fonts.body,
              }}
            >
              <MapPin className="h-4 w-4" />
              Get Directions
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

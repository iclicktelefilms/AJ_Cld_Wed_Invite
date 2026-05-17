"use client";

import { motion } from "framer-motion";
import { Invitation, Theme, WeddingEvent } from "@/types";
import { formatEventDate, formatEventTime } from "@/utils/formatDate";
import { MapPin, Clock, Calendar } from "lucide-react";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

function EventCard({ event, theme, index }: { event: WeddingEvent; theme: Theme; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div
        className="absolute left-3 top-3 bottom-0 w-px last:hidden"
        style={{ background: `${theme.colors.primary}20` }}
      />

      {/* Timeline dot */}
      <div
        className="absolute left-1.5 top-2.5 w-3 h-3 rounded-full border-2"
        style={{ borderColor: theme.colors.primary, backgroundColor: theme.colors.background }}
      />

      {/* Event name */}
      <p
        className="text-xs tracking-[0.3em] uppercase mb-2"
        style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
      >
        {event.name}
      </p>

      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <Calendar className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: theme.colors.textMuted ?? theme.colors.text, opacity: 0.6 }} />
          <p className="text-sm" style={{ color: theme.colors.text, fontFamily: theme.fonts.body, opacity: 0.85 }}>
            {formatEventDate(event.date)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" style={{ color: theme.colors.textMuted ?? theme.colors.text, opacity: 0.6 }} />
          <p className="text-sm" style={{ color: theme.colors.text, fontFamily: theme.fonts.body, opacity: 0.85 }}>
            {formatEventTime(event.time)}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: theme.colors.textMuted ?? theme.colors.text, opacity: 0.6 }} />
          <div>
            <p className="text-sm font-medium" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
              {event.venue_name}
            </p>
            <p className="text-xs opacity-60" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
              {event.venue_address}, {event.venue_city}
            </p>
          </div>
        </div>
      </div>

      {event.venue_maps_url && (
        <a
          href={event.venue_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-full"
          style={{
            color: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}40`,
            fontFamily: theme.fonts.body,
          }}
        >
          <MapPin className="h-3 w-3" />
          Get Directions
        </a>
      )}
    </motion.div>
  );
}

export default function EventsSection({ invitation, theme }: Props) {
  const events = invitation.events ?? [];

  if (events.length === 0) return null;

  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
          >
            Wedding Events
          </motion.p>
          <div
            className="w-16 h-px mx-auto"
            style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
          />
        </div>

        <div>
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} theme={theme} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

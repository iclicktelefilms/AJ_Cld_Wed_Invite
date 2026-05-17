"use client";

import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

function CountdownUnit({ value, label, theme }: { value: number; label: string; theme: Theme }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ opacity: 0.5, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-1"
        style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <p
        className="text-xs tracking-[0.2em] uppercase opacity-60"
        style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
      >
        {label}
      </p>
    </div>
  );
}

export default function CountdownSection({ invitation, theme }: Props) {
  const mainEvent = invitation.events?.[0];
  const weddingDate = mainEvent?.date ?? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  const { days, hours, minutes, seconds } = useCountdown(weddingDate);

  return (
    <section className="py-16 px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] uppercase mb-10"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
        >
          Counting Down
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4"
        >
          <CountdownUnit value={days} label="Days" theme={theme} />
          <CountdownUnit value={hours} label="Hours" theme={theme} />
          <CountdownUnit value={minutes} label="Mins" theme={theme} />
          <CountdownUnit value={seconds} label="Secs" theme={theme} />
        </motion.div>

        <div
          className="mt-10 w-16 h-px mx-auto"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
        />
      </div>
    </section>
  );
}

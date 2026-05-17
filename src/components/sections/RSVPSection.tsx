"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Invitation, Theme } from "@/types";
import { Check } from "lucide-react";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

export default function RSVPSection({ invitation, theme, isPreview }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreview) { setSubmitted(true); return; }
    setLoading(true);
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitation_id: invitation.id, name, phone, attending }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: `${theme.colors.primary}08`,
    borderColor: `${theme.colors.primary}30`,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
          >
            RSVP
          </motion.p>
          <div
            className="w-16 h-px mx-auto mb-4"
            style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
          />
          <p
            className="text-xs opacity-60"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
          >
            Kindly respond by {invitation.events?.[0]?.date ? new Date(invitation.events[0].date).toLocaleDateString("en-IN", { day: "numeric", month: "long" }) : "the wedding date"}
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div
              className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${theme.colors.primary}20` }}
            >
              <Check className="h-6 w-6" style={{ color: theme.colors.primary }} />
            </div>
            <p className="text-base font-medium mb-1" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
              Thank you, {name || "Dear Guest"}!
            </p>
            <p className="text-sm opacity-60" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
              Your response has been recorded.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
              style={inputStyle}
            />

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: true, label: "Joyfully Accept" },
                { value: false, label: "Regretfully Decline" },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => setAttending(opt.value)}
                  className="py-3 px-4 rounded-xl text-xs font-medium border transition-all"
                  style={{
                    borderColor: attending === opt.value ? theme.colors.primary : `${theme.colors.primary}30`,
                    backgroundColor: attending === opt.value ? `${theme.colors.primary}15` : "transparent",
                    color: attending === opt.value ? theme.colors.primary : theme.colors.text,
                    fontFamily: theme.fonts.body,
                    opacity: attending === opt.value ? 1 : 0.7,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!name || attending === null || loading}
              className="w-full py-3.5 rounded-xl text-sm font-medium transition-opacity disabled:opacity-50"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                fontFamily: theme.fonts.body,
              }}
            >
              {loading ? "Sending..." : "Send RSVP"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, MessageCircle, Calendar, QrCode, X } from "lucide-react";
import { Invitation, Theme } from "@/types";

interface FloatingActionsProps {
  invitation: Invitation;
  theme: Theme;
}

export default function FloatingActions({ invitation, theme }: FloatingActionsProps) {
  const [open, setOpen] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const inviteUrl = `${appUrl}/invite/${invitation.slug}`;
  const coupleNames = `${invitation.couple.bride_name} & ${invitation.couple.groom_name}`;
  const mainEvent = invitation.events?.[0];

  const whatsappText = `You're invited to the wedding of ${coupleNames}! View the invitation: ${inviteUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  const calendarDate = mainEvent?.date
    ? new Date(mainEvent.date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    : "";
  const calendarUrl = mainEvent
    ? `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Wedding of ${coupleNames}`)}&dates=${calendarDate}/${calendarDate}&details=${encodeURIComponent(inviteUrl)}&location=${encodeURIComponent(mainEvent.venue_name)}`
    : "";

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: whatsappUrl,
      color: "#25D366",
    },
    {
      icon: Share2,
      label: "Share",
      action: () => {
        if (navigator.share) {
          navigator.share({ title: `Wedding of ${coupleNames}`, url: inviteUrl });
        } else {
          navigator.clipboard.writeText(inviteUrl);
        }
      },
    },
    ...(calendarUrl ? [{
      icon: Calendar,
      label: "Add to Calendar",
      href: calendarUrl,
    }] : []),
  ];

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-lg backdrop-blur-sm">
              {action.label}
            </span>
            {action.href ? (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: action.color ?? theme.colors.primary }}
              >
                <action.icon className="h-4 w-4 text-white" />
              </a>
            ) : (
              <button
                onClick={action.action}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <action.icon className="h-4 w-4" style={{ color: theme.colors.background }} />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform active:scale-95"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {open ? (
            <X className="h-5 w-5" style={{ color: theme.colors.background }} />
          ) : (
            <Share2 className="h-5 w-5" style={{ color: theme.colors.background }} />
          )}
        </motion.div>
      </button>
    </div>
  );
}

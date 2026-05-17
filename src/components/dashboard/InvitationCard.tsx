"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoreHorizontal, Eye, Edit2, Copy, Trash2, Share2, QrCode } from "lucide-react";
import { useState } from "react";
import { Invitation } from "@/types";
import Badge from "@/components/ui/Badge";
import { formatWeddingDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";

interface InvitationCardProps {
  invitation: Invitation;
}

export default function InvitationCard({ invitation }: InvitationCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusVariant = {
    draft: "warning",
    published: "success",
    archived: "default",
  } as const;

  const mainEvent = invitation.events?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-xs text-neutral-400 mb-1 font-medium uppercase tracking-widest">
            {invitation.couple.bride_name && invitation.couple.groom_name ? "Wedding Invitation" : "Untitled"}
          </p>
          <p className="font-playfair text-lg font-semibold text-neutral-700">
            {invitation.couple.bride_name || "Bride"} & {invitation.couple.groom_name || "Groom"}
          </p>
          {mainEvent?.date && (
            <p className="text-xs text-neutral-500 mt-1">{formatWeddingDate(mainEvent.date)}</p>
          )}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Link
              href={`/builder/${invitation.id}`}
              className="p-2 bg-white rounded-lg shadow-sm hover:bg-neutral-50 transition-colors"
            >
              <Edit2 className="h-4 w-4 text-neutral-700" />
            </Link>
            <Link
              href={`/invite/${invitation.slug}`}
              target="_blank"
              className="p-2 bg-white rounded-lg shadow-sm hover:bg-neutral-50 transition-colors"
            >
              <Eye className="h-4 w-4 text-neutral-700" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-neutral-900 truncate">
              {invitation.couple.bride_name && invitation.couple.groom_name
                ? `${invitation.couple.bride_name} & ${invitation.couple.groom_name}`
                : "Untitled Invitation"}
            </h3>
            {mainEvent?.venue_city && (
              <p className="text-xs text-neutral-500 mt-0.5">{mainEvent.venue_city}</p>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <MoreHorizontal className="h-4 w-4 text-neutral-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-7 w-44 bg-white rounded-xl border border-neutral-100 shadow-lg z-10 py-1">
                {[
                  { icon: Edit2, label: "Edit", href: `/builder/${invitation.id}` },
                  { icon: Eye, label: "Preview", href: `/invite/${invitation.slug}` },
                  { icon: Copy, label: "Duplicate", action: () => {} },
                  { icon: Share2, label: "Share", action: () => {} },
                  { icon: QrCode, label: "QR Code", action: () => {} },
                  { icon: Trash2, label: "Delete", action: () => {}, danger: true },
                ].map((item) => (
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => { item.action?.(); setMenuOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-neutral-50",
                        item.danger ? "text-red-600" : "text-neutral-700"
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-50">
          <Badge variant={statusVariant[invitation.status]}>
            {invitation.status}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {invitation.views}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

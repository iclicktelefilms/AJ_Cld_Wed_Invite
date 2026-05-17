"use client";

import { motion } from "framer-motion";
import { Check, Lock, Star } from "lucide-react";
import { Theme } from "@/types";
import { cn } from "@/utils/cn";
import Badge from "@/components/ui/Badge";

interface ThemeCardProps {
  theme: Theme;
  selected?: boolean;
  onSelect: (theme: Theme) => void;
  isPremiumUser?: boolean;
}

export default function ThemeCard({ theme, selected, onSelect, isPremiumUser }: ThemeCardProps) {
  const isLocked = theme.premium && !isPremiumUser;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => !isLocked && onSelect(theme)}
      className={cn(
        "w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200",
        selected ? "border-neutral-900 shadow-lg" : "border-transparent hover:border-neutral-200",
        isLocked && "opacity-75 cursor-not-allowed"
      )}
    >
      {/* Color Preview */}
      <div
        className="h-28 relative flex flex-col items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Decorative elements */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${theme.colors.primary}, transparent 70%)`,
          }}
        />

        <p
          className="text-xs tracking-[0.3em] mb-1 opacity-60"
          style={{
            color: theme.colors.primary,
            fontFamily: theme.fonts.body,
          }}
        >
          WEDDING INVITATION
        </p>
        <p
          className="text-base font-semibold"
          style={{
            color: theme.colors.text,
            fontFamily: theme.fonts.heading,
          }}
        >
          Priya & Arjun
        </p>
        <p
          className="text-xs mt-1 opacity-50"
          style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
        >
          14 February 2025
        </p>

        {/* Selected check */}
        {selected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white" />
          </div>
        )}

        {/* Lock badge */}
        {isLocked && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
            <Lock className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-white p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-900">{theme.name}</p>
            <p className="text-xs text-neutral-500 capitalize">{theme.religion} · {theme.style}</p>
          </div>
          {theme.premium && (
            <Badge variant="gold" size="sm">
              <Star className="h-2.5 w-2.5" />
              Pro
            </Badge>
          )}
        </div>
      </div>
    </motion.button>
  );
}

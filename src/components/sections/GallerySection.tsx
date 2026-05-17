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

export default function GallerySection({ invitation, theme }: Props) {
  const gallery = invitation.gallery ?? [];

  if (gallery.length === 0) return null;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: theme.colors.surface ?? theme.colors.background }}
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
          >
            Gallery
          </motion.p>
          <div
            className="w-16 h-px mx-auto"
            style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {gallery.slice(0, 6).map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-lg ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}
            >
              <Image
                src={image.url}
                alt={image.caption ?? `Gallery ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Invitation, Theme, FamilyMember } from "@/types";

interface Props {
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
  layout?: string;
}

function FamilyMemberCard({ member, theme }: { member: FamilyMember; theme: Theme }) {
  return (
    <div className="text-center">
      <div
        className="w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden"
        style={{ border: `1.5px solid ${theme.colors.primary}30` }}
      >
        {member.photo ? (
          <Image src={member.photo} alt={member.name} width={64} height={64} className="object-cover w-full h-full" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-lg font-semibold"
            style={{ backgroundColor: `${theme.colors.primary}10`, color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            {member.name[0]}
          </div>
        )}
      </div>
      <p className="text-sm font-medium" style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}>
        {member.name}
      </p>
      <p className="text-xs opacity-60" style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}>
        {member.relation}
      </p>
    </div>
  );
}

export default function FamilySection({ invitation, theme }: Props) {
  const members = invitation.family_members ?? [];
  const brideFamily = members.filter((m) => m.side === "bride");
  const groomFamily = members.filter((m) => m.side === "groom");

  if (members.length === 0) return null;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: theme.colors.surface ?? theme.colors.background }}
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.body }}
          >
            Our Families
          </motion.p>
          <div
            className="w-16 h-px mx-auto"
            style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
          />
        </div>

        {brideFamily.length > 0 && (
          <div className="mb-10">
            <p
              className="text-xs text-center mb-6 tracking-[0.3em] uppercase opacity-60"
              style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
            >
              Bride&apos;s Family
            </p>
            <div className="grid grid-cols-3 gap-6">
              {brideFamily.map((member) => (
                <FamilyMemberCard key={member.id} member={member} theme={theme} />
              ))}
            </div>
          </div>
        )}

        {groomFamily.length > 0 && (
          <div>
            <p
              className="text-xs text-center mb-6 tracking-[0.3em] uppercase opacity-60"
              style={{ color: theme.colors.text, fontFamily: theme.fonts.body }}
            >
              Groom&apos;s Family
            </p>
            <div className="grid grid-cols-3 gap-6">
              {groomFamily.map((member) => (
                <FamilyMemberCard key={member.id} member={member} theme={theme} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

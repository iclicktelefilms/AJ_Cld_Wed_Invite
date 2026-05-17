"use client";

import { SectionConfig, Invitation, Theme } from "@/types";
import HeroSection from "./HeroSection";
import CoupleIntroSection from "./CoupleIntroSection";
import CountdownSection from "./CountdownSection";
import StorySection from "./StorySection";
import EventsSection from "./EventsSection";
import FamilySection from "./FamilySection";
import VenueSection from "./VenueSection";
import GallerySection from "./GallerySection";
import RSVPSection from "./RSVPSection";
import FooterSection from "./FooterSection";
import DressCodeSection from "./DressCodeSection";
import HashtagSection from "./HashtagSection";

interface SectionRendererProps {
  section: SectionConfig;
  invitation: Partial<Invitation>;
  theme: Theme;
  isPreview?: boolean;
}

export default function SectionRenderer({
  section,
  invitation,
  theme,
  isPreview = false,
}: SectionRendererProps) {
  if (!section.enabled) return null;

  const props = { invitation, theme, isPreview, layout: section.layout };

  switch (section.type) {
    case "hero":
      return <HeroSection {...props} />;
    case "couple_intro":
      return <CoupleIntroSection {...props} />;
    case "countdown":
      return <CountdownSection {...props} />;
    case "story":
      return <StorySection {...props} />;
    case "events":
      return <EventsSection {...props} />;
    case "family":
      return <FamilySection {...props} />;
    case "venue":
      return <VenueSection {...props} />;
    case "gallery":
      return <GallerySection {...props} />;
    case "rsvp":
      return <RSVPSection {...props} />;
    case "dress_code":
      return <DressCodeSection {...props} />;
    case "hashtag":
      return <HashtagSection {...props} />;
    case "footer":
      return <FooterSection {...props} />;
    default:
      return null;
  }
}

"use client";

import { useBuilderStore } from "@/store/builderStore";
import CoupleStep from "./steps/CoupleStep";
import EventsStep from "./steps/EventsStep";
import FamilyStep from "./steps/FamilyStep";
import GalleryStep from "./steps/GalleryStep";
import ThemeStep from "./steps/ThemeStep";
import PublishStep from "./steps/PublishStep";

export default function StepPanel() {
  const { currentStep } = useBuilderStore();

  switch (currentStep) {
    case "couple":
      return <CoupleStep />;
    case "events":
      return <EventsStep />;
    case "family":
      return <FamilyStep />;
    case "gallery":
      return <GalleryStep />;
    case "theme":
      return <ThemeStep />;
    case "publish":
      return <PublishStep />;
    default:
      return <CoupleStep />;
  }
}

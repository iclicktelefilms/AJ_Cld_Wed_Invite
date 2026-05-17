"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import StepNav from "./StepNav";
import LivePreview from "./LivePreview";
import StepPanel from "./StepPanel";
import { Save, Eye, Send, X } from "lucide-react";
import Link from "next/link";

const BUILDER_STEPS = [
  { id: "couple", label: "Couple" },
  { id: "events", label: "Events" },
  { id: "family", label: "Family" },
  { id: "gallery", label: "Gallery" },
  { id: "theme", label: "Theme" },
  { id: "publish", label: "Publish" },
] as const;

export default function BuilderLayout() {
  const { currentStep, setCurrentStep, isSaving, invitation } = useBuilderStore();
  const [previewOpen, setPreviewOpen] = useState(false);

  const currentIndex = BUILDER_STEPS.findIndex((s) => s.id === currentStep);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === BUILDER_STEPS.length - 1;

  const goNext = () => {
    if (!isLast) setCurrentStep(BUILDER_STEPS[currentIndex + 1].id);
  };

  const goPrev = () => {
    if (!isFirst) setCurrentStep(BUILDER_STEPS[currentIndex - 1].id);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-neutral-100 px-6 h-14 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
            <X className="h-4 w-4 text-neutral-500" />
          </Link>
          <div className="w-px h-5 bg-neutral-100" />
          <div>
            <p className="text-xs font-medium text-neutral-900">
              {invitation.couple?.bride_name && invitation.couple?.groom_name
                ? `${invitation.couple.bride_name} & ${invitation.couple.groom_name}`
                : "New Invitation"}
            </p>
            <p className="text-xs text-neutral-400 capitalize">{invitation.status ?? "Draft"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-xs text-neutral-400">Saving...</span>
          )}
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
          {isLast && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 text-neutral-900 text-xs font-medium hover:bg-gold-600 transition-colors">
              <Send className="h-3.5 w-3.5" />
              Publish
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Steps */}
        <aside className="w-64 bg-white border-r border-neutral-100 flex flex-col">
          <StepNav
            steps={BUILDER_STEPS}
            currentStep={currentStep}
            onSelect={(id) => setCurrentStep(id as typeof currentStep)}
          />

          {/* Navigation buttons */}
          <div className="p-4 border-t border-neutral-100 flex gap-2">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className="flex-1 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              onClick={goNext}
              disabled={isLast}
              className="flex-1 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </aside>

        {/* Center: Form */}
        <main className="flex-1 overflow-y-auto p-8">
          <StepPanel />
        </main>

        {/* Right: Preview */}
        <aside className="hidden xl:flex w-80 bg-neutral-100 border-l border-neutral-200 items-center justify-center p-6">
          <LivePreview />
        </aside>
      </div>

      {/* Mobile preview overlay */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <div className="relative">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1.5 text-sm"
            >
              <X className="h-4 w-4" /> Close Preview
            </button>
            <LivePreview />
          </div>
        </div>
      )}
    </div>
  );
}

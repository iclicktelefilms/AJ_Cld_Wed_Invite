import { create } from "zustand";
import { Invitation, BuilderStep, SectionConfig, SectionType } from "@/types";
import { defaultSectionOrder } from "@/data/defaultSections";

interface BuilderStore {
  invitation: Partial<Invitation>;
  currentStep: BuilderStep;
  isDirty: boolean;
  isSaving: boolean;
  isPreviewOpen: boolean;

  setInvitation: (invitation: Partial<Invitation>) => void;
  updateInvitation: (updates: Partial<Invitation>) => void;
  setCurrentStep: (step: BuilderStep) => void;
  setIsSaving: (saving: boolean) => void;
  setIsPreviewOpen: (open: boolean) => void;
  toggleSection: (sectionId: string) => void;
  reorderSection: (fromIndex: number, toIndex: number) => void;
  resetBuilder: () => void;
}

const initialState = {
  invitation: {
    sections: defaultSectionOrder,
    couple: {
      bride_name: "",
      groom_name: "",
    },
    events: [],
    family_members: [],
    gallery: [],
    status: "draft" as const,
  },
  currentStep: "couple" as BuilderStep,
  isDirty: false,
  isSaving: false,
  isPreviewOpen: false,
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,

  setInvitation: (invitation) =>
    set({ invitation, isDirty: false }),

  updateInvitation: (updates) =>
    set((state) => ({
      invitation: { ...state.invitation, ...updates },
      isDirty: true,
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  setIsSaving: (saving) => set({ isSaving: saving }),

  setIsPreviewOpen: (open) => set({ isPreviewOpen: open }),

  toggleSection: (sectionId) =>
    set((state) => ({
      invitation: {
        ...state.invitation,
        sections: state.invitation.sections?.map((s) =>
          s.id === sectionId ? { ...s, enabled: !s.enabled } : s
        ),
      },
      isDirty: true,
    })),

  reorderSection: (fromIndex, toIndex) =>
    set((state) => {
      const sections = [...(state.invitation.sections || [])];
      const [removed] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, removed);
      return {
        invitation: {
          ...state.invitation,
          sections: sections.map((s, i) => ({ ...s, order: i + 1 })),
        },
        isDirty: true,
      };
    }),

  resetBuilder: () => set(initialState),
}));

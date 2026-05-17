import { useBuilderStore } from "@/store/builderStore";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const useBuilder = (invitationId?: string) => {
  const { invitation, updateInvitation, setIsSaving, isDirty } = useBuilderStore();
  const saveTimerRef = useRef<NodeJS.Timeout>();

  const save = useCallback(async () => {
    if (!invitationId || invitationId === "new") return;
    setIsSaving(true);
    try {
      await fetch(`/api/invitations/${invitationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitation),
      });
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  }, [invitation, invitationId, setIsSaving]);

  // Autosave when dirty
  useEffect(() => {
    if (!isDirty) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(save, 2000);
    return () => clearTimeout(saveTimerRef.current);
  }, [isDirty, save]);

  return { save };
};

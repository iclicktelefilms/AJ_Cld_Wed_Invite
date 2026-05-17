import { useState, useEffect } from "react";
import { Invitation } from "@/types";

export const useInvitation = (id: string) => {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id === "new") {
      setLoading(false);
      return;
    }

    const fetchInvitation = async () => {
      try {
        const res = await fetch(`/api/invitations/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setInvitation(data);
      } catch (err) {
        setError("Failed to load invitation");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [id]);

  const save = async (updates: Partial<Invitation>) => {
    const res = await fetch(`/api/invitations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const updated = await res.json();
      setInvitation(updated);
    }
  };

  return { invitation, loading, error, save };
};

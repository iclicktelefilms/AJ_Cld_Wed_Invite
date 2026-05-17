"use client";

import { useBuilderStore } from "@/store/builderStore";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function CoupleStep() {
  const { invitation, updateInvitation } = useBuilderStore();
  const couple = invitation.couple ?? {};

  const update = (field: string, value: string) => {
    updateInvitation({ couple: { ...couple, [field]: value } });
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Couple Details</h2>
        <p className="text-sm text-neutral-500">Tell us about the couple whose love story we&apos;re celebrating.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Bride's Name"
            placeholder="Priya"
            value={couple.bride_name ?? ""}
            onChange={(e) => update("bride_name", e.target.value)}
          />
          <Input
            label="Groom's Name"
            placeholder="Arjun"
            value={couple.groom_name ?? ""}
            onChange={(e) => update("groom_name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Bride's Parents"
            placeholder="Mr. & Mrs. Sharma"
            value={couple.bride_parents ?? ""}
            onChange={(e) => update("bride_parents", e.target.value)}
          />
          <Input
            label="Groom's Parents"
            placeholder="Mr. & Mrs. Verma"
            value={couple.groom_parents ?? ""}
            onChange={(e) => update("groom_parents", e.target.value)}
          />
        </div>

        <Textarea
          label="Love Story (optional)"
          placeholder="Share the story of how you met and fell in love..."
          rows={4}
          value={couple.love_story ?? ""}
          onChange={(e) => update("love_story", e.target.value)}
          hint="This will appear in the Story section of your invitation."
        />

        <Input
          label="Wedding Hashtag (optional)"
          placeholder="PriyaWeds Arjun"
          value={couple.hashtag ?? ""}
          onChange={(e) => update("hashtag", e.target.value)}
          hint="Without the # symbol."
        />
      </div>
    </div>
  );
}

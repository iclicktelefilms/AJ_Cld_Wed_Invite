"use client";

import { useBuilderStore } from "@/store/builderStore";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Users } from "lucide-react";
import { FamilyMember } from "@/types";

const sideOptions = [
  { value: "bride", label: "Bride's Family" },
  { value: "groom", label: "Groom's Family" },
];

export default function FamilyStep() {
  const { invitation, updateInvitation } = useBuilderStore();
  const members = invitation.family_members ?? [];

  const addMember = (side: "bride" | "groom") => {
    const newMember: FamilyMember = {
      id: Math.random().toString(36).slice(2),
      name: "",
      relation: "",
      side,
    };
    updateInvitation({ family_members: [...members, newMember] });
  };

  const updateMember = (id: string, updates: Partial<FamilyMember>) => {
    updateInvitation({
      family_members: members.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    });
  };

  const removeMember = (id: string) => {
    updateInvitation({ family_members: members.filter((m) => m.id !== id) });
  };

  const brideFamily = members.filter((m) => m.side === "bride");
  const groomFamily = members.filter((m) => m.side === "groom");

  const renderMembers = (list: FamilyMember[]) =>
    list.map((member) => (
      <div key={member.id} className="flex items-center gap-3">
        <Input
          placeholder="Name"
          value={member.name}
          onChange={(e) => updateMember(member.id, { name: e.target.value })}
        />
        <Input
          placeholder="Relation (e.g. Father)"
          value={member.relation}
          onChange={(e) => updateMember(member.id, { relation: e.target.value })}
        />
        <button
          onClick={() => removeMember(member.id)}
          className="p-2 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
        >
          <Trash2 className="h-4 w-4 text-red-400" />
        </button>
      </div>
    ));

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Family Members</h2>
        <p className="text-sm text-neutral-500">Add key family members to introduce to guests.</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
              <Users className="h-4 w-4" /> Bride&apos;s Family
            </h3>
            <Button variant="ghost" size="sm" onClick={() => addMember("bride")}>
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <div className="space-y-3">
            {brideFamily.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-6 bg-neutral-50 rounded-xl">
                No members added yet
              </p>
            ) : renderMembers(brideFamily)}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
              <Users className="h-4 w-4" /> Groom&apos;s Family
            </h3>
            <Button variant="ghost" size="sm" onClick={() => addMember("groom")}>
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <div className="space-y-3">
            {groomFamily.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-6 bg-neutral-50 rounded-xl">
                No members added yet
              </p>
            ) : renderMembers(groomFamily)}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Users, Plus, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Clients</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Manage your photography clients</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <EmptyState
        icon={<Users className="h-6 w-6" />}
        title="No clients yet"
        description="Add your photography clients to manage their wedding invitations in one place."
        action={
          <Button>
            <Plus className="h-4 w-4" />
            Add First Client
          </Button>
        }
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { themes } from "@/data/themes";
import ThemeCard from "@/components/themes/ThemeCard";
import { Theme } from "@/types";
import { Search } from "lucide-react";

const religions = ["all", "hindu", "muslim", "sikh", "christian", "jain", "universal"];

export default function ThemeStep() {
  const { invitation, updateInvitation } = useBuilderStore();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredThemes = themes.filter((t) => {
    const matchesReligion = filter === "all" || t.religion === filter;
    const matchesSearch = search === "" || t.name.toLowerCase().includes(search.toLowerCase());
    return matchesReligion && matchesSearch && t.is_active;
  });

  const handleSelect = (theme: Theme) => {
    updateInvitation({ theme_id: theme.id });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Choose a Theme</h2>
        <p className="text-sm text-neutral-500">Select the perfect theme for your wedding invitation.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search themes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
      </div>

      {/* Religion filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {religions.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
              filter === r
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredThemes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            selected={invitation.theme_id === theme.id}
            onSelect={handleSelect}
            isPremiumUser={false}
          />
        ))}
      </div>
    </div>
  );
}

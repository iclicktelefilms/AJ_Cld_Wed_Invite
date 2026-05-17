"use client";

import { useState } from "react";
import { themes } from "@/data/themes";
import ThemeCard from "@/components/themes/ThemeCard";
import { Theme } from "@/types";

const religions = ["all", "hindu", "muslim", "sikh", "christian", "jain", "universal"];

export default function ThemesPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = themes.filter(
    (t) => (filter === "all" || t.religion === filter) && t.is_active
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Theme Library</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Browse and preview all available invitation themes</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {religions.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
              filter === r ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            selected={selected === theme.id}
            onSelect={(t: Theme) => setSelected(t.id)}
            isPremiumUser={false}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/utils/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
  return (
    <label className={cn("flex items-start gap-3", disabled && "opacity-50 cursor-not-allowed", "cursor-pointer")}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            "w-10 h-6 rounded-full transition-colors duration-200",
            checked ? "bg-neutral-900" : "bg-neutral-200"
          )}
        />
        <div
          className={cn(
            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked && "translate-x-4"
          )}
        />
      </div>
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && <p className="text-sm font-medium text-neutral-900">{label}</p>}
          {description && <p className="text-xs text-neutral-500 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  );
}

"use client";

import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
}

interface StepNavProps {
  steps: readonly Step[];
  currentStep: string;
  onSelect: (id: string) => void;
}

export default function StepNav({ steps, currentStep, onSelect }: StepNavProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3 px-1">
        Builder Steps
      </p>
      <div className="space-y-0.5">
        {steps.map((step, i) => {
          const isActive = step.id === currentStep;
          const isDone = i < currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelect(step.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all",
                isActive && "bg-neutral-900 text-white",
                !isActive && isDone && "text-neutral-500 hover:bg-neutral-50",
                !isActive && !isDone && "text-neutral-400 hover:bg-neutral-50"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                  isActive && "bg-white text-neutral-900",
                  !isActive && isDone && "bg-emerald-500 text-white",
                  !isActive && !isDone && "bg-neutral-100 text-neutral-400"
                )}
              >
                {isDone ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              </div>
              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

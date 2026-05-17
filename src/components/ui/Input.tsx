"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2.5 text-sm bg-white border rounded-lg",
            "text-neutral-900 placeholder:text-neutral-400",
            "focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900",
            "transition-colors duration-200",
            error ? "border-red-400 focus:border-red-500" : "border-neutral-200",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

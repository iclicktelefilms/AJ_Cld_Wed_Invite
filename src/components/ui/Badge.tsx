import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "gold" | "premium";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    gold: "bg-gold-500/10 text-gold-700 border border-gold-500/30",
    premium: "bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-800 border border-gold-500/40",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

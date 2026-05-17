import { cn } from "@/utils/cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      {icon && (
        <div className="mb-4 p-4 rounded-2xl bg-neutral-50 text-neutral-400">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-neutral-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-neutral-500 max-w-xs">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

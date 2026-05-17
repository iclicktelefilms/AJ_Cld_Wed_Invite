import { cn } from "@/utils/cn";
import Card from "@/components/ui/Card";

interface StatsCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon: React.ReactNode;
  className?: string;
}

export default function StatsCard({ label, value, delta, deltaPositive, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          {delta && (
            <p className={cn("text-xs mt-1 font-medium", deltaPositive ? "text-emerald-600" : "text-red-500")}>
              {deltaPositive ? "↑" : "↓"} {delta}
            </p>
          )}
        </div>
        <div className="p-2.5 rounded-xl bg-neutral-50 text-neutral-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}

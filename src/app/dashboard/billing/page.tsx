import { Check, Zap } from "lucide-react";
import { plans } from "@/data/plans";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function BillingPage() {
  const currentPlan = "free";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-neutral-900">Billing & Plans</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage your subscription and upgrade your plan</p>
      </div>

      {/* Current plan banner */}
      <Card className="p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Current Plan</p>
          <p className="text-lg font-bold text-neutral-900 capitalize">{currentPlan}</p>
          <p className="text-sm text-neutral-500 mt-0.5">2/2 invitations used · 0.2 GB of 0.5 GB storage</p>
        </div>
        <Badge variant="default">Free</Badge>
      </Card>

      {/* Plans grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl border-2 p-5 relative ${
              plan.id === "professional"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white"
            }`}
          >
            {plan.id === "professional" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-neutral-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Zap className="h-3 w-3" /> Most Popular
              </div>
            )}

            <div className="mb-4">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${plan.id === "professional" ? "text-neutral-400" : "text-neutral-500"}`}>
                {plan.name}
              </p>
              <p className={`text-2xl font-bold ${plan.id === "professional" ? "text-white" : "text-neutral-900"}`}>
                {plan.price_monthly === 0 ? "Free" : `₹${plan.price_monthly.toLocaleString()}`}
              </p>
              {plan.price_monthly > 0 && (
                <p className={`text-xs ${plan.id === "professional" ? "text-neutral-400" : "text-neutral-500"}`}>/month</p>
              )}
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs">
                  <Check className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${plan.id === "professional" ? "text-yellow-400" : "text-emerald-500"}`} />
                  <span className={plan.id === "professional" ? "text-neutral-300" : "text-neutral-600"}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                plan.id === currentPlan
                  ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  : plan.id === "professional"
                  ? "bg-yellow-400 text-neutral-900 hover:bg-yellow-300"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
              disabled={plan.id === currentPlan}
            >
              {plan.id === currentPlan ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-neutral-400 mt-8">
        All plans include a 14-day free trial. No credit card required for free plan.
      </p>
    </div>
  );
}

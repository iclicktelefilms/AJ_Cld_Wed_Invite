import { Shield, Users, Image, Palette, CreditCard, BarChart2 } from "lucide-react";

const stats = [
  { label: "Total Studios", value: "0", icon: Users },
  { label: "Total Invitations", value: "0", icon: Image },
  { label: "Active Subscriptions", value: "0", icon: CreditCard },
  { label: "Total Revenue", value: "₹0", icon: BarChart2 },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
            <Shield className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Super Admin</h1>
            <p className="text-sm text-neutral-500">Platform management dashboard</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-neutral-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-neutral-400" />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "User Management", description: "Manage studios and accounts" },
            { icon: Palette, title: "Theme Management", description: "Publish and manage themes" },
            { icon: CreditCard, title: "Subscriptions", description: "View and manage plans" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-neutral-100 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-neutral-700" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

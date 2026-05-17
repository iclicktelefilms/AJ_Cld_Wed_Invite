"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  LayoutDashboard,
  Image,
  Palette,
  BarChart2,
  CreditCard,
  Settings,
  Users,
  HelpCircle,
  Star,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Image, label: "Invitations", href: "/dashboard/invitations" },
  { icon: Palette, label: "Themes", href: "/dashboard/themes" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Clients", href: "/dashboard/clients" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-neutral-100 flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-neutral-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
            <Star className="h-4 w-4 text-gold-400" />
          </div>
          <span className="font-semibold text-neutral-900 tracking-tight">LoveStory</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive(item.href)
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-neutral-100">
        {/* Upgrade CTA */}
        <div className="mb-3 p-3 rounded-xl bg-neutral-900 text-white">
          <p className="text-xs font-medium mb-0.5">Free Plan</p>
          <p className="text-xs text-neutral-400 mb-2">2/2 invitations used</p>
          <Link
            href="/dashboard/billing"
            className="block text-center text-xs py-1.5 px-3 rounded-lg bg-gold-500 text-neutral-900 font-medium hover:bg-gold-600 transition-colors"
          >
            Upgrade Now
          </Link>
        </div>

        <div className="space-y-0.5">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive(item.href)
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

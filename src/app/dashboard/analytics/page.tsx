"use client";

import { BarChart2, Eye, Users, Share2, Smartphone, Monitor } from "lucide-react";
import Card from "@/components/ui/Card";

const statsData = [
  { label: "Total Views", value: "1,247", icon: Eye, delta: "+18%", positive: true },
  { label: "RSVPs Received", value: "89", icon: Users, delta: "+12", positive: true },
  { label: "WhatsApp Shares", value: "234", icon: Share2, delta: "+34%", positive: true },
  { label: "Unique Visitors", value: "891", icon: BarChart2, delta: "+8%", positive: true },
];

const viewsData = [
  { date: "Jan 10", views: 45 },
  { date: "Jan 11", views: 78 },
  { date: "Jan 12", views: 120 },
  { date: "Jan 13", views: 94 },
  { date: "Jan 14", views: 210 },
  { date: "Jan 15", views: 180 },
  { date: "Jan 16", views: 156 },
];

const maxViews = Math.max(...viewsData.map((d) => d.views));

const deviceData = [
  { label: "Mobile", value: 78, icon: Smartphone },
  { label: "Desktop", value: 18, icon: Monitor },
  { label: "Tablet", value: 4, icon: Monitor },
];

const locations = [
  { city: "Mumbai", count: 312 },
  { city: "Delhi", count: 245 },
  { city: "Bangalore", count: 198 },
  { city: "Jaipur", count: 156 },
  { city: "Hyderabad", count: 112 },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-neutral-900">Analytics</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Track how your invitations are performing</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <p className={`text-xs mt-1 font-medium ${stat.positive ? "text-emerald-600" : "text-red-500"}`}>
                  {stat.positive ? "↑" : "↓"} {stat.delta}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-50">
                <stat.icon className="h-5 w-5 text-neutral-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views chart */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-6">Views Over Time</h2>
          <div className="flex items-end gap-3 h-40">
            {viewsData.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-neutral-900 rounded-t-sm transition-all"
                  style={{ height: `${(d.views / maxViews) * 100}%` }}
                />
                <span className="text-xs text-neutral-400 rotate-45 origin-left">{d.date}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Device breakdown */}
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Device Types</h2>
            <div className="space-y-3">
              {deviceData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-600">{d.label}</span>
                    <span className="font-medium text-neutral-900">{d.value}%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 rounded-full"
                      style={{ width: `${d.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Top Locations</h2>
            <div className="space-y-2">
              {locations.map((loc, i) => (
                <div key={loc.city} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 w-4">{i + 1}</span>
                    <span className="text-sm text-neutral-700">{loc.city}</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-900">{loc.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

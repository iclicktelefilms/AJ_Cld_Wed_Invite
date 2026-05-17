"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [studioName, setStudioName] = useState("My Photography Studio");
  const [email, setEmail] = useState("studio@example.com");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Manage your studio profile and preferences</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-5">Studio Profile</h2>
          <div className="space-y-4">
            <Input
              label="Studio Name"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-5">Preferences</h2>
          <div className="space-y-4">
            <Toggle
              checked={notifications}
              onChange={setNotifications}
              label="Email Notifications"
              description="Receive email alerts for new RSVPs and views"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-2">Brand Presets</h2>
          <p className="text-xs text-neutral-500 mb-5">Set default branding applied to new invitations</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">Primary Color</label>
              <input
                type="color"
                defaultValue="#D4AF37"
                className="w-full h-10 rounded-lg border border-neutral-200 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">Secondary Color</label>
              <input
                type="color"
                defaultValue="#8B0000"
                className="w-full h-10 rounded-lg border border-neutral-200 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

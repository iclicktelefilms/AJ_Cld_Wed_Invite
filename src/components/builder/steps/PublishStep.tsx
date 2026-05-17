"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { Check, Copy, Share2, QrCode, Globe } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";
import toast from "react-hot-toast";

export default function PublishStep() {
  const { invitation } = useBuilderStore();
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [published, setPublished] = useState(invitation.status === "published");

  const slug = invitation.slug ?? "your-invitation-link";
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Link copied!");
  };

  const handlePublish = async () => {
    setPublished(true);
    toast.success("Invitation published successfully!");
  };

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Preview & Publish</h2>
        <p className="text-sm text-neutral-500">Review your invitation and share it with the world.</p>
      </div>

      <div className="space-y-6">
        {/* Publish status */}
        {published ? (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">Invitation is Live!</p>
              <p className="text-xs text-emerald-600 mt-0.5">Share the link below with your guests.</p>
            </div>
          </div>
        ) : (
          <Button onClick={handlePublish} size="lg" className="w-full gap-2">
            <Globe className="h-4 w-4" />
            Publish Invitation
          </Button>
        )}

        {/* Link */}
        <div>
          <p className="text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">Invitation Link</p>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-600 truncate">
              {inviteUrl}
            </div>
            <button
              onClick={copyLink}
              className="p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              <Copy className="h-4 w-4 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Share */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">
            <Share2 className="h-4 w-4" />
            WhatsApp Share
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-200 text-sm font-medium hover:bg-neutral-50 transition-colors">
            <QrCode className="h-4 w-4" />
            QR Code
          </button>
        </div>

        {/* Password protection */}
        <div className="p-4 bg-white border border-neutral-100 rounded-xl space-y-4">
          <Toggle
            checked={passwordProtected}
            onChange={setPasswordProtected}
            label="Password Protection"
            description="Require a password to view the invitation"
          />
          {passwordProtected && (
            <Input
              label="Password"
              type="password"
              placeholder="Set a password for guests"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>

        {/* SEO Note */}
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-xs font-medium text-neutral-700 mb-1">SEO & Sharing Preview</p>
          <p className="text-xs text-neutral-500">
            Your invitation is automatically optimized for WhatsApp, Facebook, and search engines with a beautiful preview card.
          </p>
        </div>
      </div>
    </div>
  );
}

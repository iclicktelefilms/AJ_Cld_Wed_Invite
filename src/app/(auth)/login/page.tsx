"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-neutral-900 flex-col p-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-20">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-400" />
            </div>
            <span className="text-white font-semibold">LoveStory</span>
          </div>

          <h2
            className="text-4xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create invitations<br />your clients will love
          </h2>

          <p className="text-neutral-400 leading-relaxed max-w-sm">
            The premium invitation builder trusted by wedding photographers across India.
          </p>
        </div>

        {/* Theme preview cards */}
        <div className="absolute bottom-12 left-12 right-12 grid grid-cols-3 gap-3">
          {[
            { bg: "#180400", primary: "#D4AF37", name: "Royal" },
            { bg: "#0A0A0F", primary: "#C9A84C", name: "Midnight" },
            { bg: "#FAF7F2", primary: "#B5843A", name: "Ivory" },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-xl h-20 flex items-center justify-center"
              style={{ backgroundColor: t.bg, border: `1px solid ${t.primary}30` }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: t.primary, fontFamily: "'Cinzel Decorative', serif" }}
              >
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center">
              <Star className="h-3.5 w-3.5 text-yellow-400" />
            </div>
            <span className="font-semibold text-neutral-900">LoveStory</span>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <Star className="h-6 w-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Check your email</h2>
              <p className="text-neutral-500 text-sm">
                We sent a magic link to <strong>{email}</strong>
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-neutral-500 hover:text-neutral-700"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back</h1>
              <p className="text-neutral-500 text-sm mb-8">Sign in to your studio account</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="studio@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" loading={loading} className="w-full" size="lg">
                  Continue with Email
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-100" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-neutral-400">or</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-xs text-neutral-400 mt-8">
                New to LoveStory?{" "}
                <Link href="/login" className="text-neutral-700 font-medium hover:underline">
                  Create a studio account
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

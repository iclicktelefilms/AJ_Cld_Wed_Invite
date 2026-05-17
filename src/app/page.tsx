import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ready in 10 Minutes",
    description: "Step-by-step guided builder takes you from blank to published in under 10 minutes.",
  },
  {
    icon: Star,
    title: "Luxury Themes",
    description: "Curated themes for Hindu, Muslim, Sikh, Christian, and Jain weddings across India.",
  },
  {
    icon: Shield,
    title: "Built for Studios",
    description: "Manage multiple clients, track analytics, and deliver a premium experience under your brand.",
  },
  {
    icon: Globe,
    title: "Instant Sharing",
    description: "One-click WhatsApp share, QR codes, and custom domains for every invitation.",
  },
];

const themes = [
  { name: "Royal Rajasthani", bg: "#180400", primary: "#D4AF37", religion: "Hindu" },
  { name: "Midnight Luxury", bg: "#0A0A0F", primary: "#C9A84C", religion: "Universal" },
  { name: "Ivory Floral", bg: "#FAF7F2", primary: "#B5843A", religion: "Universal" },
  { name: "Mughal Grandeur", bg: "#0D1B2A", primary: "#C5A028", religion: "Muslim" },
  { name: "Punjabi Vibrant", bg: "#1A0A00", primary: "#F4A300", religion: "Sikh" },
  { name: "Garden Romance", bg: "#F8FBF5", primary: "#4A7C59", religion: "Christian" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center">
              <Star className="h-3.5 w-3.5 text-yellow-400" />
            </div>
            <span className="font-semibold text-neutral-900">LoveStory</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/login"
              className="bg-neutral-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-8">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            Built for Indian Wedding Photographers
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-neutral-900 leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Luxury Wedding<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
              Invitations in Minutes
            </span>
          </h1>

          <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The professional invitation builder for Indian wedding studios. Stunning themes, live preview, instant publishing — everything your clients expect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-all"
            >
              Start Building Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/invite/demo"
              className="inline-flex items-center gap-2 text-neutral-700 px-6 py-3.5 rounded-xl font-medium border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
            >
              View Sample Invitation
            </Link>
          </div>

          <p className="text-xs text-neutral-400 mt-6">
            Free plan available — no credit card required
          </p>
        </div>
      </section>

      {/* Theme Showcase */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-neutral-400 mb-10 font-medium">
            Curated Themes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {themes.map((t) => (
              <div
                key={t.name}
                className="rounded-xl overflow-hidden border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div
                  className="h-24 flex flex-col items-center justify-center p-3"
                  style={{ backgroundColor: t.bg }}
                >
                  <p
                    className="text-xs font-semibold text-center leading-tight"
                    style={{ color: t.primary, fontFamily: "'Cinzel Decorative', serif" }}
                  >
                    {t.name}
                  </p>
                </div>
                <div className="bg-white p-2 text-center">
                  <p className="text-xs text-neutral-500">{t.religion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything a studio needs
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Designed from the ground up for Indian wedding photographers and studios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-neutral-700" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-neutral-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Start creating today
          </h2>
          <p className="text-neutral-400 mb-8">
            Join photographers already using LoveStory to deliver premium invitations.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-yellow-400 text-neutral-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-all text-sm"
          >
            Create Your First Invitation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center">
              <Star className="h-3 w-3 text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-neutral-700">LoveStory</span>
          </div>
          <p className="text-xs text-neutral-400">
            © 2025 LoveStory. Premium Wedding Invitations.
          </p>
        </div>
      </footer>
    </div>
  );
}

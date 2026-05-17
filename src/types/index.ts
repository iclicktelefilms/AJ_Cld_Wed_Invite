// =====================
// USER & AUTH TYPES
// =====================
export type UserRole = "super_admin" | "studio_owner" | "editor" | "sales" | "client";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: UserRole;
  studio_id?: string;
  created_at: string;
}

export interface Studio {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  owner_id: string;
  brand_colors?: { primary: string; secondary: string };
  default_fonts?: { heading: string; body: string };
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  social_links?: Record<string, string>;
  white_label: boolean;
  custom_domain?: string;
  subscription_id?: string;
  created_at: string;
}

// =====================
// THEME TYPES
// =====================
export type Religion = "hindu" | "muslim" | "sikh" | "christian" | "jain" | "universal";
export type ThemeStyle = "royal" | "minimal" | "floral" | "luxury" | "cinematic" | "traditional" | "modern" | "temple" | "vintage" | "bollywood";
export type ThemeCategory = "traditional" | "modern" | "regional" | "destination";
export type AnimationTier = "basic" | "standard" | "premium";

export interface ThemeFonts {
  heading: string;
  body: string;
  accent?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface?: string;
  text: string;
  textMuted?: string;
  accent?: string;
  border?: string;
}

export interface ThemeSupports {
  gallery: boolean;
  music: boolean;
  video: boolean;
  countdown: boolean;
  rsvp: boolean;
  maps: boolean;
  story: boolean;
}

export interface ThemeLayouts {
  hero: string;
  events: string;
  gallery: string;
  family: string;
  couple?: string;
}

export interface Theme {
  id: string;
  name: string;
  religion: Religion;
  style: ThemeStyle;
  category: ThemeCategory;
  premium: boolean;
  preview_image?: string;
  fonts: ThemeFonts;
  colors: ThemeColors;
  supports: ThemeSupports;
  layouts: ThemeLayouts;
  animations: AnimationTier;
  decorative_elements?: string[];
  is_active: boolean;
  sort_order: number;
}

// =====================
// INVITATION TYPES
// =====================
export type InvitationStatus = "draft" | "published" | "archived";
export type EventCategory = "wedding" | "engagement" | "haldi" | "mehendi" | "sangeet" | "reception" | "baby_shower" | "anniversary";

export interface CoupleDetails {
  bride_name: string;
  groom_name: string;
  bride_photo?: string;
  groom_photo?: string;
  couple_photo?: string;
  bride_parents?: string;
  groom_parents?: string;
  love_story?: string;
  hashtag?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  time: string;
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_maps_url?: string;
  venue_lat?: number;
  venue_lng?: number;
  dress_code?: string;
  notes?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  photo?: string;
  side: "bride" | "groom";
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  sort_order: number;
}

export interface RSVPResponse {
  id: string;
  invitation_id: string;
  name: string;
  email?: string;
  phone?: string;
  attending: boolean;
  guest_count: number;
  message?: string;
  created_at: string;
}

// =====================
// SECTION TYPES
// =====================
export type SectionType =
  | "hero"
  | "couple_intro"
  | "countdown"
  | "story"
  | "events"
  | "family"
  | "venue"
  | "gallery"
  | "video"
  | "rsvp"
  | "dress_code"
  | "hashtag"
  | "music"
  | "footer";

export interface SectionConfig {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  layout?: string;
  custom_content?: Record<string, unknown>;
}

export interface Invitation {
  id: string;
  studio_id: string;
  user_id: string;
  slug: string;
  title: string;
  status: InvitationStatus;
  theme_id: string;
  couple: CoupleDetails;
  events: WeddingEvent[];
  family_members: FamilyMember[];
  gallery: GalleryImage[];
  sections: SectionConfig[];
  music_url?: string;
  video_url?: string;
  password?: string;
  custom_domain?: string;
  views: number;
  rsvp_count: number;
  whatsapp_shares: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// =====================
// BUILDER TYPES
// =====================
export type BuilderStep =
  | "couple"
  | "wedding"
  | "events"
  | "family"
  | "venue"
  | "gallery"
  | "theme"
  | "publish";

export interface BuilderState {
  invitation: Partial<Invitation>;
  currentStep: BuilderStep;
  isDirty: boolean;
  isSaving: boolean;
  isPreviewOpen: boolean;
  selectedSectionId: string | null;
}

// =====================
// ANALYTICS TYPES
// =====================
export interface AnalyticsData {
  invitation_id: string;
  total_views: number;
  unique_views: number;
  rsvp_count: number;
  whatsapp_shares: number;
  device_breakdown: { mobile: number; desktop: number; tablet: number };
  top_locations: Array<{ city: string; count: number }>;
  views_over_time: Array<{ date: string; count: number }>;
}

// =====================
// SUBSCRIPTION TYPES
// =====================
export type PlanName = "free" | "starter" | "professional" | "studio";

export interface Plan {
  id: PlanName;
  name: string;
  price_monthly: number;
  price_yearly: number;
  invitations_limit: number;
  storage_gb: number;
  themes_access: "basic" | "all";
  custom_domain: boolean;
  white_label: boolean;
  analytics: boolean;
  ai_features: boolean;
  features: string[];
}

export interface Subscription {
  id: string;
  studio_id: string;
  plan: PlanName;
  status: "active" | "cancelled" | "expired" | "trial";
  current_period_end: string;
  invitations_used: number;
  storage_used_mb: number;
}

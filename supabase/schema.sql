-- Wedding Invitation SaaS — Supabase Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- STUDIOS
-- =====================
CREATE TABLE studios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_colors JSONB DEFAULT '{"primary": "#D4AF37", "secondary": "#8B0000"}',
  default_fonts JSONB DEFAULT '{"heading": "Playfair Display", "body": "Lora"}',
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  white_label BOOLEAN DEFAULT FALSE,
  custom_domain TEXT,
  subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- USERS (extends auth.users)
-- =====================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'studio_owner' CHECK (role IN ('super_admin', 'studio_owner', 'editor', 'sales', 'client')),
  studio_id UUID REFERENCES studios(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- THEMES
-- =====================
CREATE TABLE themes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  religion TEXT NOT NULL,
  style TEXT NOT NULL,
  category TEXT NOT NULL,
  premium BOOLEAN DEFAULT FALSE,
  preview_image TEXT,
  fonts JSONB NOT NULL,
  colors JSONB NOT NULL,
  supports JSONB NOT NULL,
  layouts JSONB NOT NULL,
  animations TEXT DEFAULT 'standard',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INVITATIONS
-- =====================
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  theme_id TEXT REFERENCES themes(id),
  couple JSONB NOT NULL DEFAULT '{}',
  events JSONB DEFAULT '[]',
  family_members JSONB DEFAULT '[]',
  gallery JSONB DEFAULT '[]',
  sections JSONB DEFAULT '[]',
  music_url TEXT,
  video_url TEXT,
  password TEXT,
  custom_domain TEXT,
  views INTEGER DEFAULT 0,
  rsvp_count INTEGER DEFAULT 0,
  whatsapp_shares INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- RSVPs
-- =====================
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  attending BOOLEAN,
  guest_count INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ANALYTICS
-- =====================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,  -- 'view', 'rsvp', 'share', 'calendar_add'
  device_type TEXT,          -- 'mobile', 'desktop', 'tablet'
  city TEXT,
  country TEXT DEFAULT 'India',
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- MEDIA
-- =====================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  invitation_id UUID REFERENCES invitations(id) ON DELETE SET NULL,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  size_bytes INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SUBSCRIPTIONS
-- =====================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'professional', 'studio')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  current_period_end TIMESTAMPTZ,
  invitations_used INTEGER DEFAULT 0,
  storage_used_mb INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- DOMAINS
-- =====================
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  domain TEXT UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Studios: owner access only
CREATE POLICY "Studios: owner access" ON studios
  FOR ALL USING (owner_id = auth.uid());

-- Invitations: studio members access
CREATE POLICY "Invitations: studio access" ON invitations
  FOR ALL USING (
    studio_id IN (SELECT id FROM studios WHERE owner_id = auth.uid())
    OR user_id = auth.uid()
  );

-- Invitations: public can read published
CREATE POLICY "Invitations: public read published" ON invitations
  FOR SELECT USING (status = 'published');

-- RSVPs: invitation owner can read, anyone can insert
CREATE POLICY "RSVPs: anyone can insert" ON rsvps
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "RSVPs: studio owner can read" ON rsvps
  FOR SELECT USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE studio_id IN (
        SELECT id FROM studios WHERE owner_id = auth.uid()
      )
    )
  );

-- =====================
-- FUNCTIONS & TRIGGERS
-- =====================

-- Auto-increment invitation view count
CREATE OR REPLACE FUNCTION increment_invitation_views(inv_id UUID)
RETURNS void AS $$
  UPDATE invitations SET views = views + 1, updated_at = NOW()
  WHERE id = inv_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Update invitation RSVP count
CREATE OR REPLACE FUNCTION update_rsvp_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE invitations
  SET rsvp_count = (
    SELECT COUNT(*) FROM rsvps WHERE invitation_id = NEW.invitation_id AND attending = TRUE
  )
  WHERE id = NEW.invitation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_rsvp_insert
  AFTER INSERT ON rsvps
  FOR EACH ROW EXECUTE FUNCTION update_rsvp_count();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invitations_updated_at
  BEFORE UPDATE ON invitations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================
-- SEED: Default Themes
-- =====================
INSERT INTO themes (id, name, religion, style, category, premium, fonts, colors, supports, layouts, animations, is_active, sort_order) VALUES
('royal-rajasthani', 'Royal Rajasthani', 'hindu', 'royal', 'regional', TRUE,
  '{"heading": "Cinzel Decorative", "body": "Cormorant Garamond"}',
  '{"primary": "#D4AF37", "secondary": "#8B0000", "background": "#180400", "text": "#F5E6C8"}',
  '{"gallery": true, "music": true, "video": true, "countdown": true, "rsvp": true, "maps": true, "story": true}',
  '{"hero": "royalHero", "events": "timelineClassic", "gallery": "luxuryGrid", "family": "royalCards"}',
  'premium', TRUE, 1),
('ivory-floral', 'Ivory Floral', 'universal', 'floral', 'modern', FALSE,
  '{"heading": "Playfair Display", "body": "Lora"}',
  '{"primary": "#B5843A", "secondary": "#8E6B5A", "background": "#FAF7F2", "text": "#2C1810"}',
  '{"gallery": true, "music": true, "video": false, "countdown": true, "rsvp": true, "maps": true, "story": true}',
  '{"hero": "floralHero", "events": "timelineSimple", "gallery": "masonryGrid", "family": "simpleCards"}',
  'standard', TRUE, 2),
('midnight-luxury', 'Midnight Luxury', 'universal', 'luxury', 'modern', TRUE,
  '{"heading": "Cinzel Decorative", "body": "EB Garamond"}',
  '{"primary": "#C9A84C", "secondary": "#9B8056", "background": "#0A0A0F", "text": "#FFFFFF"}',
  '{"gallery": true, "music": true, "video": true, "countdown": true, "rsvp": true, "maps": true, "story": true}',
  '{"hero": "cinematicHero", "events": "timelineModern", "gallery": "cinematicGrid", "family": "darkCards"}',
  'premium', TRUE, 3);

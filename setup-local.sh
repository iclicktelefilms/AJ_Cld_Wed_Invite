#!/bin/bash

set -e

BRANCH="claude/wedding-invitation-saas-D7MvD"
REPO="https://github.com/iclicktelefilms/AJ_Cld_Wed_Invite.git"
DIR="AJ_Cld_Wed_Invite"

echo ""
echo "  LoveStory — Local Setup"
echo "  ========================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "  ERROR: Node.js is not installed."
  echo "  Install it from https://nodejs.org (v18 or higher)"
  exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
  echo "  ERROR: Node.js v18+ required. You have $(node -v)"
  exit 1
fi

echo "  Node.js $(node -v) detected"

# Clone if not already cloned
if [ -d "$DIR" ]; then
  echo "  Folder '$DIR' already exists — pulling latest..."
  cd "$DIR"
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  echo "  Cloning repository..."
  git clone --branch "$BRANCH" "$REPO" "$DIR"
  cd "$DIR"
fi

# Install dependencies
echo ""
echo "  Installing dependencies..."
npm install --legacy-peer-deps

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
  echo ""
  echo "  Creating .env.local with demo defaults..."
  cat > .env.local << 'EOF'
# App
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=LoveStory

# Supabase (add your real keys when ready)
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-key

# Cloudflare R2 (add when ready)
CLOUDFLARE_R2_ACCOUNT_ID=placeholder
CLOUDFLARE_R2_ACCESS_KEY_ID=placeholder
CLOUDFLARE_R2_SECRET_ACCESS_KEY=placeholder
CLOUDFLARE_R2_BUCKET_NAME=wedding-invites
CLOUDFLARE_R2_PUBLIC_URL=https://placeholder.r2.dev
EOF
  echo "  .env.local created"
else
  echo ""
  echo "  .env.local already exists — skipping"
fi

echo ""
echo "  ========================"
echo "  Setup complete!"
echo ""
echo "  Starting dev server..."
echo ""
echo "  Pages available at http://localhost:3001:"
echo "    /                  Landing page"
echo "    /login             Sign in"
echo "    /dashboard         Studio dashboard"
echo "    /invite/demo       Sample invitation (Royal Rajasthani theme)"
echo "    /builder/new       Invitation builder"
echo "    /admin             Super admin panel"
echo ""
echo "  Press Ctrl+C to stop."
echo "  ========================"
echo ""

npm run dev

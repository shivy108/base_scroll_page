#!/bin/bash
set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="/var/www/shiv.rocks"
BRANCH="${1:-master}"

echo "🪨 shiv.rocks deploy script"
echo "================================"

# Pull latest
echo "📥 Pulling latest from origin/$BRANCH..."
cd "$REPO_DIR"
GIT_SSH_COMMAND="ssh -i ~/.ssh/github_shivrocks" git pull origin "$BRANCH"

# Install deps (only if package.json changed)
echo "📦 Checking dependencies..."
npm install --silent

# Build
echo "🔨 Building..."
npm run build

# Deploy
echo "🚀 Deploying to $DEPLOY_DIR..."
rsync -av --delete "$REPO_DIR/dist/" "$DEPLOY_DIR/"

# dashboard.html is served directly by Caddy (bypasses Astro bundler)
# Keep it in sync from public/ since Astro copies public/ to dist/
echo "📊 Dashboard HTML is included via public/dashboard.html → dist/"

echo ""
echo "✅ Deployed successfully → https://shiv.rocks"

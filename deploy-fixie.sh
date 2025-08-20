#!/bin/bash

# 🚀 Script de Déploiement FixieRun PWA
# Usage: chmod +x deploy-fixie.sh && ./deploy-fixie.sh

echo "🚀 DEPLOYING FIXIERUN PWA TO GITHUB PAGES..."
echo "=========================================="

# Variables
REPO_NAME="fixierun-pwa"
BRANCH="main"
COMMIT_MSG="🔧 PWA Fix: Optimized cyberpunk interface for GitHub Pages"

# Colors for terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    log_error "Not in a git repository. Please run this script from your fixierun-pwa directory."
    exit 1
fi

log_info "Checking current directory..."
pwd

# Check if required files exist
log_info "Checking for required files..."

required_files=("index.html" "style.css" "app.js")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    log_error "Missing required files: ${missing_files[*]}"
    log_info "Please copy the corrected files to your repository first."
    exit 1
fi

log_success "All required files found!"

# Check git status
log_info "Checking git status..."
git_status=$(git status --porcelain)

if [ -n "$git_status" ]; then
    log_info "Changes detected. Preparing to commit..."
    
    # Add all changes
    log_info "Adding files to git..."
    git add .
    
    # Commit changes
    log_info "Committing changes..."
    git commit -m "$COMMIT_MSG"
    
    if [ $? -eq 0 ]; then
        log_success "Changes committed successfully!"
    else
        log_error "Failed to commit changes."
        exit 1
    fi
else
    log_info "No changes to commit."
fi

# Push to GitHub
log_info "Pushing to GitHub Pages..."
git push origin $BRANCH

if [ $? -eq 0 ]; then
    log_success "Successfully pushed to GitHub!"
else
    log_error "Failed to push to GitHub."
    exit 1
fi

# Wait for GitHub Pages deployment
log_info "Waiting for GitHub Pages to deploy..."
log_warning "This may take 2-5 minutes..."

# Get GitHub username and repo from git remote
GITHUB_URL=$(git remote get-url origin)
if [[ $GITHUB_URL == *"github.com"* ]]; then
    # Extract username from git URL
    if [[ $GITHUB_URL == *"git@github.com:"* ]]; then
        # SSH format: git@github.com:username/repo.git
        GITHUB_USER=$(echo $GITHUB_URL | sed 's/git@github.com://g' | sed 's/\/.*//g')
    elif [[ $GITHUB_URL == *"https://github.com/"* ]]; then
        # HTTPS format: https://github.com/username/repo.git
        GITHUB_USER=$(echo $GITHUB_URL | sed 's/https:\/\/github.com\///g' | sed 's/\/.*//g')
    fi
    
    PAGES_URL="https://${GITHUB_USER}.github.io/${REPO_NAME}/"
    
    log_success "Deployment initiated!"
    echo ""
    echo "🌐 Your PWA will be available at:"
    echo "   $PAGES_URL"
    echo ""
    echo "📱 To test PWA installation:"
    echo "   1. Open the URL in Chrome/Safari"
    echo "   2. Look for the install icon in the address bar"
    echo "   3. Click 'Install' or 'Add to Home Screen'"
    echo ""
    echo "🧪 To test offline mode:"
    echo "   1. Open DevTools → Network → Offline"
    echo "   2. Refresh the page - should still work!"
    echo ""
    echo "⚡ Performance testing:"
    echo "   lighthouse $PAGES_URL --view"
    echo ""
else
    log_warning "Could not determine GitHub Pages URL automatically."
    log_info "Check your repository settings: Settings → Pages"
fi

# Check if GitHub Pages is enabled
log_info "Checking GitHub Pages configuration..."
echo ""
echo "📋 Manual Steps (if needed):"
echo "   1. Go to: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "   2. Source: Deploy from a branch"
echo "   3. Branch: main / (root)"
echo "   4. Save"
echo ""

# Final status
log_success "Deployment script completed!"
log_info "Monitor deployment at: https://github.com/${GITHUB_USER}/${REPO_NAME}/deployments"

# Optional: Open in browser (macOS/Linux)
if command -v open >/dev/null 2>&1; then
    read -p "Open GitHub Pages URL in browser? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sleep 30  # Wait a bit for deployment
        open "$PAGES_URL"
    fi
elif command -v xdg-open >/dev/null 2>&1; then
    read -p "Open GitHub Pages URL in browser? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sleep 30  # Wait a bit for deployment
        xdg-open "$PAGES_URL"
    fi
fi

echo ""
log_success "🚀 FixieRun PWA deployment complete!"
echo ""
echo "🔧 Troubleshooting:"
echo "   - If app doesn't load: Check Console for errors"
echo "   - If PWA won't install: Verify HTTPS and manifest"
echo "   - If offline doesn't work: Check Service Worker in DevTools"
echo ""
echo "⭐ Remember to star the repo if deployment works!"
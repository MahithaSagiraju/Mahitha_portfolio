#!/usr/bin/env sh
# Deploy script - build frontend then deploy to Firebase Hosting
set -e

# 1. Build the Vite frontend
npm run build

# 2. Deploy to Firebase Hosting
firebase deploy --only hosting

echo "Deployed successfully!"

#!/usr/bin/env bash

# Audit fix §1.4: Unified Frontend Build & SEO Prerendering CI/CD
# This script ensures that every deployment generates fresh static HTML
# snapshots for the marketing pages.

echo "--- Installing dependencies ---"
npm install

echo "--- Building Frontend & Prerendering Routes ---"
# Note: This will trigger vite-plugin-prerender as configured in vite.config.js
npm run build

echo "--- Build Complete ---"

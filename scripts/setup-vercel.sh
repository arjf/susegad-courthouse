#!/usr/bin/env bash
set -euo pipefail

echo "=== Vercel Project Setup ==="
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "ERROR: VERCEL_TOKEN is not set."
  echo "  Generate one at https://vercel.com/account/tokens"
  echo "  Then run: VERCEL_TOKEN=your_token bash scripts/setup-vercel.sh"
  exit 1
fi

echo "Linking project to Vercel..."
npx vercel link --yes --token "$VERCEL_TOKEN" --project susegad-courthouse

echo ""
echo "Fetching Vercel project and org IDs..."
VERCEL_ORG_ID=$(npx vercel whoami --token "$VERCEL_TOKEN" 2>/dev/null || npx vercel org ls --token "$VERCEL_TOKEN" 2>/dev/null)
VERCEL_PROJECT_ID=$(cat .vercel/project.json 2>/dev/null | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)

if [ -n "$VERCEL_PROJECT_ID" ]; then
  echo "Project ID: $VERCEL_PROJECT_ID"

  echo ""
  echo "Setting GitHub secrets..."
  gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN" --repo arjf/susegad-courthouse
  gh secret set VERCEL_PROJECT_ID --body "$VERCEL_PROJECT_ID" --repo arjf/susegad-courthouse

  ORG_ID=$(npx vercel org ls --token "$VERCEL_TOKEN" 2>/dev/null | head -2 | tail -1 | awk '{print $1}')
  if [ -n "$ORG_ID" ]; then
    gh secret set VERCEL_ORG_ID --body "$ORG_ID" --repo arjf/susegad-courthouse
  fi

  echo ""
  echo "Done! Secrets set in GitHub repository."
  echo "The next push to main will trigger automatic Vercel deployment."
else
  echo "Could not read project ID from .vercel/project.json"
  echo "Run 'npx vercel link' manually and then re-run this script."
fi

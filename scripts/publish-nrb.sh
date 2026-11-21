#!/usr/bin/env bash
set -euo pipefail

# 9-Gate Post-Freeze NRB Publisher (refuses to run on main)
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" = "main" ]; then
  echo "ABORT: Do not run publish-nrb.sh directly on main. Use a feature branch."
  exit 1
fi

EN_FILE="${1:-}"
BN_FILE="${2:-}"
if [ -z "$EN_FILE" ] || [ -z "$BN_FILE" ]; then
  echo "Usage: bash scripts/publish-nrb.sh <en-post.json> <bn-post.json>"
  echo "Next queued topic in scripts/queue/topics.json:"
  node -e 'const q=require("./scripts/queue/topics.json"); const next=q.find(t=>!t.published); console.log(next || "Queue complete");'
  exit 1
fi

echo "Gate 1-2: Validating EN & BN post structure and statute citations..."
node scripts/qa/validate.mjs "$EN_FILE" en
node scripts/qa/validate.mjs "$BN_FILE" bn

echo "Gate 3-4: Running semantic duplicate check (cosine < 0.80)..."
node scripts/qa/dupcheck.mjs --file "$EN_FILE"
node scripts/qa/dupcheck.mjs --file "$BN_FILE"

echo "Gate 5-6: Building and prerendering full site..."
npm run build

echo "Gate 7: Running SEO, Schema, and Hreflang CI lint..."
node scripts/ci-seo-lint.mjs
node scripts/ci-schema-lint.mjs
node scripts/phase3-hreflang-verify.mjs

echo "Gate 8-9: Logging publish verification to scripts/queue/publish-log.jsonl..."
node -e '
const fs = require("fs");
const en = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const bn = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const entry = { ts: new Date().toISOString(), enSlug: en.slug, bnSlug: bn.slug, branch: process.argv[3], status: "VERIFIED_ON_BRANCH" };
fs.appendFileSync("scripts/queue/publish-log.jsonl", JSON.stringify(entry) + "\n");
console.log("Logged:", entry);
' "$EN_FILE" "$BN_FILE" "$BRANCH"

echo "SUCCESS: Both EN and BN posts passed all gates on branch $BRANCH. Open a PR; do NOT merge to main without review."

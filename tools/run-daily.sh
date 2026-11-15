#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="online"
LIMIT=5
OUT_FILE="baseline/daily-topic-shortlist.json"

for arg in "$@"; do
  case "$arg" in
    --offline) MODE="offline" ;;
    --limit=*) LIMIT="${arg#*=}" ;;
    --out=*) OUT_FILE="${arg#*=}" ;;
  esac
done

echo "▶ [1/3] Running TopicPulse research ($MODE, ceiling=$LIMIT per language)..."
if [ "$MODE" = "offline" ]; then
  python3 tools/topicpulse.py --lang both --limit "$LIMIT" --offline --out "$OUT_FILE"
else
  python3 tools/topicpulse.py --lang both --limit "$LIMIT" --out "$OUT_FILE"
fi

echo "▶ [2/3] Auditing existing post corpus with deterministic validator..."
python3 tools/validate.py --audit-corpus

echo "▶ [3/3] Checking weekly SEO/GA4/AdSense scorecard..."
node scripts/weekly-scorecard.mjs >/dev/null && echo "✓ Weekly scorecard generated cleanly"

echo ""
echo "✅ Daily content pipeline ready. Shortlist saved to: $OUT_FILE"
echo "Before committing any new post JSON, run:"
echo "  python3 tools/dupcheck.py --file <post.json> && python3 tools/validate.py --file <post.json>"
echo "After publishing on main, notify search engines with: npm run indexnow"

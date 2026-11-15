# Rollback Plan — Autonomous Remediation (`feat/autonomous-remediation`)

## 1. Baseline & Release History (`main`)
- **Pre-Remediation Baseline SHA:** `0616689f4c5ead569f5624b4bfe2cc1a19f6c714`
- **Previous Production GitHub Deployment ID:** `7796775525` (`sha: e9cd8cdb2e4e39cac8c0a397f6bf67d895413bd7`)
- **Phase 4 Release (AdSense Cap + BN Font CLS):** `7247737` (Vercel Production Deployment `7799926157`)
- **Phase 5 Release (CSS Externalization + Post-Scroll AdSense):** `e06fc7d` (Vercel Production Deployment `7800184562`)
- **Phases 6–7 Release (Content Gates, NRB Revenue Tiers, CTA Attribution, CI Workflows):** `7f217352a508aa2ce84536fa4ee75be217677323` (Vercel Production Deployment `7800438919`)

## 2. Git Rollback (Code + Trigger Vercel Auto-Deploy)
If any release commit introduces a regression in live verification:
```bash
git checkout main
git pull origin main
git revert --no-edit <RELEASE_COMMIT_SHA>
git push origin main
```
Or, to hard-reset `main` back to the pre-remediation baseline (emergency only):
```bash
git checkout main
git pull origin main
git reset --hard 0616689f4c5ead569f5624b4bfe2cc1a19f6c714
git push --force-with-lease origin main
```

## 3. Vercel Instant Rollback
1. Open **Vercel Dashboard → Project `Adv-Shah-Alam` → Deployments**.
2. Locate the last verified healthy deployment (`7800438919` / `7800184562` / `7799926157`, or baseline `7796775525`).
3. Click **`...` → Promote to Production** (or via Vercel CLI: `vercel promote <DEPLOYMENT_URL>`).

## 4. Verification After Rollback
```bash
curl -sI https://www.advmdshahalam.me/ | head -n 5
node scripts/ci-seo-lint.mjs
node scripts/ci-schema-lint.mjs
node scripts/phase3-hreflang-verify.mjs
node scripts/phase1-verify.mjs
node scripts/ci-render-parity.mjs --base https://www.advmdshahalam.me --chunk 1/4
```

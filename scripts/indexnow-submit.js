// IndexNow Bulk Submission Script for advmdshahalam.me
// Run this in browser console OR as a Node.js script after deployment.
// Bing IndexNow API: https://www.bing.com/indexnow
// Your IndexNow key must match the file at: https://www.advmdshahalam.me/<YOUR_KEY>.txt

const API_KEY = "b88cb6f2bcc144ba92303e49cd3b7970"; // ← existing key found in /public/
const HOST    = "www.advmdshahalam.me";
const KEY_URL = `https://${HOST}/${API_KEY}.txt`;

const TOP_PRIORITY_URLS = [
  // Service pages (highest commercial intent)
  `https://${HOST}/services/divorce-lawyer`,
  `https://${HOST}/services/criminal-lawyer`,
  `https://${HOST}/services/bail-lawyer`,
  `https://${HOST}/services/land-lawyer`,
  `https://${HOST}/services/supreme-court-lawyer`,

  // Priority blog posts (new + recently optimized)
  `https://${HOST}/blog/divorce-procedure-bangladesh`,
  `https://${HOST}/blog/bail-process-bangladesh`,
  `https://${HOST}/blog/mutation-process-bangladesh`,
  `https://${HOST}/blog/land-law-bangladesh-complete-guide`,
  `https://${HOST}/blog/bail-refusal-appeal-bangladesh`,
  `https://${HOST}/blog/cheque-bounce-case-defend-bangladesh`,
  `https://${HOST}/blog/divorce-alimony-maintenance-wife-bangladesh`,
  `https://${HOST}/blog/how-to-stop-false-criminal-case-bangladesh`,
  `https://${HOST}/blog/anticipatory-bail-bangladesh`,
  `https://${HOST}/blog/child-custody-law-bangladesh`,
];

const SECONDARY_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/advocate-md-shah-alam`,
  `https://${HOST}/blog/domestic-violence-law-bangladesh`,
  `https://${HOST}/blog/court-marriage-procedure-bangladesh`,
  `https://${HOST}/blog/inheritance-law-bangladesh-legal-guide`,
  `https://${HOST}/blog/land-dispute-legal-remedies-bangladesh`,
  `https://${HOST}/blog/how-to-register-land-bangladesh`,
  `https://${HOST}/blog/flat-apartment-purchase-legal-checklist-bangladesh`,
  `https://${HOST}/blog/cheque-dishonour-case-law-bangladesh`,
  `https://${HOST}/blog/writ-petition-high-court-bangladesh`,
  `https://${HOST}/blog/cyber-crime-digital-security-act-bangladesh`,
  `https://${HOST}/blog/narcotics-case-law-bangladesh`,
  `https://${HOST}/blog/wife-rights-after-divorce-bangladesh`,
  `https://${HOST}/blog/nrb-overseas-divorce-bangladesh`,
  `https://${HOST}/blog/criminal-appeal-procedure-bangladesh`,
  `https://${HOST}/blog/arrest-without-warrant-bangladesh`,
  `https://${HOST}/blog/police-remand-rights-bangladesh`,
];

async function submitIndexNow(urls, label = "batch") {
  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_URL,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URLs to Bing IndexNow [${label}]...`);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const status = response.status;
  const text = await response.text().catch(() => "");

  if (status === 200) {
    console.log(`✅ [${label}] Success: ${status}`);
  } else if (status === 202) {
    console.log(`✅ [${label}] Accepted (queued): ${status}`);
  } else {
    console.error(`❌ [${label}] Error ${status}: ${text}`);
  }

  return status;
}

// EXECUTE — stagger with 2s delay to avoid rate limiting
(async () => {
  await submitIndexNow(TOP_PRIORITY_URLS, "priority-tier");
  await new Promise(r => setTimeout(r, 2000));
  await submitIndexNow(SECONDARY_URLS, "secondary-tier");
  console.log("\n🎯 IndexNow submission complete. Bing typically indexes within 24–48 hours.");
  console.log("🔗 Verify at: https://www.bing.com/webmasters → URL Inspection");
})();

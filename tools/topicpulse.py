#!/usr/bin/env python3
"""
topicpulse.py — Researches trending Bangladesh legal & NRB queries via Google Trends Daily RSS,
Google Suggest autocomplete expansions, and GSC query gaps, then filters against the live corpus
so duplicate or cannibalizing topics never enter the shortlist.
Pure Python 3 stdlib.
"""
import argparse
import csv
import glob
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EN_DIR = os.path.join(ROOT, "src", "content", "posts", "en")
BN_DIR = os.path.join(ROOT, "src", "content", "posts", "bn")
GSC_CSV = os.path.join(ROOT, "baseline", "gsc-queries.csv")

LEGAL_SEEDS = {
    "en": [
        "bangladesh high court writ petition procedure",
        "section 138 ni act cheque dishonour appeal bail",
        "power of attorney bangladesh embassy attestation",
        "dhaka judge court land partition suit timeline",
        "nrb inheritance property claim bangladesh",
        "company incorporation rjsc bangladesh fees",
        "cyber security act bangladesh complaint process",
        "family court maintenance child custody bangladesh",
    ],
    "bn": [
        "জমি দখল ও বাটোয়ারা মামলা বাংলাদেশ",
        "হাইকোর্টে আগাম জামিন ৪৯৮ ধারা",
        "চেক ডিজঅনার ১৩৮ ধারা আপিল ও জামিন",
        "প্রবাসী পাওয়ার অব অ্যাটর্নি সত্যায়ন",
        "নামজারি খতিয়ান সংশোধন আবেদন নিয়ম",
        "তালাক ও দেনমোহর আদায় পারিবারিক আদালত",
        "সাইবার নিরাপত্তা আইন অভিযোগ প্রক্রিয়া",
        "ওয়ারিশ সনদ ও উত্তরাধিকার বন্টন আইন",
    ],
}

LEGAL_FILTER_RE = re.compile(
    r"(law|legal|court|bail|divorce|land|property|tax|company|nrb|passport|writ|deed|khatian|cheque|custody|affidavit|"
    r"আইন|আদালত|জামিন|তালাক|জমি|সম্পত্তি|মামলা|দলি[লল]|খতিয়ান|নামজারি|চেক|হাইকোর্ট|ওয়ারিশ|পাওয়ার|পাসপোর্ট|কোর্ট)",
    re.I,
)


def tokenize(s: str) -> set[str]:
    clean = re.sub(r"[-_/,.:;()\"'?!\[\]{}।|—–]", " ", (s or "").lower())
    return {t for t in clean.split() if len(t) >= 2}


def fetch_url(url: str, timeout: int = 4) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; TopicPulse/1.0)"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def fetch_google_trends(geo: str = "BD") -> list[dict]:
    items = []
    try:
        xml_txt = fetch_url(f"https://trends.google.com/trending/rss?geo={urllib.parse.quote(geo)}", timeout=4)
        root = ET.fromstring(xml_txt)
        for item in root.findall(".//item"):
            title = (item.findtext("title") or "").strip()
            traffic = (item.findtext("{https://trends.google.com/trending/rss}approx_traffic") or "").strip()
            if title and LEGAL_FILTER_RE.search(title):
                items.append({"topic": title, "source": "google_trends_rss", "signal": traffic or "trending"})
    except Exception:
        pass
    return items


def fetch_google_suggest(seed: str, hl: str = "en") -> list[str]:
    try:
        url = (
            "https://suggestqueries.google.com/complete/search?"
            + urllib.parse.urlencode({"client": "firefox", "hl": hl, "gl": "bd", "q": seed})
        )
        data = json.loads(fetch_url(url, timeout=4))
        if isinstance(data, list) and len(data) > 1 and isinstance(data[1], list):
            return [str(x).strip() for x in data[1] if isinstance(x, str) and x.strip()]
    except Exception:
        pass
    return []


def load_existing_titles(lang: str) -> list[dict]:
    d = BN_DIR if lang == "bn" else EN_DIR
    out = []
    for fp in sorted(glob.glob(os.path.join(d, "*.json"))):
        with open(fp, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
        slug = (data.get("slug") or "").strip()
        if not slug or data.get("isDraft") or data.get("_draft"):
            continue
        title = (data.get("title") or "").strip()
        out.append({"slug": slug, "title": title, "tokens": tokenize(f"{slug} {title}")})
    return out


def load_gsc_opportunities(lang: str) -> list[dict]:
    rows = []
    if not os.path.exists(GSC_CSV):
        return rows
    with open(GSC_CSV, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for r in reader:
            q = (r.get("query") or "").strip()
            if not q or not LEGAL_FILTER_RE.search(q):
                continue
            is_bn_q = bool(re.search(r"[\u0980-\u09FF]", q))
            if (lang == "bn") != is_bn_q:
                continue
            imp = int(float(r.get("impressions") or 0))
            pos = float(r.get("position") or 0)
            if imp >= 50:
                rows.append({"topic": q, "source": "gsc_opportunity", "impressions": imp, "position": pos})
    rows.sort(key=lambda x: x["impressions"], reverse=True)
    return rows[:40]


def max_similarity(topic: str, corpus: list[dict]) -> tuple[float, float, str]:
    toks = tokenize(topic)
    if not toks:
        return 0.0, 0.0, ""
    best_j, best_cov, best_slug = 0.0, 0.0, ""
    for item in corpus:
        inter = len(toks & item["tokens"])
        union = len(toks | item["tokens"])
        j = (inter / union) if union else 0.0
        cov = inter / len(toks)
        score = max(j, cov)
        if score > max(best_j, best_cov):
            best_j, best_cov, best_slug = j, cov, item["slug"]
    return round(best_j, 4), round(best_cov, 4), best_slug


def build_shortlist(lang: str, limit: int, offline: bool = False) -> dict:
    corpus = load_existing_titles(lang)
    candidates: dict[str, dict] = {}

    def add_cand(topic: str, source: str, base_score: float, meta: dict | None = None):
        key = re.sub(r"\s+", " ", topic.strip().lower())
        if not key or len(key) < 6:
            return
        cur = candidates.get(key)
        if not cur or base_score > cur["raw_score"]:
            candidates[key] = {"topic": topic.strip(), "source": source, "raw_score": base_score, **(meta or {})}

    if not offline:
        for t in fetch_google_trends("BD"):
            add_cand(t["topic"], t["source"], 95.0, {"signal": t["signal"]})
        hl = "bn" if lang == "bn" else "en"
        for seed in LEGAL_SEEDS[lang][:4]:
            for sug in fetch_google_suggest(seed, hl=hl)[:6]:
                if LEGAL_FILTER_RE.search(sug):
                    add_cand(sug, "google_suggest", 82.0)

    for g in load_gsc_opportunities(lang):
        add_cand(
            g["topic"],
            g["source"],
            70.0 + min(25.0, g["impressions"] / 25.0),
            {"impressions": g["impressions"], "position": g["position"]},
        )

    for idx, seed in enumerate(LEGAL_SEEDS[lang]):
        add_cand(seed, "curated_seed", 60.0 - idx)

    shortlist = []
    skipped_dups = 0
    for c in candidates.values():
        sim, cov, match_slug = max_similarity(c["topic"], corpus)
        if sim >= 0.48 or cov >= 0.75:
            skipped_dups += 1
            continue
        c["corpus_max_jaccard"] = sim
        c["query_token_coverage"] = cov
        c["closest_existing_slug"] = match_slug
        c["priority_score"] = round(c.pop("raw_score") * (1.0 - 0.35 * sim - 0.25 * cov), 2)
        shortlist.append(c)

    shortlist.sort(key=lambda x: x["priority_score"], reverse=True)
    return {
        "lang": lang,
        "corpus_size": len(corpus),
        "candidates_scanned": len(candidates),
        "filtered_near_duplicates": skipped_dups,
        "shortlist": shortlist[:limit],
    }


def main():
    p = argparse.ArgumentParser(description="Research deduplicated Bangladesh legal topics")
    p.add_argument("--lang", choices=["en", "bn", "both"], default="both")
    p.add_argument("--limit", type=int, default=5)
    p.add_argument("--offline", action="store_true", help="Skip network Trends/Suggest requests")
    p.add_argument("--out", help="Optional output JSON file path")
    args = p.parse_args()

    langs = ["en", "bn"] if args.lang == "both" else [args.lang]
    result = {l: build_shortlist(l, args.limit, offline=args.offline) for l in langs}
    payload = json.dumps(result, ensure_ascii=False, indent=2)
    if args.out:
        os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(payload + "\n")
    print(payload)


if __name__ == "__main__":
    main()

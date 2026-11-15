#!/usr/bin/env python3
"""
Pre-publish deterministic article & corpus validator for advmdshahalam.me.
Checks title length <= 58, description 140-160, 1 H1, direct-answer 40-60 words,
5-8 H2 sections, total word count, FAQ answer lengths 35-70 words, image alt + dimensions,
8-12 internal links, ad caps, locale & canonical alignment.
"""
import argparse
import glob
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EN_DIR = os.path.join(ROOT, "src", "content", "posts", "en")
BN_DIR = os.path.join(ROOT, "src", "content", "posts", "bn")
BASE = "https://www.advmdshahalam.me"


def strip_tags(html: str) -> str:
    txt = re.sub(r"<[^>]+>", " ", html or "")
    txt = txt.replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", txt).strip()


def words(text: str) -> list[str]:
    return [w for w in strip_tags(text).split() if w]


def validate_post(data: dict, lang: str, strict: bool = True) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    slug = (data.get("slug") or "").strip()
    if not slug:
        errors.append("Missing non-empty 'slug'")

    title = (data.get("metaTitle") or data.get("title") or "").strip()
    h1_title = (data.get("title") or "").strip()
    desc = (data.get("metaDescription") or "").strip()

    if not h1_title:
        errors.append("Missing H1 'title'")
    if len(title) == 0 or len(title) > 58:
        errors.append(f"Title length {len(title)} out of bounds (1..58 chars)")

    if not (140 <= len(desc) <= 160):
        msg = f"metaDescription length {len(desc)} outside 140..160 chars"
        (errors if strict else warnings).append(msg)

    qa = data.get("quickAnswer")
    qa_text = ""
    if isinstance(qa, dict):
        qa_text = qa.get("text") or qa.get("answer") or " ".join(str(v) for v in qa.values() if isinstance(v, str))
    elif isinstance(qa, str):
        qa_text = qa
    da_source = qa_text or (data.get("heroIntro") or "")
    da_wc = len(words(da_source))
    if not (40 <= da_wc <= 60):
        msg = f"Direct-answer block word count {da_wc} outside 40..60"
        (errors if strict else warnings).append(msg)

    sections = data.get("sections") or []
    h2_count = len(sections)
    if not (5 <= h2_count <= 8):
        msg = f"H2 section count {h2_count} outside 5..8"
        (errors if strict else warnings).append(msg)

    body_parts = [h1_title, data.get("heroIntro") or "", qa_text]
    for s in sections:
        h = s.get("h2") or s.get("heading") or ""
        c = s.get("content") or ""
        body_parts.extend([h, c])

    faqs = data.get("faqs") or []
    faq_invalid = []
    for idx, f in enumerate(faqs, 1):
        fq = f.get("question") or f.get("q") or ""
        fa = f.get("answer") or f.get("a") or ""
        body_parts.extend([fq, fa])
        fw = len(words(fa))
        if not (35 <= fw <= 70):
            faq_invalid.append((idx, fw))
    if faq_invalid:
        msg = f"FAQ answer word counts outside 35..70: {faq_invalid}"
        (errors if strict else warnings).append(msg)

    total_wc = len(words(" ".join(body_parts)))
    min_wc = 900 if lang == "en" else 800
    if total_wc < min_wc:
        msg = f"Total word count {total_wc} < {min_wc}"
        (errors if strict else warnings).append(msg)

    raw_sections_html = " ".join((s.get("content") or "") for s in sections) + " " + (data.get("heroIntro") or "")
    if re.search(r"<h1\b", raw_sections_html, re.I):
        errors.append("Unexpected <h1> found inside body HTML sections")

    body_links = re.findall(r'<a\b[^>]*href=["\'](/[^"\']*)["\']', raw_sections_html, re.I)
    rel_services = data.get("relatedServiceLinks") or []
    rel_posts = data.get("relatedPosts") or []
    total_internal = len(body_links) + len(rel_services) + len(rel_posts)
    if not (8 <= total_internal <= 12):
        msg = f"Internal links count {total_internal} (body={len(body_links)}, services={len(rel_services)}, related={len(rel_posts)}) outside 8..12"
        (errors if strict else warnings).append(msg)

    expected_prefix = f"{BASE}/{'bn/blog' if lang == 'bn' else 'blog'}/{slug}"
    canon = (data.get("canonicalUrl") or expected_prefix).strip()
    if canon != expected_prefix:
        errors.append(f"Canonical mismatch: {canon} != {expected_prefix}")

    for m in re.finditer(r"<img\b([^>]*)>", raw_sections_html, re.I):
        attrs = m.group(1)
        if not re.search(r'\balt=["\'][^"\']+["\']', attrs, re.I):
            errors.append("Inline <img> missing non-empty alt attribute")
        if not (re.search(r'\bwidth=["\']?\d+', attrs, re.I) and re.search(r'\bheight=["\']?\d+', attrs, re.I)):
            msg = "Inline <img> missing explicit width/height attributes"
            (errors if strict else warnings).append(msg)

    ad_cap = 2 if lang == "bn" else 4
    if data.get("adCountOverride") and int(data["adCountOverride"]) > ad_cap:
        errors.append(f"adCountOverride {data['adCountOverride']} exceeds {lang} limit {ad_cap}")

    return errors, warnings


def main():
    p = argparse.ArgumentParser(description="Deterministic legal article validator")
    p.add_argument("--file", help="Path to single candidate post JSON to strictly validate")
    p.add_argument("--lang", choices=["en", "bn"], help="Language override (auto-inferred from path if omitted)")
    p.add_argument("--audit-corpus", action="store_true", help="Audit all existing posts (hard failures exit 1)")
    args = p.parse_args()

    if args.file:
        path = os.path.abspath(args.file)
        lang = args.lang or ("bn" if f"{os.sep}bn{os.sep}" in path or path.endswith("-bn.json") else "en")
        with open(path, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
        errs, warns = validate_post(data, lang=lang, strict=True)
        print(json.dumps({"file": path, "lang": lang, "errors": errs, "warnings": warns, "passed": len(errs) == 0}, ensure_ascii=False, indent=2))
        sys.exit(1 if errs else 0)

    redirect_sources = set()
    vc_path = os.path.join(ROOT, "vercel.json")
    if os.path.exists(vc_path):
        with open(vc_path, "r", encoding="utf-8") as vf:
            vc = json.load(vf)
        for r in vc.get("redirects") or []:
            if not r.get("has") and r.get("source"):
                redirect_sources.add(r["source"])

    hard_fail = 0
    total = 0
    warn_posts = 0
    for lang, d in [("en", EN_DIR), ("bn", BN_DIR)]:
        prefix = "/blog/" if lang == "en" else "/bn/blog/"
        for fp in sorted(glob.glob(os.path.join(d, "*.json"))):
            with open(fp, "r", encoding="utf-8-sig") as f:
                data = json.load(f)
            slug = (data.get("slug") or "").strip()
            if not slug or data.get("isDraft") or data.get("_draft") or (prefix + slug) in redirect_sources:
                continue
            total += 1
            errs, warns = validate_post(data, lang=lang, strict=False)
            if errs:
                hard_fail += 1
                print(f"FAIL [{lang}] {slug}: {errs}")
            elif warns:
                warn_posts += 1
    print(f"VALIDATE AUDIT: checked={total}, hard_failures={hard_fail}, legacy_warnings={warn_posts}")
    sys.exit(1 if hard_fail else 0)


if __name__ == "__main__":
    main()

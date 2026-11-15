#!/usr/bin/env python3
"""
Pre-publish duplicate & cannibalization detector for advmdshahalam.me.
Computes title token overlap + trigram/token TF-IDF cosine similarity against all live EN/BN posts.
Verdict: REJECT (>= 0.80 content cosine OR >= 0.82 title overlap),
         WARN   (0.65..0.80 content cosine OR 0.65..0.82 title overlap),
         PUBLISH (< 0.65).
"""
import argparse
import glob
import json
import math
import os
import re
import sys
from collections import Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
EN_DIR = os.path.join(ROOT, "src", "content", "posts", "en")
BN_DIR = os.path.join(ROOT, "src", "content", "posts", "bn")


def strip_tags(html: str) -> str:
    txt = re.sub(r"<[^>]+>", " ", html or "")
    txt = txt.replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", txt).strip()


def tokenize(text: str) -> list[str]:
    clean = re.sub(r"[-_/,.:;()\"'?!\[\]{}।|—–]", " ", strip_tags(text).lower())
    return [t for t in clean.split() if len(t) >= 2]


def doc_features(text: str) -> Counter:
    toks = tokenize(text)
    counts = Counter(toks)
    for t in toks:
        if len(t) >= 4:
            for i in range(len(t) - 2):
                counts[f"~{t[i:i+3]}"] += 1
    return counts


def post_text(data: dict) -> str:
    parts = [data.get("title") or "", data.get("heroIntro") or ""]
    qa = data.get("quickAnswer")
    if isinstance(qa, dict):
        parts.append(qa.get("text") or qa.get("answer") or "")
    elif isinstance(qa, str):
        parts.append(qa)
    for s in data.get("sections") or []:
        parts.append(s.get("h2") or s.get("heading") or "")
        parts.append(s.get("content") or "")
    for f in data.get("faqs") or []:
        parts.append(f.get("question") or f.get("q") or "")
        parts.append(f.get("answer") or f.get("a") or "")
    return " ".join(parts)


def load_corpus(lang: str, exclude_slug: str = "") -> list[dict]:
    d = BN_DIR if lang == "bn" else EN_DIR
    corpus = []
    for fp in sorted(glob.glob(os.path.join(d, "*.json"))):
        with open(fp, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
        slug = (data.get("slug") or "").strip()
        if not slug or data.get("isDraft") or data.get("_draft") or slug == exclude_slug:
            continue
        corpus.append({
            "slug": slug,
            "title": (data.get("title") or "").strip(),
            "title_tokens": set(tokenize(data.get("title") or "")),
            "tf": doc_features(post_text(data)),
        })
    return corpus


def cosine(vec_a: dict[str, float], norm_a: float, vec_b: dict[str, float], norm_b: float) -> float:
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    if len(vec_a) > len(vec_b):
        vec_a, vec_b = vec_b, vec_a
    dot = sum(v * vec_b[k] for k, v in vec_a.items() if k in vec_b)
    return dot / (norm_a * norm_b)


def check_candidate(candidate_data: dict, lang: str) -> dict:
    cand_slug = (candidate_data.get("slug") or "").strip()
    cand_title = (candidate_data.get("title") or "").strip()
    cand_title_toks = set(tokenize(cand_title))
    cand_tf = doc_features(post_text(candidate_data))

    corpus = load_corpus(lang, exclude_slug=cand_slug)
    n_docs = len(corpus) + 1
    df = Counter()
    for d in corpus:
        for k in d["tf"]:
            df[k] += 1
    for k in cand_tf:
        df[k] += 1

    def to_tfidf(tf: Counter):
        vec = {}
        norm2 = 0.0
        for k, cnt in tf.items():
            w = (1.0 + math.log(cnt)) * (math.log((n_docs + 1.0) / (df[k] + 1.0)) + 1.0)
            vec[k] = w
            norm2 += w * w
        return vec, math.sqrt(norm2)

    c_vec, c_norm = to_tfidf(cand_tf)
    matches = []
    for d in corpus:
        sim = cosine(c_vec, c_norm, *to_tfidf(d["tf"]))
        t_union = cand_title_toks | d["title_tokens"]
        t_jacc = (len(cand_title_toks & d["title_tokens"]) / len(t_union)) if t_union else 0.0
        t_cov = (len(cand_title_toks & d["title_tokens"]) / len(cand_title_toks)) if cand_title_toks else 0.0
        if sim >= 0.45 or t_jacc >= 0.50 or t_cov >= 0.75:
            matches.append({
                "slug": d["slug"],
                "title": d["title"],
                "content_cosine": round(sim, 4),
                "title_jaccard": round(t_jacc, 4),
                "title_coverage": round(t_cov, 4),
            })

    matches.sort(key=lambda x: max(x["content_cosine"], x["title_jaccard"]), reverse=True)
    top_cos = matches[0]["content_cosine"] if matches else 0.0
    top_jac = matches[0]["title_jaccard"] if matches else 0.0

    if top_cos >= 0.80 or top_jac >= 0.82:
        verdict = "REJECT"
    elif top_cos >= 0.65 or top_jac >= 0.65:
        verdict = "WARN"
    else:
        verdict = "PUBLISH"

    return {
        "verdict": verdict,
        "lang": lang,
        "candidate_slug": cand_slug,
        "top_content_cosine": top_cos,
        "top_title_jaccard": top_jac,
        "top_matches": matches[:5],
    }


def main():
    p = argparse.ArgumentParser(description="Pre-publish TF-IDF cosine + title overlap duplicate gate")
    p.add_argument("--file", help="Candidate post JSON file")
    p.add_argument("--title", help="Candidate title string (quick title check)")
    p.add_argument("--lang", choices=["en", "bn"], default="en")
    args = p.parse_args()

    if args.file:
        path = os.path.abspath(args.file)
        lang = args.lang if "--lang" in sys.argv else ("bn" if "/bn/" in path or path.endswith("-bn.json") else "en")
        with open(path, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
        res = check_candidate(data, lang=lang)
    elif args.title:
        res = check_candidate({"slug": "__candidate__", "title": args.title}, lang=args.lang)
    else:
        p.error("Provide either --file or --title")
        return

    print(json.dumps(res, ensure_ascii=False, indent=2))
    sys.exit(2 if res["verdict"] == "REJECT" else 0)


if __name__ == "__main__":
    main()

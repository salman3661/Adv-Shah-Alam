import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open('excel_data.json', encoding='utf-8'))

print("=== 7-DAY TOP QUERIES (by clicks) ===")
q7 = data['FILE2_7days']['Queries'][1:]  # skip header
sorted_q = sorted(q7, key=lambda x: x[1] if x[1] else 0, reverse=True)
for r in sorted_q[:80]:
    print(f"Query: {r[0]} | Clicks: {r[1]} | Impressions: {r[2]} | CTR: {r[3]} | Pos: {r[4]}")

print("\n=== 7-DAY TOP QUERIES (by impressions) ===")
sorted_imp = sorted(q7, key=lambda x: x[2] if x[2] else 0, reverse=True)
for r in sorted_imp[:50]:
    print(f"Query: {r[0]} | Clicks: {r[1]} | Impressions: {r[2]} | CTR: {r[3]} | Pos: {r[4]}")

print("\n=== 7-DAY TOP PAGES (by clicks) ===")
p7 = data['FILE2_7days']['Pages'][1:]
sorted_pages = sorted(p7, key=lambda x: x[1] if x[1] else 0, reverse=True)
for r in sorted_pages[:20]:
    print(f"Page: {r[0]} | Clicks: {r[1]} | Impressions: {r[2]} | CTR: {r[3]} | Pos: {r[4]}")

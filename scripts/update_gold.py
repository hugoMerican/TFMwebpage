import os, json
from datetime import datetime, timezone
import requests

# Where to save inside the repo (relative path)
OUTPUT_JSON = "data/gold.json"

def main():
    api_key = os.getenv("GOLDAPI_KEY")
    if not api_key:
        raise RuntimeError("Missing GOLDAPI_KEY (set in GitHub Actions Secrets)")

    url = "https://www.goldapi.io/api/XAU/MYR"
    headers = {
        "x-access-token": api_key,
        "Accept": "application/json",
        "User-Agent": "TFM-Bullion/1.0",
    }

    r = requests.get(url, headers=headers, timeout=20)
    r.raise_for_status()
    data = r.json()

    # Use "mid" if available, otherwise approximate
    bid = float(data.get("bid", 0) or 0)
    ask = float(data.get("ask", 0) or 0)
    mid = data.get("mid")
    if mid is None and bid and ask:
        mid = (bid + ask) / 2

    out = {
        "metal": "XAU",
        "currency": "MYR",
        "price_oz": data.get("price"),
        "bid_oz": data.get("bid"),
        "ask_oz": data.get("ask"),
        "reference_oz": mid,
        "reference_type": "mid",
        "updated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source": "goldapi.io",
    }

    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"Saved -> {OUTPUT_JSON} | reference_oz={out['reference_oz']}")

if __name__ == "__main__":
    main()

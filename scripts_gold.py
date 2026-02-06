import os
import json
import requests
from datetime import datetime, timezone
from pathlib import Path

API_KEY = os.getenv("GOLDAPI_KEY")
if not API_KEY:
    raise SystemExit("Missing GOLDAPI_KEY env var")

# Your target: XAU in MYR
URL = "https://www.goldapi.io/api/XAU/MYR"

headers = {
    "x-access-token": API_KEY,
    "Content-Type": "application/json",
}

r = requests.get(URL, headers=headers, timeout=30)
r.raise_for_status()
data = r.json()

# Build a stable JSON your frontend expects
payload = {
    "metal": "XAU",
    "currency": "MYR",
    "price_oz": data.get("price"),
    "bid_oz": data.get("bid"),
    "ask_oz": data.get("ask"),
    "reference_oz": data.get("mid") or data.get("price"),
    "reference_type": "mid" if data.get("mid") is not None else "price",
    "reference_g": data.get("price_gram_24k"),
    "reference_kg": (data.get("price_gram_24k") or 0) * 1000 if data.get("price_gram_24k") else None,
    "updated_at_utc": datetime.now(timezone.utc).isoformat(),
    "source": "goldapi.io",
}

out_path = Path("data") / "gold.json"
out_path.parent.mkdir(parents=True, exist_ok=True)

out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
print(f"Saved -> {out_path} | reference_oz={payload['reference_oz']}")

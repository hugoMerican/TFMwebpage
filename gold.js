async function fetchGoldJSON() {
  // cache-bust so you always get the newest file
  const url = "./data/gold.json?ts=" + Date.now();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load gold.json (${res.status})`);
  return res.json();
}

function updateUI(data) {
  const spotEl = document.getElementById("spotPrice");
  const updatedEl = document.getElementById("lastUpdated");

  if (!spotEl) throw new Error('Missing element id="spotPrice" in index.html');
  if (!updatedEl) throw new Error('Missing element id="lastUpdated" in index.html');

  const spot = Number(data.reference_oz);
  spotEl.textContent = Number.isFinite(spot)
    ? `MYR ${spot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "MYR —";

  const ts = data.updated_at_utc || data.updated_at;
  updatedEl.textContent = ts ? new Date(ts).toLocaleString() : "—";
}

async function refreshGold() {
  try {
    const data = await fetchGoldJSON();
    updateUI(data);
    console.log("Gold updated:", data.reference_oz, data.updated_at_utc);
  } catch (err) {
    console.error("Gold update failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // initial load
  refreshGold();

  // auto refresh every 1 minutes
  setInterval(refreshGold, 1 * 60 * 1000);
});

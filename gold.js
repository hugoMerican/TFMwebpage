async function loadGold() {
  const statusEl = document.getElementById("gold-status");

  try {
    if (statusEl) statusEl.textContent = "gold.js running...";

    const res = await fetch("./data/gold.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data = await res.json();

    const spotEl = document.getElementById("spotPrice");
    if (!spotEl) throw new Error("Cannot find #spotPrice in HTML");

    const ref = Number(data.reference_oz);
    if (!Number.isFinite(ref)) throw new Error("reference_oz missing or not a number");

    spotEl.textContent = `MYR ${ref.toFixed(2)}`;

    const lastEl = document.getElementById("lastUpdated");
    if (lastEl && data.updated_at_utc) {
      lastEl.textContent = new Date(data.updated_at_utc).toLocaleString();
    }

    if (statusEl) statusEl.textContent = "OK: updated spotPrice from gold.json";
  } catch (e) {
    console.error(e);
    if (statusEl) statusEl.textContent = `ERROR: ${e.message}`;
  }
}

document.addEventListener("DOMContentLoaded", loadGold);

async function loadGold() {
  const res = await fetch("./data/gold.json?ts=" + Date.now(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load gold.json");
  return res.json();
}

function mustGet(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element id="${id}" in HTML`);
  return el;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await loadGold();

    const spot = Number(data.reference_oz);
    mustGet("spotPrice").textContent =
      isNaN(spot) ? "—" : `MYR ${spot.toFixed(2)}`;

    mustGet("lastUpdated").textContent =
      new Date(data.updated_at_utc).toLocaleString();

  } catch (err) {
    console.error(err);
  }
});

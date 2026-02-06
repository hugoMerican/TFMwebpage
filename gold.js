async function loadGold() {
  const res = await fetch("./data/gold.json", { cache: "no-store" });
  const data = await res.json();

  const spotEl = document.getElementById("spotPrice");
  const updatedEl = document.getElementById("lastUpdated");

  if (!spotEl || !updatedEl) {
    console.error("Missing DOM elements", { spotEl, updatedEl });
    return;
  }

  spotEl.textContent = `MYR ${Number(data.reference_oz).toFixed(2)}`;
  updatedEl.textContent = new Date(data.updated_at_utc).toLocaleString();
}

document.addEventListener("DOMContentLoaded", loadGold);

async function loadGold() {
  const res = await fetch("./data/gold.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load gold.json");
  return res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await loadGold();

    const spotEl = document.getElementById("spotPrice");
    const updatedEl = document.getElementById("lastUpdated");

    if (!spotEl) {
      console.error("spotPrice element not found");
      return;
    }

    spotEl.textContent =
      `MYR ${Number(data.reference_oz).toFixed(2)}`;

    if (updatedEl) {
      updatedEl.textContent =
        new Date(data.updated_at_utc).toLocaleString();
    }

  } catch (err) {
    console.error("Gold load error:", err);
  }
});

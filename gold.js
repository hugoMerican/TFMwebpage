alert("gold.js loaded");

async function loadGold() {
  const res = await fetch("./data/gold.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load gold.json");
  return res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await loadGold();

    // Update price
    document.getElementById("spotPrice").textContent =
      `MYR ${Number(data.reference_oz).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;

    // Update last updated
    document.getElementById("lastUpdated").textContent =
      new Date(data.updated_at_utc).toLocaleString();

  } catch (err) {
    console.error(err);
    document.getElementById("spotPrice").textContent = "—";
  }
});

async function loadGold() {
  const res = await fetch("./data/gold.json", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to load gold.json");
  }

  return res.json();
}

document.addEventListener("DOMContentLoaded", () => {
  loadGold()
    .then(data => {
      // Use correct field from gold.json
      const price = Number(data.reference_oz);

      // Update main spot price
      document.getElementById("spotPrice").textContent =
        isNaN(price) ? "—" : `MYR ${price.toFixed(2)}`;

      // Update last updated time
      document.getElementById("lastUpdated").textContent =
        new Date(data.updated_at_utc).toLocaleString();
    })
    .catch(err => {
      console.error(err);
      document.getElementById("spotPrice").textContent = "Unavailable";
    });
});


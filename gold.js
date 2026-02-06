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
      const price = Number(data.price);

      document.getElementById("gold-price").textContent =
        isNaN(price) ? "—" : `$${price.toFixed(2)}`;

      document.getElementById("gold-updated").textContent =
        `Last updated: ${new Date(data.updated_at).toLocaleString()}`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("gold-price").textContent = "Unavailable";
    });
});

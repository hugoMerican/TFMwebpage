// ---- Exchange rates (replace with API later) ----
const FX_RATES = {
  USD: 1,
  AUD: 1.52,
  MYR: 4.65
};

// ---- Currency symbols ----
const SYMBOLS = {
  USD: "$",
  AUD: "A$",
  MYR: "RM"
};

// ---- Format helper ----
function formatPrice(value, currency) {
  return `${SYMBOLS[currency]} ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// ---- Update all prices on page ----
function updatePrices(currency) {
  const rate = FX_RATES[currency];

  document.querySelectorAll("[data-base-usd]").forEach(el => {
    const baseUSD = parseFloat(el.dataset.baseUsd);
    const converted = baseUSD * rate;
    el.textContent = formatPrice(converted, currency);
  });
}

// ---- Wire up currency selector ----
const currencySelect = document.getElementById("currencySelect");

currencySelect.addEventListener("change", e => {
  updatePrices(e.target.value);
});

// ---- Init on page load ----
updatePrices(currencySelect.value);

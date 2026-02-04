const FX_RATES = {
  USD: 1,
  AUD: 1.52,
  MYR: 4.65
};

const SYMBOLS = {
  USD: "$",
  AUD: "A$",
  MYR: "RM"
};

function formatPrice(amount, currency) {
  return `${SYMBOLS[currency]} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function updateSpotPrice(currency) {
  const el = document.getElementById("spotPrice");

  // Read base USD price from HTML
  const baseUSD = parseFloat(el.dataset.baseUsd);

  // Convert
  const converted = baseUSD * FX_RATES[currency];

  // Replace text content
  el.textContent = formatPrice(converted, currency);
}

// Currency dropdown
const currencySelect = document.getElementById("currencySelect");

currencySelect.addEventListener("change", e => {
  updateSpotPrice(e.target.value);
});

// Init on page load
updateSpotPrice(currencySelect.value);

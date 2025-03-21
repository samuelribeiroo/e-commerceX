function normalizeString(description: string) {
  const divider = " | ";

  return description.split(divider).filter((part) => part.trim() !== "");
}

function formatCurrencyBRL(price: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(+price);
}

function handlePriceChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setFn: (value: string) => void
) {
  const value = event.target.value;

  if (value === "" || /^(\d+\.?\d*|\.\d+)$/.test(value)) {
    setFn(value);
  }
}

function generateRandomNumber(range: number) {
  return Math.floor(Math.random() * range)
}



export { normalizeString, formatCurrencyBRL, handlePriceChange, generateRandomNumber };

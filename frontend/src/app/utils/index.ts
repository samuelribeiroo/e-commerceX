function normalizeString(description: string) {
  const divider = ' | '

  return description
  .split(divider)
  .filter(part => part.trim() !== '')
}

function formatCurrencyBRL(price: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(+price);
}

export { normalizeString, formatCurrencyBRL }

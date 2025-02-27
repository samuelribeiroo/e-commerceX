
export default function normalizeString(description: string) {
  const divider = ' | '

  return description
  .split(divider)
  .filter(part => part.trim() !== '')
}
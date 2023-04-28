export function getCurrentDate() {
  const now = new Date()
  return new Intl.DateTimeFormat('pt-BR').format(now)
}

export function getCurrentTime() {
  const now = new Date()
  return new Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short',
  }).format(now)
}

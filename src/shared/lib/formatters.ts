const rubleFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return rubleFormatter.format(amount);
}

export function formatDuration(hours: number): string {
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return `${mins} мин.`;
  }
  return `${hours} ч.`;
}

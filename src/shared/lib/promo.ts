export interface PromoDiscount {
  discountPercent?: number;
  discountAmount?: number;
}

export function applyPromo(basePrice: number, promo: PromoDiscount | null): number {
  if (!promo) return basePrice;
  if (promo.discountPercent) {
    return Math.round(basePrice * (1 - promo.discountPercent / 100));
  }
  if (promo.discountAmount) {
    return Math.max(100, basePrice - promo.discountAmount);
  }
  return basePrice;
}

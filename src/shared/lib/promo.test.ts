import { describe, it, expect } from 'vitest';
import { applyPromo } from './promo';

describe('applyPromo', () => {
  it('возвращает исходную цену без промокода', () => {
    expect(applyPromo(10000, null)).toBe(10000);
  });

  it('применяет процентную скидку корректно', () => {
    expect(applyPromo(10000, { discountPercent: 10 })).toBe(9000);
    expect(applyPromo(34900, { discountPercent: 10 })).toBe(31410);
  });

  it('применяет фиксированную скидку в рублях', () => {
    expect(applyPromo(10000, { discountAmount: 2000 })).toBe(8000);
  });

  it('не позволяет цене упасть ниже минимального порога 100 ₽', () => {
    expect(applyPromo(1500, { discountAmount: 2000 })).toBe(100);
  });
});

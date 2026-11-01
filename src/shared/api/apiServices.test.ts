// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest';
import { paymentGateway } from './paymentGateway';
import { authService } from './authService';

describe('PaymentGateway & AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('paymentGateway', () => {
    it('валидирует промокод DEV20 (скидка 20%)', async () => {
      const res = await paymentGateway.validatePromo('DEV20');
      expect(res.valid).toBe(true);
      expect(res.discountPercent).toBe(20);
    });

    it('валидирует промокод PROMO10 (скидка 10%) и DEV2000 (скидка 2000 ₽)', async () => {
      const promo10 = await paymentGateway.validatePromo('PROMO10');
      expect(promo10.valid).toBe(true);
      expect(promo10.discountPercent).toBe(10);

      const dev2000 = await paymentGateway.validatePromo('DEV2000');
      expect(dev2000.valid).toBe(true);
      expect(dev2000.discountAmount).toBe(2000);
    });

    it('отклоняет некорректный промокод', async () => {
      const invalid = await paymentGateway.validatePromo('UNKNOWN_PROMO');
      expect(invalid.valid).toBe(false);
    });

    it('отклоняет платеж при наличии fail в email', async () => {
      const res = await paymentGateway.processPayment({
        productId: 'prod-1',
        fullName: 'Тестовый Пользователь',
        email: 'fail@example.com',
        phone: '+7 999 111-22-33',
        paymentMethod: 'card',
        agreedToTerms: true,
      });

      expect(res.success).toBe(false);
    });

    it('успешно оформляет заказ и сохраняет в localStorage', async () => {
      const res = await paymentGateway.processPayment({
        productId: 'prod-1',
        fullName: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+7 999 111-22-33',
        paymentMethod: 'card',
        agreedToTerms: true,
        promoCode: 'DEV20',
      });

      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.order.productTitle).toBe('Архитектура React & TypeScript приложений');
        expect(res.order.totalAmount).toBe(27920); // 34900 - 20%
      }

      const ordersRaw = localStorage.getItem('course_showcase_orders');
      expect(ordersRaw).not.toBeNull();
      const orders = JSON.parse(ordersRaw!);
      expect(orders.length).toBe(1);
    });
  });

  describe('authService', () => {
    it('возвращает демо-заказ для аккаунта student@example.com', async () => {
      await authService.login('student@example.com', 'Алексей Смирнов');
      const orders = await authService.getUserOrders();
      expect(orders.length).toBe(1);
      expect(orders[0]?.buyer.email).toBe('student@example.com');
    });

    it('возвращает пустой список заказов для нового пользователя', async () => {
      await authService.login('newuser@example.com', 'Новый Пользователь');
      const orders = await authService.getUserOrders();
      expect(orders).toEqual([]);
    });
  });
});

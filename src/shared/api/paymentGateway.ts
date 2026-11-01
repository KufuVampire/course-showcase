import { CheckoutPayload, Order } from './types';
import { catalogApi } from './catalogApi';

export interface PaymentSuccess {
  success: true;
  order: Order;
}

export interface PaymentFailure {
  success: false;
  error: string;
}

export type PaymentResult = PaymentSuccess | PaymentFailure;

export interface PaymentGateway {
  processPayment(payload: CheckoutPayload): Promise<PaymentResult>;
  validatePromo(code: string): Promise<{ valid: boolean; discountPercent?: number; discountAmount?: number }>;
}

export class MockPaymentGateway implements PaymentGateway {
  private delayMs: number;

  constructor(delayMs = 900) {
    this.delayMs = delayMs;
  }

  async validatePromo(code: string) {
    await new Promise((r) => setTimeout(r, 200));
    const upper = code.trim().toUpperCase();
    if (upper === 'PROMO10' || upper === 'FRONTEND') {
      return { valid: true, discountPercent: 10 };
    }
    if (upper === 'DEV2000') {
      return { valid: true, discountAmount: 2000 };
    }
    return { valid: false };
  }

  async processPayment(payload: CheckoutPayload): Promise<PaymentResult> {
    await new Promise((r) => setTimeout(r, this.delayMs));

    // Support intentional failure for testing UI error state
    if (payload.email.toLowerCase().includes('fail') || payload.fullName.toLowerCase().includes('ошибка')) {
      return {
        success: false,
        error: 'Банк отклонил транзакцию. Проверьте реквизиты или попробуйте другой способ оплаты.',
      };
    }

    const product = await catalogApi.getProductById(payload.productId);
    if (!product) {
      return {
        success: false,
        error: 'Выбранный продукт больше недоступен.',
      };
    }

    let finalAmount = product.price;
    if (payload.promoCode) {
      const promo = await this.validatePromo(payload.promoCode);
      if (promo.valid) {
        if (promo.discountPercent) {
          finalAmount = Math.round(finalAmount * (1 - promo.discountPercent / 100));
        } else if (promo.discountAmount) {
          finalAmount = Math.max(100, finalAmount - promo.discountAmount);
        }
      }
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const order: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `ED-${new Date().getFullYear()}-${randomSuffix}`,
      productId: product.id,
      productTitle: product.title,
      productType: product.type,
      totalAmount: finalAmount,
      buyer: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
      },
      paymentMethod: payload.paymentMethod,
      status: 'paid',
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for mock persistence in Account
    try {
      const existingRaw = localStorage.getItem('course_showcase_orders') || '[]';
      const orders = JSON.parse(existingRaw) as Order[];
      orders.unshift(order);
      localStorage.setItem('course_showcase_orders', JSON.stringify(orders));
    } catch {
      // localStorage may fail in private mode
    }

    return {
      success: true,
      order,
    };
  }
}

export const paymentGateway: PaymentGateway = new MockPaymentGateway();

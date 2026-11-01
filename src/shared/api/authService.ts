import type { Order, User } from './types';

export interface AuthService {
  getCurrentUser(): Promise<User | null>;
  login(email: string, name?: string): Promise<User>;
  logout(): Promise<void>;
  getUserOrders(): Promise<Order[]>;
}

const USER_STORAGE_KEY = 'course_showcase_user';

export class MockAuthService implements AuthService {
  private delayMs: number;

  constructor(delayMs = 250) {
    this.delayMs = delayMs;
  }

  async getCurrentUser(): Promise<User | null> {
    await new Promise((r) => setTimeout(r, this.delayMs));
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
      }
    } catch {
      // fallback
    }
    return null;
  }

  async login(email: string, name?: string): Promise<User> {
    await new Promise((r) => setTimeout(r, this.delayMs));
    const user: User = {
      id: `usr_${Date.now()}`,
      email,
      fullName: name || email.split('@')[0] || 'Студент',
      purchasedProductIds: ['prod-1'], // default access to first course for demo
    };
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
    return user;
  }

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 150));
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  async getUserOrders(): Promise<Order[]> {
    await new Promise((r) => setTimeout(r, this.delayMs));
    const user = await this.getCurrentUser();
    if (!user) return [];

    try {
      const existingRaw = localStorage.getItem('course_showcase_orders') || '[]';
      const orders = JSON.parse(existingRaw) as Order[];
      const userOrders = orders.filter((o) => o.buyer.email === user.email);
      if (userOrders.length > 0) return userOrders;
    } catch {
      // fallback
    }

    // Default mock initial purchase for default demo account only
    if (user.email === 'student@example.com') {
      return [
        {
          id: 'ord_demo_init',
          orderNumber: 'ED-2026-9012',
          productId: 'prod-1',
          productTitle: 'Архитектура React & TypeScript приложений',
          productType: 'course',
          totalAmount: 34900,
          buyer: {
            fullName: user.fullName || 'Алексей Смирнов',
            email: 'student@example.com',
            phone: '+7 (999) 000-00-00',
          },
          paymentMethod: 'card',
          status: 'paid',
          paidAt: '2026-02-01T14:20:00Z',
          createdAt: '2026-02-01T14:15:00Z',
        },
      ];
    }

    return [];
  }
}

export const authService: AuthService = new MockAuthService();

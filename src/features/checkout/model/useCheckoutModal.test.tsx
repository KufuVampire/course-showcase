// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { Product, User } from '@/shared/api';
import { AuthProvider } from '@/app/AuthContext';
import { useCheckoutModal } from './useCheckoutModal';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const mockProduct: Product = {
  id: 'prod-test',
  slug: 'test-course',
  type: 'course',
  title: 'Тестовый курс',
  subtitle: 'Описание тестового курса',
  description: 'Подробное описание курса',
  price: 10000,
  durationHours: 20,
  level: 'beginner',
  instructor: { name: 'Инструктор', role: 'Staff' },
  tags: ['react'],
  features: ['практика'],
  rating: 4.9,
  reviewsCount: 15,
  createdAt: '2026-01-01',
};

describe('useCheckoutModal hook', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    localStorage.clear();
    const mockUser: User = {
      id: 'usr_test',
      fullName: 'Тестовый Студент',
      email: 'student@example.com',
      purchasedProductIds: [],
    };
    localStorage.setItem('course_showcase_user', JSON.stringify(mockUser));

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('автоматически предзаполняет контакты авторизованного пользователя', async () => {
    let hookResult!: ReturnType<typeof useCheckoutModal>;

    function TestComponent() {
      hookResult = useCheckoutModal(mockProduct);
      return <div>{hookResult.email}</div>;
    }

    act(() => {
      root.render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    // Wait for AuthProvider initialization (authService has 250ms delay)
    await act(async () => {
      await new Promise((r) => setTimeout(r, 350));
    });

    expect(hookResult.fullName).toBe('Тестовый Студент');
    expect(hookResult.email).toBe('student@example.com');
  });

  it('применяет промокод DEV20 со скидкой 20%', async () => {
    let hookResult!: ReturnType<typeof useCheckoutModal>;

    function TestComponent() {
      hookResult = useCheckoutModal(mockProduct);
      return <div>Total: {hookResult.currentTotal}</div>;
    }

    act(() => {
      root.render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(hookResult.currentTotal).toBe(10000);

    act(() => {
      hookResult.setPromoCode('DEV20');
    });

    await act(async () => {
      await hookResult.handleApplyPromo();
    });

    expect(hookResult.promoApplied?.discountPercent).toBe(20);
    expect(hookResult.currentTotal).toBe(8000);
  });

  it('валидирует обязательные поля формы и блокирует отправку при ошибках', async () => {
    let hookResult!: ReturnType<typeof useCheckoutModal>;

    function TestComponent() {
      hookResult = useCheckoutModal(mockProduct);
      return <div>step: {hookResult.step}</div>;
    }

    act(() => {
      root.render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Clear required fields
    act(() => {
      hookResult.setFullName('');
      hookResult.setEmail('invalid-email');
      hookResult.setPhone('');
      hookResult.setAgreed(false);
    });

    const preventDefault = vi.fn();
    await act(async () => {
      await hookResult.handleSubmit({ preventDefault } as unknown as React.FormEvent);
    });

    expect(hookResult.errors.fullName).toBeTruthy();
    expect(hookResult.errors.email).toBeTruthy();
    expect(hookResult.errors.phone).toBeTruthy();
    expect(hookResult.errors.agreed).toBeTruthy();
    expect(hookResult.step).toBe('form');
  });
});

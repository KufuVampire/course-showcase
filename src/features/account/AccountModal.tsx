import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Receipt,
  LogOut,
  PlayCircle,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { useAuth } from './useAuth';
import { formatPrice } from '@/shared/lib/formatters';
import { Badge, Button, Field, Modal } from '@/shared/ui';

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'courses' | 'orders' | 'profile';

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { user, orders, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('courses');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    setIsSubmitting(true);
    try {
      await login(loginEmail.trim(), loginName.trim() || undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={user ? 'Личный кабинет' : 'Вход в личный кабинет'}
      description={
        user
          ? `С возвращением, ${user.fullName}!`
          : 'Введите почту, указанную при покупке, для доступа к материалам.'
      }
    >
      {!user ? (
        /* GUEST / LOGIN SCREEN */
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <Field
            label="Email"
            placeholder="name@example.com"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            hint="Для быстрого теста можно ввести любой email"
          />

          <Field
            label="Ваше имя (необязательно)"
            placeholder="Иван"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
          />

          <Button type="submit" variant="primary" size="md" fullWidth isLoading={isSubmitting}>
            Войти в кабинет
          </Button>

          <p className="text-caption text-ink-muted text-center leading-relaxed">
            Поскольку сейчас работает моковый бэкенд, вход выполняется моментально без пароля.
          </p>
        </form>
      ) : (
        /* AUTHENTICATED USER DASHBOARD */
        <div className="flex flex-col gap-6">
          {/* Tabs bar */}
          <div className="flex border-b border-border gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className={`pb-3 text-caption font-semibold cursor-pointer border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'courses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Мои материалы ({orders.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`pb-3 text-caption font-semibold cursor-pointer border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              <Receipt className="w-4 h-4" />
              История заказов ({orders.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`pb-3 text-caption font-semibold cursor-pointer border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              <User className="w-4 h-4" />
              Профиль
            </button>
          </div>

          {/* TAB 1: COURSES */}
          {activeTab === 'courses' && (
            <div className="flex flex-col gap-3">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-ink-muted text-caption bg-surface-sunken rounded-md">
                  У вас пока нет оплаченных курсов. Выберите подходящую программу в каталоге.
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-surface-sunken border border-border rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="primary">{ord.productType}</Badge>
                        <span className="text-caption text-ink-muted">
                          Заказ {ord.orderNumber}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-ink text-base">
                        {ord.productTitle}
                      </h4>
                      <span className="text-caption text-success font-medium">
                        Доступ активен без ограничений
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      rightIcon={<PlayCircle className="w-4 h-4" />}
                      onClick={() => alert(`Запуск обучающей платформы для: ${ord.productTitle}`)}
                    >
                      К урокам
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 bg-surface-raised border border-border rounded-md flex flex-col gap-2 text-caption"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-semibold text-ink">Заказ #{ord.orderNumber}</span>
                    <Badge variant="success">Оплачен</Badge>
                  </div>

                  <div className="flex items-center justify-between text-ink-muted">
                    <span>{ord.productTitle}</span>
                    <span className="font-bold text-ink">{formatPrice(ord.totalAmount)}</span>
                  </div>

                  <div className="flex items-center gap-4 text-ink-muted text-xs pt-2 border-t border-border/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(ord.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      {ord.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-surface-sunken border border-border rounded-md flex flex-col gap-3 text-caption">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Имя:</span>
                  <span className="font-semibold text-ink">{user.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Email:</span>
                  <span className="font-semibold text-ink">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">ID профиля:</span>
                  <span className="font-mono text-ink-muted">{user.id}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                leftIcon={<LogOut className="w-4 h-4" />}
                className="self-start text-danger hover:border-danger"
              >
                Выйти из аккаунта
              </Button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

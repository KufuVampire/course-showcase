import { GraduationCap, Receipt, User as UserIcon, PlayCircle, Calendar, CreditCard, LogOut } from 'lucide-react';
import type { Order, User } from '@/shared/api';
import { formatPrice } from '@/shared/lib/formatters';
import { Badge, Button } from '@/shared/ui';
import { ORDER_STATUS_LABEL, PRODUCT_TYPE_META } from '@/shared/config/product';
import type { AccountTabType } from '../model/useAccountModal';

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('ru-RU');
  } catch {
    return dateStr;
  }
}

export interface AccountDashboardTabsProps {
  user: User;
  orders: Order[];
  activeTab: AccountTabType;
  onTabChange: (tab: AccountTabType) => void;
  onNotifyCourse: (msg: string) => void;
  onLogout: () => void;
  uniqueCoursesCount: number;
}

export function AccountDashboardTabs({
  user,
  orders,
  activeTab,
  onTabChange,
  onNotifyCourse,
  onLogout,
  uniqueCoursesCount,
}: AccountDashboardTabsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Tabs navigation */}
      <div className="flex border-b border-border gap-6" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'courses'}
          onClick={() => onTabChange('courses')}
          className={`pb-3 text-caption font-semibold cursor-pointer border-b-2 flex items-center gap-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeTab === 'courses'
              ? 'border-primary text-primary'
              : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-primary" />
          Мои материалы ({uniqueCoursesCount})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'orders'}
          onClick={() => onTabChange('orders')}
          className={`pb-3 text-caption font-semibold cursor-pointer border-b-2 flex items-center gap-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeTab === 'orders'
              ? 'border-primary text-primary'
              : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Receipt className="w-4 h-4 text-primary" />
          История заказов ({orders.length})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'profile'}
          onClick={() => onTabChange('profile')}
          className={`pb-3 text-caption font-semibold cursor-pointer border-b-2 flex items-center gap-1.5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeTab === 'profile'
              ? 'border-primary text-primary'
              : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <UserIcon className="w-4 h-4 text-primary" />
          Профиль
        </button>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="flex flex-col gap-3">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-ink-muted text-caption bg-surface-sunken rounded-md">
              У вас пока нет оплаченных курсов. Выберите подходящую программу в каталоге.
            </div>
          ) : (
            orders.map((ord) => {
              const typeMeta = PRODUCT_TYPE_META[ord.productType];
              return (
                <div
                  key={ord.id}
                  className="p-4 bg-surface-sunken border border-border rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={typeMeta.variant}>{typeMeta.label}</Badge>
                      <span className="text-caption text-ink-muted">Заказ #{ord.orderNumber}</span>
                    </div>
                    <h3 className="font-display font-semibold text-ink text-base">{ord.productTitle}</h3>
                    <span className="text-caption text-success font-medium">Доступ активен без ограничений</span>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    rightIcon={<PlayCircle className="w-4 h-4" />}
                    onClick={() => onNotifyCourse(`Обучающая среда для «${ord.productTitle}» подготовлена (демо).`)}
                  >
                    К урокам
                  </Button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="flex flex-col gap-3">
          {orders.map((ord) => {
            const statusMeta = ORDER_STATUS_LABEL[ord.status];
            return (
              <div
                key={ord.id}
                className="p-4 bg-surface-raised border border-border rounded-md flex flex-col gap-2 text-caption"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-ink font-display text-base">Заказ #{ord.orderNumber}</h3>
                  <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
                </div>

                <div className="flex items-center justify-between text-ink-muted">
                  <span>{ord.productTitle}</span>
                  <span className="font-bold text-ink">{formatPrice(ord.totalAmount)}</span>
                </div>

                <div className="flex items-center gap-4 text-ink-muted text-xs pt-2 border-t border-border/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {formatDate(ord.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-primary" />
                    {ord.paymentMethod.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Profile Tab */}
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
            onClick={onLogout}
            leftIcon={<LogOut className="w-4 h-4" />}
            className="self-start text-danger hover:border-danger"
          >
            Выйти из аккаунта
          </Button>
        </div>
      )}
    </div>
  );
}

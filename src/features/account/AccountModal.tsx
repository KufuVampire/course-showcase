import { Loader2 } from 'lucide-react';
import { Modal } from '@/shared/ui';
import { useAccountModal } from './model/useAccountModal';
import { AccountLoginForm } from './ui/AccountLoginForm';
import { AccountDashboardTabs } from './ui/AccountDashboardTabs';

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const {
    user,
    orders,
    isLoading,
    logout,
    activeTab,
    setActiveTab,
    activeCourseNotification,
    setActiveCourseNotification,
    loginEmail,
    setLoginEmail,
    loginName,
    setLoginName,
    isSubmitting,
    handleLoginSubmit,
    uniqueCoursesCount,
  } = useAccountModal();

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
      {isLoading ? (
        <div className="py-12 flex justify-center items-center text-ink-muted">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      ) : !user ? (
        <AccountLoginForm
          email={loginEmail}
          name={loginName}
          onEmailChange={setLoginEmail}
          onNameChange={setLoginName}
          onSubmit={handleLoginSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <>
          {activeCourseNotification && (
            <div className="mb-4 p-3 bg-accent/15 border border-accent/30 text-ink text-caption rounded-md flex justify-between items-center">
              <span>{activeCourseNotification}</span>
              <button
                type="button"
                onClick={() => setActiveCourseNotification(null)}
                className="text-xs underline hover:opacity-80 cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          )}

          <AccountDashboardTabs
            user={user}
            orders={orders}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onNotifyCourse={setActiveCourseNotification}
            onLogout={logout}
            uniqueCoursesCount={uniqueCoursesCount}
          />
        </>
      )}
    </Modal>
  );
}

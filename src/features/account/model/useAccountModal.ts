import { useState, type FormEvent } from 'react';
import { useAuthContext } from '@/app/AuthContext';

export type AccountTabType = 'courses' | 'orders' | 'profile';

export function useAccountModal() {
  const { user, orders, isLoading, login, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState<AccountTabType>('courses');
  const [activeCourseNotification, setActiveCourseNotification] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    setIsSubmitting(true);
    try {
      await login(loginEmail.trim(), loginName.trim() || undefined);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uniqueCoursesCount = new Set(orders.map((o) => o.productId)).size;

  return {
    user,
    orders,
    isLoading,
    login,
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
  };
}

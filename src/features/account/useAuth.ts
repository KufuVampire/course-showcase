import { useCallback, useEffect, useState } from 'react';
import { authService, type Order, type User } from '@/shared/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentUser = await authService.getCurrentUser();
      const userOrders = await authService.getUserOrders();
      setUser(currentUser);
      setOrders(userOrders);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email: string, name?: string) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(email, name);
      setUser(loggedUser);
      const userOrders = await authService.getUserOrders();
      setOrders(userOrders);
      return loggedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    orders,
    isLoading,
    login,
    logout,
    refresh,
  };
}

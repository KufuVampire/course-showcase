import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService, type Order, type User } from '@/shared/api';

interface AuthContextValue {
  user: User | null;
  orders: Order[];
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshOrders: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshOrders = useCallback(async () => {
    try {
      const userOrders = await authService.getUserOrders();
      setOrders(userOrders);
    } catch {
      // ignore
    }
  }, []);

  const init = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      const userOrders = await authService.getUserOrders();
      setOrders(userOrders);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const login = useCallback(async (email: string, name?: string) => {
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
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      orders,
      isLoading,
      login,
      logout,
      refreshOrders,
    }),
    [user, orders, isLoading, login, logout, refreshOrders]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
}

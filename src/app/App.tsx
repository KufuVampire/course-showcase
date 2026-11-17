import { BrowserRouter } from 'react-router';
import { AuthProvider } from '@/entities/session';
import { MainLayout } from './MainLayout';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

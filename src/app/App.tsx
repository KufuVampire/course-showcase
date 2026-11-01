import { BrowserRouter } from 'react-router';
import { AuthProvider } from './AuthContext';
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

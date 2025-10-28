import { useAuthStore } from '../hooks/useAuthStore';
import { AuthService } from './AuthService';

export async function bootstrapAuth(): Promise<void> {
  const { accessToken, setUser, clearAuth } = useAuthStore.getState();
  if (!accessToken) return;
  try {
    const me = await AuthService.me();
    setUser(me);
  } catch {
    clearAuth();
  }
}

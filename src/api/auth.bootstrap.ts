import { useUserStore } from '../stores/useUserStore';
import { AuthService } from './AuthService/AuthService';
import { applyTheme, defineInitialTheme } from '../shared/helpers/theme.helpers';

export async function bootstrapAuth(): Promise<void> {
  const { accessToken, setUser, clearAuth } = useUserStore.getState();
  if (!accessToken) return;
  try {
    const me = await AuthService.me();
    setUser(me);
    const theme = me.theme ?? defineInitialTheme();
    applyTheme(theme);
  } catch {
    clearAuth();
  }
}

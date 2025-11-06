import { useUserStore } from '../stores/useUserStore';
import { AuthService } from './AuthService/AuthService';
import { applyTheme, defineInitialTheme } from '../shared/helpers/theme.helpers';

export async function bootstrapAuth(): Promise<void> {
  const { setUser, clearAuth } = useUserStore.getState();
  try {
    const me = await AuthService.me(true);
    setUser(me);
    const theme = me.theme ?? defineInitialTheme();
    applyTheme(theme);
  } catch {
    clearAuth();
  }
}

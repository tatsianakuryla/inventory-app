import type { Theme } from '../../api/UserService/user.schemas';
import { LocalStorage } from '../../storages/localStorage/localStorage';

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const body = document.body;
  const isDark = theme === 'DARK';
  root.classList.toggle('dark', isDark);
  body.classList.toggle('dark', isDark);
  root.classList.remove(isDark ? 'light' : 'dark');
  body.classList.remove(isDark ? 'light' : 'dark');
  LocalStorage.setTheme(theme);
}

export function defineInitialTheme(): Theme {
  const saved = LocalStorage.getTheme();
  if (saved === 'LIGHT' || saved === 'DARK') return saved;
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT';
}

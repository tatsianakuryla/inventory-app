import type { Theme } from '../types/enums';
import { LocalStorage } from '../../storages/localStorage/localStorage';
import { Themes } from '../types/enums';

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const body = document.body;
  const isDark = theme === Themes.DARK;
  root.classList.toggle('dark', isDark);
  body.classList.toggle('dark', isDark);
  root.classList.remove(isDark ? 'light' : 'dark');
  body.classList.remove(isDark ? 'light' : 'dark');
  LocalStorage.setTheme(theme);
}

export function defineInitialTheme(): Theme {
  const saved = LocalStorage.getTheme();
  if (saved === Themes.LIGHT || saved === Themes.DARK) return saved;
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? Themes.DARK : Themes.LIGHT;
}

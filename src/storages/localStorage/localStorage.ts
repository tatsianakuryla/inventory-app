import { THEME_KEY } from './types';
import type { Theme } from '../../api/UserService/user.schemas';
import { Themes } from '../../shared/types/enums';

export class LocalStorage {
  public static setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
  }

  public static getTheme(): Theme | undefined {
    const result = localStorage.getItem(THEME_KEY);
    if (result === Themes.LIGHT || result === Themes.DARK) return result;
    return undefined;
  }
}

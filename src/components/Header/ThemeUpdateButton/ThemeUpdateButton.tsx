import { type JSX, useEffect, useState } from 'react';
import { Button } from '../../Button/Button';
import { Moon, Sun } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { useUpdateUser } from '../../../hooks/users/useUpdateUser';
import { type Theme, Themes } from '../../../shared/types/enums';
import { applyTheme, defineInitialTheme } from '../../../shared/helpers/theme.helpers';
import { LocalStorage } from '../../../storages/localStorage/localStorage';
import { buttonClass, iconSize } from './theme-update-button.styles';

export const ThemeUpdateButton = (): JSX.Element => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUpdateUser();

  const [localTheme, setLocalTheme] = useState<Theme>(() => defineInitialTheme());

  useEffect(() => {
    if (user?.theme) {
      setLocalTheme(user.theme);
      LocalStorage.setTheme(user.theme);
      applyTheme(user.theme);
    }
  }, [user?.theme]);

  const effectiveTheme: Theme = user?.theme ?? localTheme;
  const isDark = effectiveTheme === Themes.DARK;

  const toggleTheme = (): void => {
    const nextTheme: Theme = isDark ? Themes.LIGHT : Themes.DARK;
    if (user) {
      updateUser.mutate({ theme: nextTheme, version: user.version });
    } else {
      setLocalTheme(nextTheme);
    }
    applyTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-pressed={isDark}
      title={isDark ? 'Switch to Light' : 'Switch to Dark'}
      disabled={updateUser.isPending}
      className={buttonClass}
    >
      {isDark ? <Sun className={iconSize} /> : <Moon className={iconSize} />}
    </Button>
  );
};

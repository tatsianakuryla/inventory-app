import { type JSX, useEffect, useState } from 'react';
import { Button } from '../../Button/Button';
import { Moon, Sun } from 'lucide-react';
import { useUserStore } from '../../../stores/useUserStore';
import { useUpdateUser } from '../../../hooks/users/useUpdateUser';
import type { Theme } from '../../../api/UserService/user.schemas';
import { applyTheme, defineInitialTheme } from '../../../shared/helpers/theme.helpers';
import { LocalStorage } from '../../../storages/localStorage/localStorage';

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
  const isDark = effectiveTheme === 'DARK';

  const toggleTheme = (): void => {
    const nextTheme: Theme = isDark ? 'LIGHT' : 'DARK';
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
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

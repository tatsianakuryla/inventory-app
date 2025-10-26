import { Routes, Route } from 'react-router-dom';
import type { JSX } from 'react';
import type { Theme } from '../shared/types/main.types';
import { APP_ROUTES } from './routes/routes';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { InventoriesPage } from '../pages/InventoriesPage/InventoriesPage';
import { InventoryViewPage } from '../pages/InventoryViewPage/InventoryViewPage';
import { InventorySettingsPage } from '../pages/InventorySettingsPage/InventorySettingsPage';
import { InventoryItemsPage } from '../pages/InventoryItemsPage/InventoryItemsPage';
import { ItemViewPage } from '../pages/ItemViewPage/ItemViewPage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { AdminUsersPage } from '../pages/AdminUsersPage/AdminUsersPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

export const AppRouter = ({ theme }: { theme: Theme }): JSX.Element => {
  return (
    <Routes>
      <Route element={<AppLayout theme={theme} />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.INVENTORIES} element={<InventoriesPage />} />
        <Route path={APP_ROUTES.INVENTORY_VIEW} element={<InventoryViewPage />} />
        <Route path={APP_ROUTES.INVENTORY_SETTINGS} element={<InventorySettingsPage />} />
        <Route path={APP_ROUTES.INVENTORY_ITEMS} element={<InventoryItemsPage />} />
        <Route path={APP_ROUTES.ITEM_VIEW} element={<ItemViewPage />} />
        <Route path={APP_ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={APP_ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

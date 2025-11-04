import { Routes, Route } from 'react-router-dom';
import type { JSX } from 'react';
import { APP_ROUTES } from './routes/routes';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { HomePage } from '../pages/HomePage/HomePage';
import { InventoriesPage } from '../pages/InventoriesPage/InventoriesPage';
import { InventoryViewPage } from '../pages/InventoryViewPage/InventoryViewPage';
import { ItemViewPage } from '../pages/ItemViewPage/ItemViewPage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { AdminUsersPage } from '../pages/AdminUsersPage/AdminUsersPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { RequireAuth } from './guards/RequireAuth';
import { RequireAdmin } from './guards/RequireAdmin';
import { RequireGuest } from './guards/RequireGuest';
import { MyInventoriesPage } from '../pages/MyInventoriesPage/MyInventoriesPage';
import { InventoryCreatePage } from '../pages/InventoryCreatePage/InventoryCreatePage';
import { ItemCreatePage } from '../pages/ItemCreatePage/ItemCreatePage';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={APP_ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={APP_ROUTES.INVENTORIES} element={<InventoriesPage />} />
        <Route path={APP_ROUTES.INVENTORY_VIEW} element={<InventoryViewPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path={APP_ROUTES.INVENTORIES} element={<InventoriesPage />} />
          <Route path={APP_ROUTES.INVENTORY_VIEW} element={<InventoryViewPage />} />
          <Route path={APP_ROUTES.CREATE_INVENTORY} element={<InventoryCreatePage />} />
          <Route path={APP_ROUTES.ITEM_VIEW} element={<ItemViewPage />} />
          <Route path={APP_ROUTES.ITEM_CREATE} element={<ItemCreatePage />} />
          <Route path={APP_ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={APP_ROUTES.MY_INVENTORIES} element={<MyInventoriesPage />} />
        </Route>
      </Route>

      <Route element={<RequireAdmin />}>
        <Route element={<AppLayout />}>
          <Route path={APP_ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
        </Route>
      </Route>

      <Route element={<RequireGuest />}>
        <Route element={<AuthLayout />}>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

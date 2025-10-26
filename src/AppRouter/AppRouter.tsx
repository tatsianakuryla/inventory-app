import { Routes, Route } from 'react-router-dom';
import { type JSX } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { THEMES } from '../shared/types/main.types';
import { APP_ROUTES } from './routes/routes';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<MainLayout theme={THEMES.LIGHT} />}></Route>
      <Route path={APP_ROUTES.LOGIN} element={<div>Login</div>}></Route>
      <Route path={APP_ROUTES.REGISTER} element={<div>Register</div>}></Route>
      <Route path={APP_ROUTES.INVENTORIES} element={<div>Inventory</div>}></Route>
      <Route path={APP_ROUTES.INVENTORY_VIEW} element={<div>Inventory View</div>}></Route>
      <Route path={APP_ROUTES.INVENTORY_SETTINGS} element={<div>Inventory Settings</div>}></Route>
      <Route path={APP_ROUTES.INVENTORY_ITEMS} element={<div>Inventory Items</div>}></Route>
      <Route path={APP_ROUTES.ITEM_VIEW} element={<div>Item View</div>}></Route>
      <Route path={APP_ROUTES.SEARCH} element={<div>Search</div>}></Route>
      <Route path={APP_ROUTES.PROFILE} element={<div>Profile</div>}></Route>
      <Route path={APP_ROUTES.ADMIN_USERS} element={<div>Admin Users</div>}></Route>
    </Routes>
  );
};

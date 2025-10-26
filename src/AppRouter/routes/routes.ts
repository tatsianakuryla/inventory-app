export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  INVENTORIES: '/inventory',
  INVENTORY_VIEW: '/inventory/:inventoryId',
  INVENTORY_SETTINGS: '/inventory/:inventoryId/settings',
  INVENTORY_ITEMS: '/inventory/:inventoryId/items',
  ITEM_VIEW: '/item/:itemId',
  SEARCH: '/search',
  PROFILE: '/profile/:userId',
  ADMIN_USERS: '/admin/users',
} as const;

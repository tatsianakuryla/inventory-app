export const APP_ROUTES = {
  ITEM_VIEW: '/item/:itemId',
  ITEM_CREATE: '/inventories/:inventoryId/items/new',
  ITEM_EDIT: '/items/:inventoryId/:itemId/edit',
  SEARCH: '/search',
  PROFILE: '/profile/:userId',
  ADMIN_USERS: '/admin/users',

  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  INVENTORIES: '/inventories',
  MY_INVENTORIES: '/inventories/my',
  CREATE_INVENTORY: '/inventory/new',
  INVENTORY_VIEW: '/inventories/:inventoryId',
} as const;

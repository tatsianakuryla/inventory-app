export const API_BASE_URL: string =
  typeof import.meta.env.VITE_API_URL === 'string'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3000';

export const API_ORIGIN = new URL(API_BASE_URL).origin;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const USERS_ROUTES = {
  ME: '/users/me',
  UPDATE: '/users/update',
  SEARCH_USERS: '/users/autocomplete',
  REGISTER: '/users/register',
  LOGIN: '/users/login',
  GOOGLE_LOGIN: '/users/google/login',
  FACEBOOK_LOGIN: '/users/facebook/login',
  LOGOUT: '/users/logout',
} as const;

export const ADMIN_ROUTES = {
  GET_ALL_USERS: '/admin',
  BLOCK_USERS: '/admin/users/block',
  UNBLOCK_USERS: '/admin/users/unblock',
  PROMOTE_USERS: '/admin/users/promote',
  DEMOTE_USERS: '/admin/users/demote',
  DELETE_USERS: '/admin/users',
} as const;

export const INVENTORY_ROUTES = {
  CREATE: '/inventory',
  GET_ALL: '/inventory',
  GET_MY_WRITE_ACCESS: '/inventory/my/write-access',
  GET_BY_ID: '/inventory/:inventoryId',
  UPDATE: '/inventory/:inventoryId',
  DELETE_MANY: '/inventory',
  BULK_UPDATE_VISIBILITY: '/inventory/visibility',
  GET_ACCESS: '/inventory/:inventoryId/access',
  UPDATE_ACCESS: '/inventory/:inventoryId/access',
  REVOKE_ACCESS: '/inventory/:inventoryId/access',
  UPDATE_FIELDS: '/inventory/:inventoryId/fields',
  UPDATE_ID_FORMAT: '/inventory/:inventoryId/id-format',
  PREVIEW_CUSTOM_ID: '/inventory/:inventoryId/id-format/preview',
  GET_STATISTICS: '/inventory/:inventoryId/statistics',
} as const;

export const ITEMS_ROUTES = {
  GET_ALL: '/items/:inventoryId',
  GET_BY_ID: '/items/:inventoryId/:itemId',
  CREATE: '/items/:inventoryId',
  UPDATE: '/items/:inventoryId/:itemId',
  DELETE_MANY: '/items/:inventoryId',
  LIKE: '/items/:inventoryId/:itemId/like',
  UNLIKE: '/items/:inventoryId/:itemId/like',
} as const;

export const CATEGORIES_ROUTES = {
  GET_ALL: '/categories',
  GET_STATS: '/categories/stats',
  CREATE: '/categories',
  UPDATE: '/categories/:categoryId',
  DELETE: '/categories/:categoryId',
  DELETE_FORCE: '/categories/:categoryId/force',
} as const;

export const TAGS_ROUTES = {
  GET_ALL: '/tags',
  GET_POPULAR: '/tags/popular',
  CREATE: '/tags',
  GET_INVENTORY_TAGS: '/tags/inventory/:inventoryId',
  UPDATE_INVENTORY_TAGS: '/tags/inventory/:inventoryId',
} as const;

export const DISCUSSIONS_ROUTES = {
  GET_ALL: '/discussions/:inventoryId',
  CREATE: '/discussions/:inventoryId',
  DELETE: '/discussions/:discussionId',
} as const;

export const HOME_ROUTES = {
  HOME: '/',
  GET_POPULAR: '/home/popular',
  GET_RECENT: '/home/recent',
  GET_TAG_CLOUD: '/home/tag-cloud',
} as const;

export const SEARCH_ROUTES = {
  GLOBAL_SEARCH: '/search',
} as const;

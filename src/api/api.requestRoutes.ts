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
  ME: '/api/users/me',
  UPDATE: '/api/users/update',
  SEARCH_USERS: '/api/users/autocomplete',
  REGISTER: '/api/users/register',
  LOGIN: '/api/users/login',
  GOOGLE_LOGIN: '/api/users/google/login',
  FACEBOOK_LOGIN: '/api/users/facebook/login',
  LOGOUT: '/api/users/logout',
} as const;

export const ADMIN_ROUTES = {
  GET_ALL_USERS: '/api/admin',
  BLOCK_USERS: '/api/admin/users/block',
  UNBLOCK_USERS: '/api/admin/users/unblock',
  PROMOTE_USERS: '/api/admin/users/promote',
  DEMOTE_USERS: '/api/admin/users/demote',
  DELETE_USERS: '/api/admin/users',
} as const;

export const INVENTORY_ROUTES = {
  CREATE: '/api/inventory',
  GET_ALL: '/api/inventory',
  GET_MY_WRITE_ACCESS: '/api/inventory/my/write-access',
  GET_BY_ID: '/api/inventory/:inventoryId',
  UPDATE: '/api/inventory/:inventoryId',
  DELETE_MANY: '/api/inventory',
  GET_ACCESS: '/api/inventory/:inventoryId/access',
  UPDATE_ACCESS: '/api/inventory/:inventoryId/access',
  REVOKE_ACCESS: '/api/inventory/:inventoryId/access',
  UPDATE_FIELDS: '/api/inventory/:inventoryId/fields',
  UPDATE_ID_FORMAT: '/api/inventory/:inventoryId/id-format',
  PREVIEW_CUSTOM_ID: '/api/inventory/:inventoryId/id-format/preview',
  GET_STATISTICS: '/api/inventory/:inventoryId/statistics',
} as const;

export const ITEMS_ROUTES = {
  GET_ALL: '/api/items/:inventoryId',
  GET_BY_ID: '/api/items/:inventoryId/:itemId',
  CREATE: '/api/items/:inventoryId',
  UPDATE: '/api/items/:inventoryId/:itemId',
  DELETE_MANY: '/api/items/:inventoryId',
  LIKE: '/api/items/:inventoryId/:itemId/like',
  UNLIKE: '/api/items/:inventoryId/:itemId/like',
} as const;

export const CATEGORIES_ROUTES = {
  GET_ALL: '/api/categories',
  GET_STATS: '/api/categories/stats',
  CREATE: '/api/categories',
  UPDATE: '/api/categories/:categoryId',
  DELETE: '/api/categories/:categoryId',
  DELETE_FORCE: '/api/categories/:categoryId/force',
} as const;

export const TAGS_ROUTES = {
  GET_ALL: '/api/tags',
  GET_POPULAR: '/api/tags/popular',
  CREATE: '/api/tags',
  GET_INVENTORY_TAGS: '/api/tags/inventory/:inventoryId',
  UPDATE_INVENTORY_TAGS: '/api/tags/inventory/:inventoryId',
} as const;

export const DISCUSSIONS_ROUTES = {
  GET_ALL: '/api/discussions/:inventoryId',
  CREATE: '/api/discussions/:inventoryId',
  DELETE: '/api/discussions/:discussionId',
} as const;

export const HOME_ROUTES = {
  HOME: '/',
  GET_POPULAR: '/api/home/popular',
  GET_RECENT: '/api/home/recent',
  GET_TAG_CLOUD: '/api/home/tag-cloud',
} as const;

export const SEARCH_ROUTES = {
  GLOBAL_SEARCH: '/api/search',
} as const;

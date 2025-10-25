export const API_BASE_URL: string =
  typeof import.meta.env.VITE_API_URL === 'string'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3000';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const USERS_ROUTES = {
  ME: '/api/users/me',
  UPDATE: '/api/users/me',
  SEARCH_USERS: '/api/users/autocomplete',
  REGISTER: '/api/users/register',
  LOGIN: '/api/users/login',
  GOOGLE_LOGIN: '/api/users/google/login',
  FACEBOOK_LOGIN: '/api/users/facebook/login',
} as const;

export const ADMIN_ROUTES = {
  GET_ALL_USERS: '/api/admin/users',
  BLOCK_USERS: '/api/admin/users/block',
  UNBLOCK_USERS: '/api/admin/users/unblock',
  CHANGE_ROLE: '/api/admin/users/change-role',
} as const;

export const INVENTORY_ROUTES = {
  CREATE: '/api/inventory',
  GET_ALL: '/api/inventory',
  GET_BY_ID: '/api/inventory/:inventoryId',
  UPDATE: '/api/inventory/:inventoryId',
  DELETE_MANY: '/api/inventory',
  GET_ACCESS: '/api/inventory/:inventoryId/access',
  UPDATE_ACCESS: '/api/inventory/:inventoryId/access',
  REVOKE_ACCESS: '/api/inventory/:inventoryId/access',
  UPDATE_FIELDS: '/api/inventory/:inventoryId/fields',
  UPDATE_ID_FORMAT: '/api/inventory/:inventoryId/id-format',
  GET_STATISTICS: '/api/inventory/:inventoryId/statistics',
} as const;

export const ITEMS_ROUTES = {
  GET_ALL: '/api/items',
  GET_BY_ID: '/api/items/:itemId',
  CREATE: '/api/items',
  UPDATE: '/api/items/:itemId',
  DELETE_MANY: '/api/items',
  EXPORT: '/api/items/export',
} as const;

export const CATEGORIES_ROUTES = {
  GET_ALL: '/api/categories',
  CREATE: '/api/categories',
  UPDATE: '/api/categories/:categoryId',
  DELETE_MANY: '/api/categories',
} as const;

export const TAGS_ROUTES = {
  GET_ALL: '/api/tags',
  CREATE: '/api/tags',
  DELETE_MANY: '/api/tags',
} as const;

export const DISCUSSIONS_ROUTES = {
  GET_ALL: '/api/discussions',
  CREATE: '/api/discussions',
  GET_BY_ID: '/api/discussions/:discussionId',
  CREATE_COMMENT: '/api/discussions/:discussionId/comments',
  DELETE_MANY: '/api/discussions',
} as const;

export const HOME_ROUTES = {
  HOME: '/',
  GET_STATS: '/api/home/stats',
  GET_ACTIVITY: '/api/home/activity',
} as const;

export const THEMES = ['LIGHT', 'DARK'] as const;
export type Theme = (typeof THEMES)[number];

export const LANGUAGES = ['EN', 'RU'] as const;
export type Language = (typeof LANGUAGES)[number];

export const USER_ROLES = ['USER', 'ADMIN'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ['ACTIVE', 'BLOCKED'] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const INVENTORY_STATUSES = ['OWNER', 'VIEWER', 'EDITOR'] as const;
export type InventoryStatus = (typeof INVENTORY_STATUSES)[number];

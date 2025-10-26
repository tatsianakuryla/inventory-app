export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: Status;
  language: Language;
  theme: THEMES;
  createdAt: string;
  updatedAt: string;
  version: number;
  googleId: string | null;
  facebookId: string | null;
}

export enum THEMES {
  'LIGHT' = 'LIGHT',
  'DARK' = 'DARK',
}

export type Theme = keyof typeof THEMES;

export const LANGUAGES = ['EN', 'RU'] as const;
export type Language = (typeof LANGUAGES)[number];

export const USER_ROLES = ['USER', 'ADMIN'] as const;
export type Role = (typeof USER_ROLES)[number];

export const USER_STATUSES = ['ACTIVE', 'BLOCKED'] as const;
export type Status = (typeof USER_STATUSES)[number];

export const INVENTORY_STATUSES = ['OWNER', 'VIEWER', 'EDITOR'] as const;
export type InventoryStatus = (typeof INVENTORY_STATUSES)[number];

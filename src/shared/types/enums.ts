import { z } from 'zod';

export const ROLES = ['USER', 'ADMIN'] as const;
export const RoleSchema = z.enum(ROLES);
export type Role = z.infer<typeof RoleSchema>;

export const LANGUAGES = ['EN', 'RU'] as const;
export const LanguageSchema = z.enum(LANGUAGES);
export type Language = z.infer<typeof LanguageSchema>;

export const STATUSES = ['ACTIVE', 'BLOCKED'] as const;
export const StatusSchema = z.enum(STATUSES);
export type Status = z.infer<typeof StatusSchema>;

export const THEMES = ['LIGHT', 'DARK'] as const;
export const ThemeSchema = z.enum(THEMES);
export type Theme = z.infer<typeof ThemeSchema>;

export const INVENTORY_ROLES = ['OWNER', 'EDITOR', 'VIEWER'] as const;
export const InventoryRoleSchema = z.enum(INVENTORY_ROLES);
export type InventoryRole = z.infer<typeof InventoryRoleSchema>;

export const Roles = {
  USER: 'USER' as const,
  ADMIN: 'ADMIN' as const,
} as const;

export const Languages = {
  EN: 'EN' as const,
  RU: 'RU' as const,
} as const;

export const Statuses = {
  ACTIVE: 'ACTIVE' as const,
  BLOCKED: 'BLOCKED' as const,
} as const;

export const Themes = {
  LIGHT: 'LIGHT' as const,
  DARK: 'DARK' as const,
} as const;

export const InventoryRoles = {
  OWNER: 'OWNER' as const,
  EDITOR: 'EDITOR' as const,
  VIEWER: 'VIEWER' as const,
} as const;

export const FieldStates = {
  HIDDEN: 'HIDDEN' as const,
  SHOWN: 'SHOWN' as const,
} as const;

export const FieldStateSchema = z.enum(FieldStates);
export type FieldState = z.infer<typeof FieldStateSchema>;

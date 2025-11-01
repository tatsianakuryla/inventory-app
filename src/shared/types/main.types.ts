export const USER_ROLES = ['USER', 'ADMIN'] as const;
export type Role = (typeof USER_ROLES)[number];

export const USER_STATUSES = ['ACTIVE', 'BLOCKED'] as const;
export type Status = (typeof USER_STATUSES)[number];

export const INVENTORY_ROLES = ['OWNER', 'EDITOR', 'VIEWER'] as const;
export type InventoryRole = (typeof INVENTORY_ROLES)[number];

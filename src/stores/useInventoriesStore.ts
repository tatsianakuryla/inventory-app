import type { InventoryListItem } from '../api/InventoryService/inventory.schemas';
import { create } from 'zustand';

type InventoryListState = {
  all: InventoryListItem[];
  recent: InventoryListItem[];
  popular: InventoryListItem[];
  total: number;
  setAll: (inventories: InventoryListItem[], total: number) => void;
  setRecent: (inventories: InventoryListItem[]) => void;
  setPopular: (inventories: InventoryListItem[]) => void;
  addInventory: (inventory: InventoryListItem) => void;
  updateInventory: (id: string, updates: Partial<InventoryListItem>) => void;
  removeInventory: (id: string) => void;
  clear: () => void;
};

export const useInventoriesStore = create<InventoryListState>((set) => ({
  all: [],
  recent: [],
  popular: [],
  total: 0,

  setAll: (inventories, total) => set({ all: inventories, total }),

  setRecent: (inventories) => set({ recent: inventories }),

  setPopular: (inventories) => set({ popular: inventories }),

  addInventory: (inventory) =>
    set((state) => ({
      all: [inventory, ...state.all],
      total: state.total + 1,
    })),

  updateInventory: (id, updates) =>
    set((state) => ({
      all: state.all.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      recent: state.recent.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      popular: state.popular.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })),

  removeInventory: (id) =>
    set((state) => ({
      all: state.all.filter((item) => item.id !== id),
      recent: state.recent.filter((item) => item.id !== id),
      popular: state.popular.filter((item) => item.id !== id),
      total: Math.max(0, state.total - 1),
    })),

  clear: () =>
    set({
      all: [],
      recent: [],
      popular: [],
      total: 0,
    }),
}));

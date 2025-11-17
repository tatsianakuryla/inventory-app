import { type JSX, useState, useCallback, useRef } from 'react';
import { useUserStore } from '../../../../stores/useUserStore';
import { LoadingErrorEmptySwitcher } from '../../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { InventoriesBasicTable } from '../../../Tables/InventoriesBasicTable/InventoriesBasicTable';
import { INVENTORY_COLUMNS } from '../../../Tables/CreateCommonColumns';
import { useInventoriesTable } from '../../../../hooks/inventories/useInventoriesTable';
import { InventoriesToolbar } from './InventoriesToolbar';
import {
  useDeleteInventories,
  useBulkUpdateVisibility,
} from '../../../../hooks/inventories/useInventories';

export const MyInventoriesTable = (): JSX.Element => {
  const userId = useUserStore().user?.id;
  const { query, view } = useInventoriesTable({
    filterPredicate: (item) => (userId ? item.ownerId === userId : false),
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const deleteMutation = useDeleteInventories();
  const visibilityMutation = useBulkUpdateVisibility();
  const lastVisibilityAction = useRef<'public' | 'private' | null>(null);

  const handleDelete = async (): Promise<void> => {
    if (selectedIds.size === 0) return;

    const inventoriesToDelete = [...selectedIds].map((id) => ({
      id,
      version: 1,
    }));

    await deleteMutation.mutateAsync({ inventories: inventoriesToDelete });
    setSelectedIds(new Set());
  };

  const handleMakePublic = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    lastVisibilityAction.current = 'public';
    await visibilityMutation.mutateAsync({
      inventoryIds: [...selectedIds],
      isPublic: true,
    });
    setSelectedIds(new Set());
    // eslint-disable-next-line unicorn/no-null
    lastVisibilityAction.current = null;
  };

  const handleMakePrivate = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    lastVisibilityAction.current = 'private';
    await visibilityMutation.mutateAsync({
      inventoryIds: [...selectedIds],
      isPublic: false,
    });
    setSelectedIds(new Set());
    // eslint-disable-next-line unicorn/no-null
    lastVisibilityAction.current = null;
  };

  const handleClearSelection = (): void => {
    setSelectedIds(new Set());
  };

  const handleSelectAll = useCallback(
    (checked: boolean): void => {
      if (checked && view.sortedItems) {
        setSelectedIds(new Set(view.sortedItems.map((inv) => inv.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [view.sortedItems]
  );

  const handleSelectOne = useCallback((id: string, checked: boolean): void => {
    setSelectedIds((previous) => {
      const newSet = new Set(previous);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }, []);

  const isAllSelected =
    view.sortedItems && selectedIds.size === view.sortedItems.length && view.sortedItems.length > 0;

  const filteredData = view.sortedItems.length > 0 ? { items: view.sortedItems } : undefined;

  return (
    <LoadingErrorEmptySwitcher
      isLoading={query.isLoading}
      error={query.error}
      data={filteredData}
      emptyText="No inventories found"
    >
      <div className="flex flex-col gap-3">
        <InventoriesToolbar
          selectedCount={selectedIds.size}
          onDelete={(): void => {
            void handleDelete();
          }}
          onMakePublic={(): void => {
            void handleMakePublic();
          }}
          onMakePrivate={(): void => {
            void handleMakePrivate();
          }}
          onClearSelection={handleClearSelection}
          isDeleting={deleteMutation.isPending}
          isMakingPublic={visibilityMutation.isPending && lastVisibilityAction.current === 'public'}
          isMakingPrivate={
            visibilityMutation.isPending && lastVisibilityAction.current === 'private'
          }
        />

        <InventoriesBasicTable
          items={view.sortedItems}
          columns={INVENTORY_COLUMNS}
          getRowId={(row) => row.id}
          sortKey={view.sortKey}
          sortOrder={view.sortOrder}
          onSort={view.handleSort}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          isAllSelected={isAllSelected}
        />
      </div>
    </LoadingErrorEmptySwitcher>
  );
};

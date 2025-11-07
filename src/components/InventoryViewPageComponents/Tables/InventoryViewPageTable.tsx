import { type JSX, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllItems, useDeleteItems } from '../../../hooks/items/useItems';
import { useGetInventoryById } from '../../../hooks/inventories/useInventories';
import { LoadingErrorEmptySwitcher } from '../../Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { ItemsTableWithSelection } from './ItemsTableWithSelection';
import type { SortOrder } from '../../Tables/SortableHeader/SortableHeader';
import { ItemsToolbar } from './ItemsToolbar';

interface InventoryViewPageTableProperties {
  canEdit: boolean;
}

export const InventoryViewPageTable = ({
  canEdit,
}: InventoryViewPageTableProperties): JSX.Element => {
  const { inventoryId } = useParams<{ inventoryId: string }>();
  const [sortKey, setSortKey] = useState<'createdAt' | 'updatedAt' | 'customId'>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const deleteMutation = useDeleteItems();

  const { data: inventory } = useGetInventoryById(inventoryId ?? '');
  const { data, isLoading, error } = useGetAllItems(inventoryId ?? '', {
    sortBy: sortKey,
    order: sortOrder,
  });

  const handleSort = (key: string): void => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      if (key === 'createdAt' || key === 'updatedAt' || key === 'customId') {
        setSortKey(key);
        setSortOrder('asc');
      }
    }
  };

  const handleSelectAll = useCallback(
    (checked: boolean): void => {
      if (checked && data?.items) {
        setSelectedIds(new Set(data.items.map((item) => item.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [data?.items]
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

  const handleDelete = async (): Promise<void> => {
    if (!inventoryId || selectedIds.size === 0) return;

    const itemsToDelete = [...selectedIds].map((id) => {
      const item = data?.items.find((index) => index.id === id);
      return {
        id,
        version: item?.version ?? 0,
      };
    });

    await deleteMutation.mutateAsync({
      inventoryId,
      items: { items: itemsToDelete },
    });

    setSelectedIds(new Set());
  };

  const handleClearSelection = (): void => {
    setSelectedIds(new Set());
  };

  const isAllSelected =
    data?.items && selectedIds.size === data.items.length && data.items.length > 0;

  return (
    <LoadingErrorEmptySwitcher
      isLoading={isLoading}
      error={error}
      data={data}
      emptyText="No items found in this inventory"
      errorTitle="Failed to load items"
    >
      <div className="flex flex-col gap-3">
        {canEdit && (
          <ItemsToolbar
            selectedCount={selectedIds.size}
            onDelete={(): void => {
              void handleDelete();
            }}
            onClearSelection={handleClearSelection}
            isDeleting={deleteMutation.isPending}
          />
        )}

        {data?.items && (
          <ItemsTableWithSelection
            items={data.items}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            isAllSelected={!!isAllSelected}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
            canEdit={canEdit}
            inventoryFields={inventory?.fields}
          />
        )}
      </div>
    </LoadingErrorEmptySwitcher>
  );
};

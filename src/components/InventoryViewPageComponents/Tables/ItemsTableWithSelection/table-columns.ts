import type { FieldKey, InventoryFields } from '../../../../api/InventoryService/inventory.schemas';
import {
  FIELD_KEYS,
  NAME_KEYS,
  STATE_KEYS,
} from '../../../../api/InventoryService/inventory.schemas';
import { FieldStates } from '../../../../shared/types/enums';

export type ColumnConfig = {
  key: 'customId' | 'likes' | FieldKey;
  label: string;
  width?: string;
};

function getField<F extends keyof InventoryFields>(
  fields: InventoryFields | null | undefined,
  key: F
): unknown {
  return fields ? Reflect.get(fields, key) : undefined;
}

export function buildColumns(inventoryFields?: InventoryFields | null): ColumnConfig[] {
  const columns: ColumnConfig[] = [
    { key: 'customId', label: 'ID', width: '12%' },
    { key: 'likes', label: 'Likes', width: '8%' },
  ];

  const hasConfiguredFields = FIELD_KEYS.some(
    (k) => getField(inventoryFields, STATE_KEYS[k]) === FieldStates.SHOWN
  );

  if (!hasConfiguredFields) {
    columns.push({ key: 'text1', label: 'Name', width: '80%' });
    return columns;
  }

  let visibleCount = 0;

  for (const fieldKey of FIELD_KEYS) {
    const state = getField(inventoryFields, STATE_KEYS[fieldKey]);
    const nameValue = getField(inventoryFields, NAME_KEYS[fieldKey]);
    const label =
      typeof nameValue === 'string' && nameValue.trim()
        ? nameValue
        : String(fieldKey).toUpperCase();

    if (state === FieldStates.SHOWN) {
      visibleCount += 1;
      columns.push({
        key: fieldKey,
        label,
        width: visibleCount <= 5 ? '20%' : '15%',
      });
    }
  }

  return columns;
}

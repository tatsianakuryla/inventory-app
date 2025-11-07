import { type JSX, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useGetInventoryById } from '../../../../hooks/inventories/useInventories';
import { InventoriesService } from '../../../../api/InventoryService/InventoryService';
import { Button } from '../../../Button/Button';
import { Spinner } from '../../../Spinner/Spinner';

interface InventoryCustomFieldsTabProperties {
  inventoryId: string;
}

type FieldState = 'HIDDEN' | 'OPTIONAL' | 'REQUIRED' | 'SHOWN';

type FieldConfig = {
  state: FieldState;
  name: string | undefined;
  desc: string | undefined;
  showInTable: boolean;
};

type FieldType = 'text' | 'long' | 'num' | 'link' | 'bool';

const FIELD_DEFINITIONS: Array<{
  key: string;
  label: string;
  type: FieldType;
  defaultName: string;
}> = [
  { key: 'text1', label: 'Short Text 1', type: 'text', defaultName: 'Text 1' },
  { key: 'text2', label: 'Short Text 2', type: 'text', defaultName: 'Text 2' },
  { key: 'text3', label: 'Short Text 3', type: 'text', defaultName: 'Text 3' },
  { key: 'long1', label: 'Long Text 1', type: 'long', defaultName: 'Description 1' },
  { key: 'long2', label: 'Long Text 2', type: 'long', defaultName: 'Description 2' },
  { key: 'long3', label: 'Long Text 3', type: 'long', defaultName: 'Description 3' },
  { key: 'num1', label: 'Number 1', type: 'num', defaultName: 'Number 1' },
  { key: 'num2', label: 'Number 2', type: 'num', defaultName: 'Number 2' },
  { key: 'num3', label: 'Number 3', type: 'num', defaultName: 'Number 3' },
  { key: 'link1', label: 'Link 1', type: 'link', defaultName: 'Link 1' },
  { key: 'link2', label: 'Link 2', type: 'link', defaultName: 'Link 2' },
  { key: 'link3', label: 'Link 3', type: 'link', defaultName: 'Link 3' },
  { key: 'bool1', label: 'Checkbox 1', type: 'bool', defaultName: 'Boolean 1' },
  { key: 'bool2', label: 'Checkbox 2', type: 'bool', defaultName: 'Boolean 2' },
  { key: 'bool3', label: 'Checkbox 3', type: 'bool', defaultName: 'Boolean 3' },
];

export const InventoryCustomFieldsTab = ({
  inventoryId,
}: InventoryCustomFieldsTabProperties): JSX.Element => {
  const { data: inventory, isLoading } = useGetInventoryById(inventoryId);
  const [fields, setFields] = useState<Record<string, FieldConfig>>({});

  const updateMutation = useMutation({
    mutationFn: (body: { version: number; patch: Record<string, unknown> }) =>
      InventoriesService.updateFields(inventoryId, body),
    onSuccess: () => {},
    onError: () => {},
  });

  useEffect(() => {
    if (inventory?.fields) {
      const initialFields: Record<string, FieldConfig> = {};
      const fieldsData: Record<string, unknown> = inventory.fields;

      for (const { key } of FIELD_DEFINITIONS) {
        const stateValue = fieldsData[`${key}State`];
        const nameValue = fieldsData[`${key}Name`];
        const descValue = fieldsData[`${key}Desc`];
        const showInTableValue = fieldsData[`${key}ShowInTable`];

        initialFields[key] = {
          state:
            stateValue === 'HIDDEN' ||
            stateValue === 'SHOWN' ||
            stateValue === 'OPTIONAL' ||
            stateValue === 'REQUIRED'
              ? stateValue
              : 'HIDDEN',
          name: typeof nameValue === 'string' ? nameValue : undefined,
          desc: typeof descValue === 'string' ? descValue : undefined,
          showInTable: Boolean(showInTableValue),
        };
      }
      setFields(initialFields);
    }
  }, [inventory]);

  const updateField = (key: string, updates: Partial<FieldConfig>): void => {
    setFields((previous) => ({
      ...previous,
      [key]: { ...previous[key], ...updates },
    }));
  };

  const handleSave = (): void => {
    const version = inventory?.fields?.version;
    if (typeof version !== 'number') {
      console.warn('Unable to save: version information is missing');
      return;
    }

    const patch: Record<string, unknown> = {};
    for (const { key } of FIELD_DEFINITIONS) {
      const field = fields[key];
      if (field) {
        patch[`${key}State`] = field.state;
        patch[`${key}Name`] = field.name;
        patch[`${key}Desc`] = field.desc;
        patch[`${key}ShowInTable`] = field.showInTable;
      }
    }
    updateMutation.mutate({ version, patch });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Custom Fields Configuration</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure custom field names, descriptions, and visibility for items in this inventory.
        </p>
      </div>

      <div className="space-y-4">
        {FIELD_DEFINITIONS.map(({ key, label, type, defaultName }) => {
          const field = fields[key] || {
            state: 'HIDDEN',
            name: undefined,
            desc: undefined,
            showInTable: false,
          };

          return (
            <div
              key={key}
              className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {label} ({type})
                  </label>
                  <select
                    value={field.state}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (
                        value === 'HIDDEN' ||
                        value === 'SHOWN' ||
                        value === 'OPTIONAL' ||
                        value === 'REQUIRED'
                      ) {
                        updateField(key, { state: value });
                      }
                    }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="HIDDEN">Hidden</option>
                    <option value="SHOWN">Shown (optional)</option>
                    <option value="OPTIONAL">Optional</option>
                    <option value="REQUIRED">Required</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Custom Name</label>
                  <input
                    type="text"
                    value={field.name || ''}
                    onChange={(event) =>
                      updateField(key, { name: event.target.value || undefined })
                    }
                    placeholder={defaultName}
                    disabled={field.state === 'HIDDEN'}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Description</label>
                  <input
                    type="text"
                    value={field.desc || ''}
                    onChange={(event) =>
                      updateField(key, { desc: event.target.value || undefined })
                    }
                    placeholder={`Description for ${defaultName}`}
                    disabled={field.state === 'HIDDEN'}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.showInTable}
                      onChange={(event) => updateField(key, { showInTable: event.target.checked })}
                      disabled={field.state === 'HIDDEN'}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">Show in table</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="primary" onClick={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>

      <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 text-sm dark:border-blue-700 dark:bg-blue-900/20">
        <h4 className="mb-2 font-semibold">💡 Field States:</h4>
        <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Hidden:</strong> Field is not visible in forms or tables
          </li>
          <li>
            <strong>Shown:</strong> Field is visible but optional
          </li>
          <li>
            <strong>Optional:</strong> Field is visible and users can optionally fill it
          </li>
          <li>
            <strong>Required:</strong> Field must be filled when creating/editing items
          </li>
        </ul>
      </div>
    </div>
  );
};

import { type JSX, useState, useEffect } from 'react';
import {
  useGetInventoryById,
  useUpdateInventoryFields,
} from '../../../../hooks/inventories/useInventories';
import { Button } from '../../../Button/Button';
import { Spinner } from '../../../Spinner/Spinner';
import { FieldStates, type FieldState } from '../../../../shared/types/enums';
import { FIELD_DEFINITIONS } from './field-definitions';
import { FieldCard } from './FieldCard';
import { SaveStatusMessage } from './SaveStatusMessage';
import { InfoBox } from './InfoBox';

interface InventoryCustomFieldsTabProperties {
  inventoryId: string;
}

type FieldConfig = {
  state: FieldState;
  name: string | undefined;
  desc: string | undefined;
};

export const InventoryCustomFieldsTab = ({
  inventoryId,
}: InventoryCustomFieldsTabProperties): JSX.Element => {
  const { data: inventory, isLoading } = useGetInventoryById(inventoryId);
  const [fields, setFields] = useState<Record<string, FieldConfig>>({});
  const [saveMessage, setSaveMessage] = useState<string | undefined>();

  const updateMutation = useUpdateInventoryFields();

  useEffect(() => {
    if (inventory?.fields) {
      const initialFields: Record<string, FieldConfig> = {};
      const fieldsData: Record<string, unknown> = inventory.fields;

      for (const { key } of FIELD_DEFINITIONS) {
        const stateValue = fieldsData[`${key}State`];
        const nameValue = fieldsData[`${key}Name`];
        const descValue = fieldsData[`${key}Desc`];

        initialFields[key] = {
          state:
            stateValue === FieldStates.HIDDEN || stateValue === FieldStates.SHOWN
              ? stateValue
              : FieldStates.HIDDEN,
          name: typeof nameValue === 'string' ? nameValue : undefined,
          desc: typeof descValue === 'string' ? descValue : undefined,
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
      setSaveMessage('❌ Unable to save: version is missing');
      return;
    }

    const patch: Record<string, unknown> = {};
    for (const { key } of FIELD_DEFINITIONS) {
      const field = fields[key];
      if (field) {
        patch[`${key}State`] = field.state;
        patch[`${key}Name`] = field.name;
        patch[`${key}Desc`] = field.desc;
        patch[`${key}ShowInTable`] = field.state === FieldStates.SHOWN;
      }
    }

    updateMutation.mutate(
      { inventoryId, data: { version, patch } },
      {
        onSuccess: () => {
          setSaveMessage('✅ Configuration saved successfully!');
          setTimeout(() => setSaveMessage(undefined), 3000);
        },
        onError: (error: Error) => {
          setSaveMessage(`❌ Error: ${error.message}`);
          setTimeout(() => setSaveMessage(undefined), 5000);
        },
      }
    );
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
            state: FieldStates.HIDDEN,
            name: undefined,
            desc: undefined,
          };

          return (
            <FieldCard
              key={key}
              fieldKey={key}
              label={label}
              type={type}
              defaultName={defaultName}
              field={field}
              onUpdate={(updates) => updateField(key, updates)}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button variant="primary" onClick={handleSave} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>

        {saveMessage && <SaveStatusMessage message={saveMessage} />}
      </div>

      <InfoBox />
    </div>
  );
};

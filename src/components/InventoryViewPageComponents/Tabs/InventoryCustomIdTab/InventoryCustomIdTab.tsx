import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { InventoriesService } from '../../../../api/InventoryService/InventoryService';
import { Button } from '../../../Button/Button';
import { Spinner } from '../../../Spinner/Spinner';

interface InventoryCustomIdTabProperties {
  inventoryId: string;
}

type ElementType =
  | 'FIXED_TEXT'
  | 'RANDOM_20BIT'
  | 'RANDOM_32BIT'
  | 'RANDOM_6DIGIT'
  | 'RANDOM_9DIGIT'
  | 'GUID'
  | 'DATETIME'
  | 'SEQUENCE';

interface CustomIdElement {
  type: ElementType;
  value?: string;
  format?: string;
  leadingZeros?: boolean;
  separator?: string;
  sequenceName?: string;
}

interface CustomIdFormatSchema {
  maxLength?: number;
  elements: CustomIdElement[];
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const hasKey = <K extends string>(object: unknown, key: K): object is Record<K, unknown> =>
  isObject(object) && key in object;

function pickAxiosMessage(error: unknown): string | undefined {
  if (!isObject(error)) return;
  const response = hasKey(error, 'response') ? error.response : undefined;
  const data = isObject(response) && hasKey(response, 'data') ? response.data : undefined;
  const message = isObject(data) && hasKey(data, 'message') ? data.message : undefined;
  return typeof message === 'string' ? message : undefined;
}

type CurrentFormat = { schema?: unknown; version?: number };
function pickInventoryIdFormat(inventory: unknown): CurrentFormat | undefined {
  if (!isObject(inventory) || !hasKey(inventory, 'InventoryIdFormat')) return undefined;
  const format = inventory.InventoryIdFormat;
  if (!isObject(format)) return undefined;

  const result: CurrentFormat = {};
  if (hasKey(format, 'schema')) result.schema = format.schema;
  if (hasKey(format, 'version') && typeof format.version === 'number') {
    result.version = format.version;
  }
  return result;
}

function isValidCustomIdSchema(value: unknown): value is CustomIdFormatSchema {
  if (!isObject(value)) return false;
  const elements = hasKey(value, 'elements') ? value.elements : undefined;
  return Array.isArray(elements);
}

const ELEMENT_TYPES: { value: ElementType; label: string; description: string }[] = [
  { value: 'FIXED_TEXT', label: 'Fixed Text', description: 'Static text (Unicode supported)' },
  { value: 'RANDOM_20BIT', label: '20-bit Random', description: 'Random number (0-1,048,575)' },
  { value: 'RANDOM_32BIT', label: '32-bit Random', description: 'Random number (0-4,294,967,295)' },
  { value: 'RANDOM_6DIGIT', label: '6-digit Random', description: 'Random 6-digit number' },
  { value: 'RANDOM_9DIGIT', label: '9-digit Random', description: 'Random 9-digit number' },
  { value: 'GUID', label: 'GUID', description: 'Globally unique identifier' },
  { value: 'DATETIME', label: 'Date/Time', description: 'Creation timestamp' },
  { value: 'SEQUENCE', label: 'Sequence', description: 'Auto-incrementing number (required)' },
];

const DATE_FORMATS = [
  { value: 'YYYYMMDD', label: 'YYYYMMDD (20251106)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2025-11-06)' },
  { value: 'YYYY-MM', label: 'YYYY-MM (2025-11)' },
  { value: 'YYYY', label: 'YYYY (2025)' },
  { value: 'YYYYMM', label: 'YYYYMM (202511)' },
  { value: 'HHMMSS', label: 'HHMMSS (143201)' },
  { value: 'HH:MM:SS', label: 'HH:MM:SS (14:32:01)' },
  { value: 'ISO', label: 'ISO 8601' },
  { value: 'timestamp', label: 'Unix timestamp' },
];

export const InventoryCustomIdTab = ({
  inventoryId,
}: InventoryCustomIdTabProperties): JSX.Element => {
  const [schema, setSchema] = useState<CustomIdFormatSchema>({
    elements: [{ type: 'SEQUENCE' }],
  });

  const { data: currentFormat, isLoading } = useQuery({
    queryKey: ['inventoryIdFormat', inventoryId],
    queryFn: async (): Promise<CurrentFormat | undefined> => {
      const inventory = await InventoriesService.getById(inventoryId);
      return pickInventoryIdFormat(inventory);
    },
  });

  const {
    data: previewData,
    error: previewError,
    refetch: refetchPreview,
  } = useQuery({
    queryKey: ['customIdPreview', inventoryId],
    queryFn: async (): Promise<{ preview?: string }> => {
      const result = await InventoriesService.previewCustomId(inventoryId);
      return isObject(result) && typeof result.preview === 'string'
        ? { preview: result.preview }
        : { preview: undefined };
    },
    enabled: false,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: (body: { schema: CustomIdFormatSchema; version?: number }) =>
      InventoriesService.updateIdFormat(inventoryId, body),
    onSuccess: () => {
      void refetchPreview();
    },
    onError: (error: unknown) => {
      const message =
        pickAxiosMessage(error) ??
        (isObject(error) && typeof error.message === 'string' ? error.message : 'Unknown error');
      console.error('Failed to update custom ID format:', message);
    },
  });

  useEffect(() => {
    const candidate = currentFormat?.schema;
    if (isValidCustomIdSchema(candidate)) {
      setSchema(candidate);
    }
  }, [currentFormat]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void refetchPreview();
    }, 500);
    return () => clearTimeout(timer);
  }, [schema, refetchPreview]);

  const addElement = (type: ElementType): void => {
    const newElement: CustomIdElement = {
      type,
      ...(type === 'DATETIME' ? { format: 'YYYYMMDD' } : {}),
    };
    setSchema((previous) => ({ ...previous, elements: [...previous.elements, newElement] }));
  };

  const removeElement = (index: number): void => {
    setSchema((previous) => ({
      ...previous,
      elements: previous.elements.filter((_, index_) => index_ !== index),
    }));
  };

  const updateElement = (index: number, updates: Partial<CustomIdElement>): void => {
    setSchema((previous) => {
      const elements = [...previous.elements];
      elements[index] = { ...elements[index], ...updates };
      return { ...previous, elements };
    });
  };

  const moveElement = (index: number, direction: 'up' | 'down'): void => {
    setSchema((previous) => {
      const elements = [...previous.elements];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= elements.length) return previous;
      [elements[index], elements[target]] = [elements[target], elements[index]];
      return { ...previous, elements };
    });
  };

  const handleSave = (): void => {
    const sequenceCount = schema.elements.filter((element) => element.type === 'SEQUENCE').length;
    if (sequenceCount !== 1) {
      console.warn('Format must contain exactly one SEQUENCE element!');
      return;
    }
    updateMutation.mutate({ schema, version: currentFormat?.version });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const sequenceCount = schema.elements.filter((element) => element.type === 'SEQUENCE').length;
  const previewText = previewError
    ? (pickAxiosMessage(previewError) ?? 'Error loading preview')
    : (previewData?.preview ?? 'Loading...');
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Custom Item ID Format</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Define how item IDs are generated. Each format must contain exactly one SEQUENCE element.
        </p>
      </div>

      <div
        className={`${previewError ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'} rounded-lg border p-4`}
      >
        <h3
          className={`mb-2 text-sm font-semibold ${previewError ? 'text-red-900 dark:text-red-100' : 'text-blue-900 dark:text-blue-100'}`}
        >
          Preview (Next ID):
        </h3>
        <div
          className={`font-mono text-lg font-bold ${previewError ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'}`}
        >
          {previewText}
        </div>
        <p
          className={`mt-1 text-xs ${previewError ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}
        >
          {previewError
            ? 'Fix the errors to see a preview'
            : 'This shows what the next generated ID will look like'}
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">ID Elements (in order)</h3>
        {schema.elements.length === 0 ? (
          <p className="text-sm italic text-gray-500">No elements added yet</p>
        ) : (
          schema.elements.map((element, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveElement(index, 'up')}
                    disabled={index === 0}
                    className="rounded bg-gray-100 px-2 py-1 text-xs disabled:opacity-30 dark:bg-gray-700"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveElement(index, 'down')}
                    disabled={index === schema.elements.length - 1}
                    className="rounded bg-gray-100 px-2 py-1 text-xs disabled:opacity-30 dark:bg-gray-700"
                  >
                    ▼
                  </button>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {ELEMENT_TYPES.find((t) => t.value === element.type)?.label || element.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeElement(index)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  {element.type === 'FIXED_TEXT' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium">Text Value</label>
                      <input
                        type="text"
                        value={element.value || ''}
                        onChange={(event) => updateElement(index, { value: event.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                        placeholder="Enter text (Unicode supported)"
                      />
                    </div>
                  )}
                  {element.type === 'DATETIME' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium">Date Format</label>
                      <select
                        value={element.format || 'YYYYMMDD'}
                        onChange={(event) => updateElement(index, { format: event.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                      >
                        {DATE_FORMATS.map((fmt) => (
                          <option key={fmt.value} value={fmt.value}>
                            {fmt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {(element.type === 'RANDOM_20BIT' ||
                    element.type === 'RANDOM_32BIT' ||
                    element.type === 'SEQUENCE') && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`leadingZeros-${index}`}
                        checked={element.leadingZeros || false}
                        onChange={(event) =>
                          updateElement(index, { leadingZeros: event.target.checked })
                        }
                        className="h-4 w-4"
                      />
                      <label htmlFor={`leadingZeros-${index}`} className="text-sm">
                        Use leading zeros
                      </label>
                    </div>
                  )}
                  {element.type === 'SEQUENCE' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Sequence Name (optional)
                      </label>
                      <input
                        type="text"
                        value={element.sequenceName || ''}
                        onChange={(event) =>
                          updateElement(index, { sequenceName: event.target.value })
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                        placeholder="default"
                      />
                    </div>
                  )}
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Separator (after this element)
                    </label>
                    <input
                      type="text"
                      value={element.separator || ''}
                      onChange={(event) => updateElement(index, { separator: event.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="e.g., - or _"
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-gray-300 pt-4 dark:border-gray-600">
        <h3 className="mb-3 text-lg font-semibold">Add Element</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {ELEMENT_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => addElement(type.value)}
              disabled={type.value === 'SEQUENCE' && sequenceCount >= 1}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700"
              title={type.description}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      {sequenceCount !== 1 && (
        <div className="rounded-lg border border-yellow-400 bg-yellow-50 p-3 dark:border-yellow-700 dark:bg-yellow-900/20">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            ⚠️ Warning: Format must contain exactly one SEQUENCE element (currently: {sequenceCount}
            )
          </p>
        </div>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Maximum ID Length (optional, leave empty for no limit)
        </label>
        <input
          type="number"
          value={schema.maxLength || ''}
          onChange={(event) =>
            setSchema({
              ...schema,
              maxLength: event.target.value ? Number(event.target.value) : undefined,
            })
          }
          className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          placeholder="No limit"
          min={1}
        />
      </div>
      <div className="flex gap-3">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={updateMutation.isPending || sequenceCount !== 1}
        >
          {updateMutation.isPending ? 'Saving...' : 'Save Format'}
        </Button>
        <Button
          variant="secondary"
          onClick={(): void => {
            const candidate = currentFormat?.schema;
            if (isValidCustomIdSchema(candidate)) {
              setSchema(candidate);
            }
          }}
        >
          Reset
        </Button>
      </div>
      <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm dark:border-gray-600 dark:bg-gray-800">
        <h4 className="mb-2 font-semibold">💡 Tips:</h4>
        <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
          <li>Use drag buttons (▲▼) to reorder elements</li>
          <li>Add separators like "-" or "_" between elements for readability</li>
          <li>SEQUENCE is required and auto-increments for each new item</li>
          <li>Preview updates automatically as you make changes</li>
          <li>Random elements show as "0" in preview but will be random when items are created</li>
          <li>Existing item IDs won't change when you update the format</li>
        </ul>
      </div>
    </div>
  );
};

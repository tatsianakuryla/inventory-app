import type { JSX } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';

const isLikelyUrl = (value?: string | null): boolean => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export function ImageUrl({ disabled }: { disabled?: boolean }): JSX.Element {
  const methods = useFormContext<InventoryCreateRequestInput>();
  const imageUrl = useWatch({ control: methods.control, name: 'imageUrl' });

  return (
    <div className="flex flex-col gap-2">
      <FormInput
        name="imageUrl"
        label="Cover Image URL"
        type="text"
        placeholder="https://example.com/image.jpg"
        disabled={disabled}
      />
      {isLikelyUrl(imageUrl) && (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="aspect-[16/9] w-full bg-gray-50 dark:bg-gray-900">
            <img
              src={imageUrl ?? ''}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

import type { JSX } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import type { InventoryCreateRequestInput } from '../../../api/InventoryService/inventory.schemas';
import * as styles from './image-url.styles';

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
    <div className={styles.container}>
      <FormInput
        name="imageUrl"
        label="Cover Image URL"
        type="text"
        placeholder="https://example.com/image.jpg"
        disabled={disabled}
      />
      {isLikelyUrl(imageUrl) && (
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <img
              src={imageUrl ?? ''}
              className={styles.image}
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

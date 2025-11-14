import type { JSX } from 'react';
import { FieldStates, type FieldState } from '../../../../shared/types/enums';
import type { FieldType } from './field-definitions';
import * as styles from './field-card.styles';

interface FieldConfig {
  state: FieldState;
  name: string | undefined;
  desc: string | undefined;
}

interface FieldCardProperties {
  fieldKey: string;
  label: string;
  type: FieldType;
  defaultName: string;
  field: FieldConfig;
  onUpdate: (updates: Partial<FieldConfig>) => void;
}

export const FieldCard = ({
  fieldKey,
  label,
  type,
  defaultName,
  field,
  onUpdate,
}: FieldCardProperties): JSX.Element => {
  return (
    <div key={fieldKey} className={styles.card}>
      <div className={styles.fieldsRow}>
        <div>
          <label className={styles.label}>
            {label} ({type})
          </label>
          <select
            value={field.state}
            onChange={(event) => {
              const value = event.target.value;
              if (value === FieldStates.HIDDEN || value === FieldStates.SHOWN) {
                onUpdate({ state: value });
              }
            }}
            className={styles.select}
          >
            <option value={FieldStates.HIDDEN}>Hidden</option>
            <option value={FieldStates.SHOWN}>Shown</option>
          </select>
        </div>

        <div>
          <label className={styles.label}>Custom Name</label>
          <input
            type="text"
            value={field.name || ''}
            onChange={(event) => onUpdate({ name: event.target.value || undefined })}
            placeholder={defaultName}
            disabled={field.state === FieldStates.HIDDEN}
            className={styles.input}
          />
        </div>

        <div className={styles.descriptionField}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={field.desc || ''}
            onChange={(event) => onUpdate({ desc: event.target.value || undefined })}
            placeholder={`Description for ${defaultName}`}
            disabled={field.state === FieldStates.HIDDEN}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

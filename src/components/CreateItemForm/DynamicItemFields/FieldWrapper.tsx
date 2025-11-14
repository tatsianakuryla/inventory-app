import type { JSX, ReactNode } from 'react';
import * as styles from './dynamic-item-fields.styles';

interface FieldWrapperProperties {
  children: ReactNode;
  label?: string | null;
  desc?: string | null;
}

export const FieldWrapper = ({ children, label, desc }: FieldWrapperProperties): JSX.Element => (
  <div className={styles.fieldWrapper}>
    {label && <label className={styles.label}>{label}</label>}
    {desc && <p className={styles.hint}>{desc}</p>}
    {children}
  </div>
);

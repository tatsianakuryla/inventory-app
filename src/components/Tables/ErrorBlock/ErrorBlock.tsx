import type { JSX } from 'react';
import { container, titleClass, messageClass } from './error-block.styles';

interface ErrorBlockProperties {
  title: string;
  message?: string;
}

export const ErrorBlock = ({ title, message }: ErrorBlockProperties): JSX.Element => {
  return (
    <div className={container}>
      <p className={titleClass}>{title}</p>
      {message && <p className={messageClass}>{message}</p>}
    </div>
  );
};

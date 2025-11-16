import { type JSX } from 'react';
import {
  fieldLabelWrapperClassName,
  fieldLabelSecondaryClassName,
  emailValueContainerClassName,
} from './profile-edit-form.styles';

type EmailDisplayProperties = {
  email: string;
};

export const EmailDisplay = ({ email }: EmailDisplayProperties): JSX.Element => {
  return (
    <div className={fieldLabelWrapperClassName}>
      <label className={fieldLabelSecondaryClassName}>Email (cannot be changed)</label>
      <div className={emailValueContainerClassName}>{email}</div>
    </div>
  );
};

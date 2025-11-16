import { type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import {
  fieldLabelWrapperClassName,
  fieldLabelClassName,
  requiredAsteriskClassName,
  optionsRowWrapperClassName,
  optionLabelBaseClassName,
  optionLabelUnselectedClassName,
  languageOptionTitleClassName,
  languageOptionSubtitleClassName,
  themeLightOptionSelectedClassName,
  themeDarkOptionSelectedClassName,
} from './profile-edit-form.styles';
import { type Theme, Themes } from '../../../shared/types/enums';

type ProfileEditFormValues = {
  theme: Theme;
};

export const ThemeSelector = (): JSX.Element => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileEditFormValues>();

  const selectedTheme = watch('theme');

  return (
    <div className={fieldLabelWrapperClassName}>
      <label className={fieldLabelClassName}>
        Theme <span className={requiredAsteriskClassName}>*</span>
      </label>
      <div className={optionsRowWrapperClassName}>
        <label
          className={`${optionLabelBaseClassName} ${
            selectedTheme === Themes.LIGHT
              ? themeLightOptionSelectedClassName
              : optionLabelUnselectedClassName
          }`}
        >
          <input
            type="radio"
            value={Themes.LIGHT}
            {...register('theme')}
            className="h-4 w-4 text-yellow-600"
          />
          <div className="flex-1">
            <span className={languageOptionTitleClassName}>Light Mode</span>
            <span className={languageOptionSubtitleClassName}>☀️ Bright</span>
          </div>
        </label>

        <label
          className={`${optionLabelBaseClassName} ${
            selectedTheme === Themes.DARK
              ? themeDarkOptionSelectedClassName
              : optionLabelUnselectedClassName
          }`}
        >
          <input
            type="radio"
            value={Themes.DARK}
            {...register('theme')}
            className="h-4 w-4 text-indigo-600"
          />
          <div className="flex-1">
            <span className={languageOptionTitleClassName}>Dark Mode</span>
            <span className={languageOptionSubtitleClassName}>🌙 Dark</span>
          </div>
        </label>
      </div>
      {errors.theme?.message && typeof errors.theme.message === 'string' && (
        <ErrorBlock>{errors.theme.message}</ErrorBlock>
      )}
    </div>
  );
};

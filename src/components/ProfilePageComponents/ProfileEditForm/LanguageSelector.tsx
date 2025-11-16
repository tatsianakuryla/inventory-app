import { type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { type Language, Languages } from '../../../shared/types/enums';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import {
  fieldLabelWrapperClassName,
  fieldLabelClassName,
  requiredAsteriskClassName,
  optionsRowWrapperClassName,
  optionLabelBaseClassName,
  optionLabelSelectedGreenClassName,
  optionLabelUnselectedClassName,
  languageOptionTitleClassName,
  languageOptionSubtitleClassName,
  radioInputGreenClassName,
} from './profile-edit-form.styles';

type ProfileEditFormValues = {
  language: Language;
};

export const LanguageSelector = (): JSX.Element => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileEditFormValues>();

  const selectedLanguage = watch('language');

  return (
    <div className={fieldLabelWrapperClassName}>
      <label className={fieldLabelClassName}>
        Language <span className={requiredAsteriskClassName}>*</span>
      </label>
      <div className={optionsRowWrapperClassName}>
        <label
          className={`${optionLabelBaseClassName} ${
            selectedLanguage === Languages.EN
              ? optionLabelSelectedGreenClassName
              : optionLabelUnselectedClassName
          }`}
        >
          <input
            type="radio"
            value={Languages.EN}
            {...register('language')}
            className={radioInputGreenClassName}
          />
          <div className="flex-1">
            <span className={languageOptionTitleClassName}>English</span>
            <span className={languageOptionSubtitleClassName}>EN</span>
          </div>
        </label>

        <label
          className={`${optionLabelBaseClassName} ${
            selectedLanguage === Languages.RU
              ? optionLabelSelectedGreenClassName
              : optionLabelUnselectedClassName
          }`}
        >
          <input
            type="radio"
            value={Languages.RU}
            {...register('language')}
            className={radioInputGreenClassName}
          />
          <div className="flex-1">
            <span className={languageOptionTitleClassName}>Русский</span>
            <span className={languageOptionSubtitleClassName}>RU</span>
          </div>
        </label>
      </div>
      {errors.language?.message && typeof errors.language.message === 'string' && (
        <ErrorBlock>{errors.language.message}</ErrorBlock>
      )}
    </div>
  );
};

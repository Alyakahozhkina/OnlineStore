import React, { memo, useMemo } from 'react';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import config from './customItems.config';
import { inputCustomPropTypes } from '../../../propsProperties/propTypes/customInputs';
import { inputCustomDefaultProps } from '../../../propsProperties/defaultProps/customInputs';
import { checkError, checkErrorMessage } from './utilsCustomItems';

const {
  outlinedBtnVariant,
} = config;

export const InputCustom = memo(({
 field, form, label, className, ...props
}) => {
  const { t } = useTranslation();
  const { touched, errors } = form;
  const { name } = field;

  const isError = useMemo(() => checkError(errors, touched, name), [errors, name, touched]);
  const errorMessage = useMemo(() => checkErrorMessage(errors, name), [errors, name]);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      label={label}
      variant={outlinedBtnVariant}
      error={isError}
      helperText={isError ? t(`${errorMessage}`) : null}
      className={className}
    />
  );
});

InputCustom.propTypes = inputCustomPropTypes;

InputCustom.defaultProps = inputCustomDefaultProps;

import React, { memo, useCallback, useMemo } from 'react';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import config from './customItems.config';
import { selectCustomPropTypes } from '../../../propsProperties/propTypes/customInputs';
import { selectCustomDefaultProps } from '../../../propsProperties/defaultProps/customInputs';
import { checkError, checkErrorMessage } from './utilsCustomItems';

const {
  divComponent,
  inputSelectId,
  selectLabelId,
  selectId,
} = config;

export const SelectCustom = memo(({
  field, form, label, options, className, ...props
}) => {
  const { t } = useTranslation();
  const { name } = field;
  const { touched, errors, setFieldValue } = form;

  const handleChange = useCallback((e) => setFieldValue(name, e.target.value), [name, setFieldValue]);

  const isError = useMemo(() => checkError(errors, touched, name), [errors, name, touched]);
  const errorMessage = useMemo(() => checkErrorMessage(errors, name), [errors, name]);

  return (
    <FormControl component={divComponent} className={className}>
      <InputLabel id={inputSelectId} error={isError} {...props}>{ label }</InputLabel>
      <Select
        {...field}
        labelId={selectLabelId}
        id={selectId}
        label={label}
        onChange={handleChange}
        error={isError}
      >
        { options.map((elem) => (
          <MenuItem key={elem.value} value={elem.value}>{ elem.value }</MenuItem>
        )) }
      </Select>
      { isError ? <FormHelperText error>{ t(`${errorMessage}`) }</FormHelperText> : null }
    </FormControl>
  );
});

SelectCustom.propTypes = selectCustomPropTypes;

SelectCustom.defaultProps = selectCustomDefaultProps;

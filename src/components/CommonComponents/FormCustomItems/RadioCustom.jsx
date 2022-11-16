import React, { memo, useMemo } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { checkError, checkErrorMessage } from './utilsCustomItems';
import config from './customItems.config';
import { radioCustomPropTypes } from '../../../propsProperties/propTypes/customInputs';
import { radioCustomDefaultProps } from '../../../propsProperties/defaultProps/customInputs';

const {
  ariaLabelledbyRadio,
  labelIdRadio,
  buttonsGroupName,
} = config;

export const RadioCustom = memo(({
  field, form, label, options, className, ...props
}) => {
  const { t } = useTranslation();
  const { name } = field;
  const { touched, errors } = form;

  const isError = useMemo(() => checkError(errors, touched, name), [errors, name, touched]);
  const errorMessage = useMemo(() => checkErrorMessage(errors, name), [errors, name]);

  return (
    <FormControl className={className}>
      <FormLabel id={labelIdRadio}>{ label }</FormLabel>
      <RadioGroup
        row
        aria-labelledby={ariaLabelledbyRadio}
        name={buttonsGroupName}
        {...field}
        {...props}
      >
        {options.map(({ key, value }) => (
          <FormControlLabel key={key} value={key} control={<Radio />} label={value} />
        ))}
      </RadioGroup>
      { isError ? <FormHelperText error>{ t(`${errorMessage}`) }</FormHelperText> : null }
    </FormControl>
  );
});

RadioCustom.propTypes = radioCustomPropTypes;

RadioCustom.defaultProps = radioCustomDefaultProps;

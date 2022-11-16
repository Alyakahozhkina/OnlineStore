import React, { memo, useCallback, useMemo } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectSortBy } from '../../../store/selectors';
import { setSortBy } from '../../../store/reducers/appReducer';
import { sortingIconButtonPropTypes } from '../../../propsProperties/propTypes/products';
import { sortingIconButtonDefaultProps } from '../../../propsProperties/defaultProps/products';

export const SortingIconButton = memo(({ buttonName }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sortedName = useSelector(selectSortBy);

  const handleSort = useCallback(() => dispatch(setSortBy(buttonName)), [buttonName, dispatch]);

  const buttonType = useMemo(() => (sortedName === buttonName ? 'outlined' : 'text'), [buttonName, sortedName]);

  return (
    <Button
      variant={buttonType}
      className="sorting-button"
      color="secondary"
      onClick={handleSort}
    >
      {t(`${buttonName}Label`)}
    </Button>
  );
});

SortingIconButton.propTypes = sortingIconButtonPropTypes;

SortingIconButton.defaultProps = sortingIconButtonDefaultProps;

import React, { memo, useCallback, useMemo, useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, Grid, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { setDirection, setFilterName } from '../../store/reducers/appReducer';
import { SortingIconButton } from '../ComponentsServiceParts/SortingIconButton/SortingIconButton';
import { selectDirectionSort } from '../../store/selectors';
import config from './filtersBar.config';
import './filtersBar.scss';

const {
  emptyString,
  debounceDelay,
  ascDirection,
  descDirection,
} = config;

export const FiltersBar = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filter, setFilter] = useState(emptyString);
  const directionSort = useSelector(selectDirectionSort);

  const dispatchFilter = useCallback((filter) => dispatch(setFilterName(filter)), [dispatch]);

  const debouncedFilter = useDebounce(dispatchFilter, debounceDelay);

  const onFilterChange = useCallback(({ target }) => {
    setFilter(target.value);
    debouncedFilter(target.value);
  }, [debouncedFilter]);

  const changeDirection = useCallback(() => {
    const newDirection = directionSort === ascDirection ? descDirection : ascDirection;
    dispatch(setDirection(newDirection));
  }, [directionSort, dispatch]);

  const arrow = useMemo(() => {
    return directionSort === ascDirection ? <ArrowDropUp fontSize="large" /> : <ArrowDropDown fontSize="large" />
  }, [directionSort]);

  return (
    <>
      <Box className="filters-bar">
        <Grid container className="container">
          <Grid item xs={2} className="filters-bar__sorting">
            <SortingIconButton
              buttonName="name"
            />
            <SortingIconButton
              buttonName="price"
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={changeDirection} className="filters-bar__arrow">
              {arrow}
            </IconButton>
          </Grid>
          <Grid item xs={9} className="filters-bar__filter-product">
            <TextField
              name="filterByName"
              label={t('filterLabel')}
              variant="standard"
              onChange={onFilterChange}
              value={filter}
              className="filter-product"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
});

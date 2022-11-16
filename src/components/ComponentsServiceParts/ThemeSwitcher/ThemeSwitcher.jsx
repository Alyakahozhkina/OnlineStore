import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { FormGroup, Grid, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, selectTheme } from '../../../store/selectors';
import { updateAuthUser } from '../../../thunks/authThunks';
import { setTheme } from '../../../store/reducers/appReducer';
import config from './themeSwitcher.config';
import './themeSwitcher.scss';

const {
  themeSwitcherClass,
  darkTheme,
  lightTheme,
} = config;

export const ThemeSwitcher = memo(() => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const switchTheme = useSelector(selectTheme);

  const changeSwitchTheme = useCallback(() => {
    const theme = switchTheme === lightTheme ? darkTheme : lightTheme;
    if (authUser.theme) {
      const newAuthUser = {
        ...authUser,
        theme,
      };
      dispatch(updateAuthUser({ newAuthUser }));
      return;
    }
    dispatch(setTheme(theme));
  }, [authUser, dispatch, switchTheme]);

  const switchChecked = useMemo(() => switchTheme === darkTheme, [switchTheme]);

  useEffect(() => {
    if (authUser.theme && authUser.theme !== switchTheme) {
      dispatch(setTheme(authUser.theme));
    }
  }, [dispatch, authUser.theme, switchTheme]);

  return (
    <Grid item xs={1}>
      <FormGroup>
        <Switch className={themeSwitcherClass} checked={switchChecked} onChange={changeSwitchTheme} />
      </FormGroup>
    </Grid>
  );
});

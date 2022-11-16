import React, { memo, useCallback, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAuthUser, selectLanguage } from '../../../store/selectors';
import { updateAuthUser } from '../../../thunks/authThunks';
import { setLanguage } from '../../../store/reducers/appReducer';

export const SelectAutoWidth = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authUser = useSelector(selectAuthUser);
  const { language } = authUser;
  const languageSelect = useSelector(selectLanguage);

  const changeLanguage = useCallback(({ target: { value } }) => {
    if (language) {
      const newAuthUser = {
        ...authUser,
        language: value,
      };
      dispatch(updateAuthUser({ newAuthUser }));
      return;
    }
    dispatch(setLanguage(value));
  }, [authUser, dispatch, language]);

  useEffect(() => {
    if (language && language !== languageSelect) {
      dispatch(setLanguage(language));
    }
  }, [dispatch, language, languageSelect]);

  return (
    <div>
      <FormControl>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={languageSelect}
          onChange={changeLanguage}
          autoWidth
        >
          <MenuItem value="ua">{t('uaLang')}</MenuItem>
          <MenuItem value="en">{t('enLang')}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});

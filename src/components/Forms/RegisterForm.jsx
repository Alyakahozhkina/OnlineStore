import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Stack, IconButton, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { InputCustom } from '../CommonComponents/FormCustomItems/InputCustom';
import { closeFormModal } from '../../store/reducers/appReducer';
import { registerFormSchema } from '../../utils/formValidation/registerFormSchema';
import { addAuthUser, addAuthUserInList, getAuthUsersList } from '../../thunks/authThunks';
import { findAuthUser } from '../../services/authService';
import { selectAuthUserList, selectLanguage, selectTheme } from '../../store/selectors';
import config from './forms.config';
import './forms.scss'

const {
  emptyString,
  containedBtnVariant,
  outlinedBtnVariant,
  textType,
  inputClass,
  secondSpacing,
  buttonsBoxClass,
  rowDirection,
  submitBtnType,
  passwordType,
} = config;

export const RegisterForm = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userExistInList, setUserExistInList] = useState(true);
  const authUserList = useSelector(selectAuthUserList);
  const switchTheme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);

  const handleClose = useCallback(() => dispatch(closeFormModal()), [dispatch]);
  const changeVisibilityPassword = useCallback(() => {
    setVisiblePassword(!visiblePassword);
  }, [visiblePassword]);

  const initialFormValues = useMemo(() => ({
    email: emptyString,
    password: emptyString,
    firstName: emptyString,
    lastName: emptyString,
  }), []);

  const passwordVisibility = useMemo(() => (visiblePassword ? textType : passwordType), [visiblePassword]);
  const passwordIconVisibility = useMemo(() => (visiblePassword ? <Visibility /> : <VisibilityOff />), [visiblePassword]);

  useEffect(() => {
    dispatch(getAuthUsersList());
  }, [dispatch]);

  const onSubmit = useCallback((res) => {
    if (findAuthUser(authUserList, res)) {
      setUserExistInList(false);
      return;
    }
    const newAuthUser = {
      ...res,
      roleAdmin: false,
      orderCart: [],
      theme: switchTheme,
      language,
      id: uuidv4(),
    };
    dispatch(addAuthUserInList(newAuthUser));
    dispatch(addAuthUser(newAuthUser));
    toast.success(t('registerSuccessfulToast'));
    handleClose();
  }, [authUserList, dispatch, handleClose, language, switchTheme, t]);

  return (
    <Box className="register-form">
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={registerFormSchema}
        onSubmit={onSubmit}
      >
        <Form className="register-form__form forms">
          <Field
            type={textType}
            name="firstName"
            component={InputCustom}
            label={t('firstNameLabel')}
            className={inputClass}
            required
          />
          <Field
            type={textType}
            name="lastName"
            component={InputCustom}
            label={t('lastNameLabel')}
            className={inputClass}
            required
          />
          <Field
            type={textType}
            name="email"
            component={InputCustom}
            label="Email"
            className={inputClass}
            required
          />
          <Box spacing={secondSpacing} direction={rowDirection} className="forms__password">
            <Field
              type={passwordVisibility}
              name="password"
              component={InputCustom}
              label={t('passwordLabel')}
              className={inputClass}
              required
            />
            <IconButton
              onClick={changeVisibilityPassword}
              className="forms__visible-button"
            >
              {passwordIconVisibility}
            </IconButton>
          </Box>
          {!userExistInList && <Alert severity="error" className="forms__alert">{t('loginRegisterError.userExistInList')}</Alert>}
          <Stack spacing={secondSpacing} direction={rowDirection} className={buttonsBoxClass}>
            <Button variant={containedBtnVariant} type={submitBtnType} className="forms__btn-success">{t('registerAndLogin')}</Button>
            <Button variant={outlinedBtnVariant} onClick={handleClose} className="forms__btn-cancel">{t('cancel')}</Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
});

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack, Alert, IconButton, Box } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { InputCustom } from '../CommonComponents/FormCustomItems/InputCustom';
import { loginFormSchema } from '../../utils/formValidation/loginFormSchema';
import { closeFormModal } from '../../store/reducers/appReducer';
import { addAuthUser, getAuthUsersList } from '../../thunks/authThunks';
import { selectAuthUserList } from '../../store/selectors';
import { checkPasswordUser, findAuthUser } from '../../services/authService';
import config from './forms.config';
import './forms.scss';

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

export const LoginForm = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [userExistInList, setUserExistInList] = useState(true);
  const [validUser, setValidUser] = useState(true);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const authUserList = useSelector(selectAuthUserList);

  const handleClose = useCallback(() => dispatch(closeFormModal()), [dispatch]);

  const changeVisibilityPassword = useCallback(() => {
    setVisiblePassword(!visiblePassword);
  }, [visiblePassword]);

  const initialFormValues = useMemo(() => ({
    email: emptyString,
    password: emptyString,
  }), []);

  const passwordVisibility = useMemo(() => (visiblePassword ? textType : passwordType), [visiblePassword]);
  const passwordIconVisibility = useMemo(() => (visiblePassword ? <Visibility /> : <VisibilityOff />), [visiblePassword]);

  useEffect(() => {
    dispatch(getAuthUsersList());
  }, [dispatch]);

  const onSubmit = useCallback((res) => {
    setUserExistInList(true);
    setValidUser(true);
    const authUser = findAuthUser(authUserList, res);
    const checkedUser = checkPasswordUser(authUserList, res);

    if (checkedUser) {
      dispatch(addAuthUser(checkedUser));
      handleClose();
      toast.success(t('loginSuccessfulToast'));
      return;
    }
    if (!authUser) {
      setUserExistInList(false);
      return;
    }
    setValidUser(false);
  }, [authUserList, dispatch, handleClose, t]);

  return (
    <Box className="login-form">
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={loginFormSchema}
        onSubmit={onSubmit}
      >
        <Form className="login-form__form forms">
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
          {!userExistInList && <Alert severity="error" className="forms__alert">{t('loginRegisterError.userNotExistInList')}</Alert>}
          {!validUser && <Alert severity="error" className="forms__alert">{t('loginRegisterError.validUser')}</Alert>}
          <Stack spacing={secondSpacing} direction={rowDirection} className={buttonsBoxClass}>
            <Button variant={containedBtnVariant} type={submitBtnType} className="forms__btn-success">{t('login')}</Button>
            <Button variant={outlinedBtnVariant} onClick={handleClose} className="forms__btn-cancel">{t('cancel')}</Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
});

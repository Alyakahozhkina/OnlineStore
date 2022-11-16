import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Divider, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { selectFlagLogin, selectOpenLoginModal, selectTheme } from '../../store/selectors';
import { closeFormModal, setLoginForm, setRegisterForm } from '../../store/reducers/appReducer';
import { LoginForm } from '../Forms/LoginForm';
import { RegisterForm } from '../Forms/RegisterForm';
import './loginRegisterModal.scss';

export const LoginRegisterModal = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const open = useSelector(selectOpenLoginModal);
  const flagLogin = useSelector(selectFlagLogin);
  const switchTheme = useSelector(selectTheme);

  const handleClose = useCallback(() => dispatch(closeFormModal()), [dispatch]);
  const setLoginFormVisible = useCallback(() => dispatch(setLoginForm()), [dispatch]);
  const setRegisterFormVisible = useCallback(() => dispatch(setRegisterForm()), [dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`login-register-modal ${switchTheme}`}>
        <Typography variant="h3" className="login-register-modal__title">
          {flagLogin ? t('logIn') : t('signUp')}
        </Typography>
        <Divider />
        {flagLogin ? <LoginForm /> : <RegisterForm />}
        <Typography variant="string" className="login-register-modal__text-box">
          {flagLogin ? (
              <>
                {t('haveNotAccount')}
                <Button variant="text" className="login-register-modal__switch-button" onClick={setRegisterFormVisible}>{t('signUp')}</Button>
              </>
            )
            : (
              <>
                {t('haveAccount')}
                <Button variant="text" className="login-register-modal__switch-button" onClick={setLoginFormVisible}>{t('logIn')}</Button>
              </>
            )}
        </Typography>
      </Box>
    </Modal>
  );
});

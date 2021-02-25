import React from 'react';
import './Register.css';
import Auth from '../Auth/Auth';

function Register({ resetStates, errorMsg, onAuth }) {
  return (
    <Auth
      title={'Добро пожаловать!'}
      submitButtonTitle={'Зарегистрироваться'}
      formPurpose='register'
      footerTitle='Уже зарегистрированы?'
      footerAction='Войти'
      footerLink='/signin'
      errorMsg={errorMsg}
      onAuth={onAuth}
      resetStates={resetStates}
    />
  );
}

export default Register;

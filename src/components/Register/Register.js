import React from 'react';
import './Register.css';
import Auth from '../Auth/Auth';

function Register({ onSignUp, errorMsg }) {
  return (
    <Auth
      title={'Добро пожаловать!'}
      submitButtonTitle={'Зарегистрироваться'}
      formPurpose='register'
      footerTitle='Уже зарегистрированы?'
      footerAction='Войти'
      footerLink='/signin'
      onSignUp={onSignUp}
      errorMsg={errorMsg}
    />
  );
}

export default Register;

import React from 'react';
import './Login.css';
import Auth from '../Auth/Auth';

function Login() {
  return (
    <Auth
      title={'Рады видеть!'}
      submitButtonTitle={'Войти'}
      formPurpose='login'
      footerTitle='Ещё не зарегистрированы?'
      footerAction='Регистрация'
      footerLink='/signup'
    />
  );
}

export default Login;

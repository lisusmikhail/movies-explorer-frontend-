import React from 'react';
import './Login.css';
import Auth from '../Auth/Auth';

function Login({ resetStates, errorMsg, onAuth, isLoggedIn }) {
  return (
    <Auth
      title={'Рады видеть!'}
      submitButtonTitle={'Войти'}
      formPurpose='login'
      footerTitle='Ещё не зарегистрированы?'
      footerAction='Регистрация'
      footerLink='/signup'
      errorMsg={errorMsg}
      onAuth={onAuth}
      resetStates={resetStates}
      isLoggedIn={isLoggedIn}
    />
  );
}

export default Login;

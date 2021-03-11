import React from 'react';
import './Login.css';
import Auth from '../Auth/Auth';

function Login({
  resetStates,
  errorMsg,
  onAuth,
  isLoggedIn,
  eraseMessages,
  handleMovieMenuClick,
}) {
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
      eraseMessages={eraseMessages}
      handleMovieMenuClick={handleMovieMenuClick}
      isLoggedIn={isLoggedIn}
    />
  );
}

export default Login;

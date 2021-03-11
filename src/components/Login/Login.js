import React from 'react';
import './Login.css';
import Auth from '../Auth/Auth';

function Login(props) {
  const {
    resetStates,
    errorMsg,
    onAuth,
    isLoggedIn,
    eraseMessages,
    handleMovieMenuClick,
    location,
  } = props;

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
      location={location}
    />
  );
}

export default Login;

import React from 'react';
import './Register.css';
import Auth from '../Auth/Auth';

function Register(props) {
  const {
    resetStates,
    errorMsg,
    onAuth,
    isLoggedIn,
    eraseMessages,
    handleMovieMenuClick,
    location,
  } = props;
  console.log(props);
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
      eraseMessages={eraseMessages}
      handleMovieMenuClick={handleMovieMenuClick}
      isLoggedIn={isLoggedIn}
      location={location}
    />
  );
}

export default Register;

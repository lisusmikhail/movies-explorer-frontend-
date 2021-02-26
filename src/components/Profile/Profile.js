import React from 'react';
import './Profile.css';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';

function Profile({ resetStates, errorMsg, onAuth, onSignOut, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Auth
        title={'Привет, Виталий!'}
        submitButtonTitle={'Редактировать'}
        formPurpose='profile'
        footerTitle='Ещё не зарегистрированы?'
        footerAction='Выйти из аккаунта'
        resetStates={resetStates}
        errorMsg={errorMsg}
        onAuth={onAuth}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}

export default Profile;

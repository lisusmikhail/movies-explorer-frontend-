import React from 'react';
import './Profile.css';
import Auth from '../Auth/Auth';

function Profile({ resetStates, errorMsg, onAuth }) {
  return (
    <Auth
      title={'Привет, Виталий!'}
      submitButtonTitle={'Редактировать'}
      formPurpose='profile'
      footerTitle='Ещё не зарегистрированы?'
      footerAction='Выйти из аккаунта'
      resetStates={resetStates}
      errorMsg={errorMsg}
      onAuth={onAuth}
    />
  );
}

export default Profile;

import React from 'react';
import './Profile.css';
import Auth from '../Auth/Auth';

function Profile() {
  return (
    <Auth
      title={'Привет, Виталий!'}
      submitButtonTitle={'Редактировать'}
      formPurpose='profile'
      footerTitle='Ещё не зарегистрированы?'
      footerAction='Выйти из аккаунта'
    />
  );
}

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import AuthForm from '../AuthForm/AuthForm';
import Header from '../Header/Header';

function Profile() {
  return (
    <section className='auth'>
      <Header />
      <div className='auth__container auth__container_profile'>
        <AuthForm
          title={'Привет, Виталий!'}
          submitButtonTitle={'Редактировать'}
          formPurpose='profile'
        />
        <button
          onClick={() => {
            console.log('Profile');
          }}
          className='auth__footer-button'
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;

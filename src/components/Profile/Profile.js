import React, { useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';

function Profile({
  resetStates,
  errorMsg,
  onAuth,
  onSignOut,
  infoMsg,
  isLoggedIn,
  handleMovieMenuClick,
  eraseMessages,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleMovieMenuClick={handleMovieMenuClick}
      />
      <Auth
        title={`Привет, ${user.name}!`}
        submitButtonTitle={'Редактировать'}
        formPurpose='profile'
        footerTitle='Ещё не зарегистрированы?'
        footerAction='Выйти из аккаунта'
        resetStates={resetStates}
        errorMsg={errorMsg}
        infoMsg={infoMsg}
        onAuth={onAuth}
        onSignOut={onSignOut}
        isLoggedIn={isLoggedIn}
        handleMovieMenuClick={handleMovieMenuClick}
        eraseMessages={eraseMessages}
      />
    </>
  );
}

export default Profile;

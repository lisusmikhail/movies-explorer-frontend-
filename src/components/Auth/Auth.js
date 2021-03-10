import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import AuthForm from '../AuthForm/AuthForm';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';

function Auth(props) {
  const {
    title,
    submitButtonTitle,
    formPurpose,
    footerTitle,
    footerAction,
    footerLink,
    errorMsg,
    onAuth,
    resetStates,
    onSignOut,
    isLoggedIn,
    handleMovieMenuClick,
  } = props;

  return (
    <section className='auth'>
      {formPurpose === 'profile' && (
        <Header
          isLoggedIn={isLoggedIn}
          handleMovieMenuClick={handleMovieMenuClick}
        />
      )}
      <div className={`auth__container auth__container_${formPurpose}`}>
        {formPurpose !== 'profile' && <Logo isHeader={false} />}
        <AuthForm
          title={title}
          submitButtonTitle={submitButtonTitle}
          formPurpose={formPurpose}
          errorMsg={errorMsg}
          onAuth={onAuth}
          resetStates={resetStates}
        />
        {formPurpose !== 'profile' && (
          <p className='auth__footer'>
            {footerTitle}
            <Link to={footerLink} className='auth__footer-link'>
              {footerAction}
            </Link>
          </p>
        )}
        {formPurpose === 'profile' && (
          <button
            type='button'
            className='auth__footer-button'
            onClick={onSignOut}
          >
            {footerAction}
          </button>
        )}
      </div>
    </section>
  );
}

export default Auth;

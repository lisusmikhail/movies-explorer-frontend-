import React from 'react';
// import { Link } from 'react-router-dom';
import './Register.css';
import Auth from '../Auth/Auth';

function Register() {
  return (
    <Auth
      title={'Добро пожаловать!'}
      submitButtonTitle={'Зарегистрироваться'}
      formPurpose='register'
      footerTitle='Уже зарегистрированы?'
      footerAction='Войти'
      footerLink='/signin'
    />
  );
}

export default Register;

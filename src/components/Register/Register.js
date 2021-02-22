import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Logo from '../Logo/Logo';

function Register() {
  return (
    <section className='auth'>
      <div className='auth__container'>
        <Logo isHeader={false} />
        <AuthForm
          title={'Добро пожаловать!'}
          submitButtonTitle={'Зарегистрироваться'}
          formPurpose='register'
        />
        <p className='auth__footer'>
          Уже зарегистрированы?
          <Link to='/signin' className='auth__footer-link'>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

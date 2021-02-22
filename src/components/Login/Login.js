import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import Logo from '../Logo/Logo';

function Login() {
  return (
    <section className='auth'>
      <div className='auth__container'>
        <Logo isHeader={false} />
        <AuthForm
          title={'Рады видеть!'}
          submitButtonTitle={'Войти'}
          isName={false}
          formPurpose='login'
        />
        <p className='auth__footer'>
          Ещё не зарегистрированы?
          <Link to='/signup' className='auth__footer-link'>
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

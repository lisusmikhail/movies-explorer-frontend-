import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './AuthMenu.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function AuthMenu() {
  const user = useContext(CurrentUserContext);
  return (
    <div
      className={
        user._id
          ? 'auth-menu auth-menu_visibility'
          : 'auth-menu auth-menu_position'
      }
    >
      <Link to='/signup' className='auth-menu-item'>
        Регистрация
      </Link>
      <Link to='/signin' className='auth-menu-item auth-menu-item_active'>
        Войти
      </Link>
    </div>
  );
}

export default AuthMenu;

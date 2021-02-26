import React, { useMemo } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation({ isLoggedIn, handleNavClick }) {
  return (
    <nav
      className={
        isLoggedIn
          ? 'navigation navigation_position'
          : 'navigation navigation_hidden'
      }
    >
      <NavLink
        className='navigation__item'
        exact
        to='/'
        onClick={handleNavClick}
      >
        Главная
      </NavLink>
      <NavLink
        to='/movies'
        activeClassName='navigation__item_active'
        className='navigation__item'
        onClick={handleNavClick}
      >
        Фильмы
      </NavLink>
      <NavLink
        to='/saved-movies'
        activeClassName='navigation__item_active'
        className='navigation__item'
        onClick={handleNavClick}
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}

export default Navigation;

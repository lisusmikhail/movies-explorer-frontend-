import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation({ isRoot, handleNavClick }) {
  return (
    <nav
      className={
        isRoot
          ? 'navigation navigation_hidden'
          : 'navigation navigation_position'
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

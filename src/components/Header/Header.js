import React from 'react';
import { useHistory, NavLink, Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../components/Logo/Logo';

function Header() {
  const history = useHistory();
  const location = history.location.pathname;

  // Этот код исполняется в демонстрационных целях и
  // не будет присутствовать в окончательном варианте приложения
  let isMenuClicked = false;
  const handleMenuClick = () => {
    const hamburgerMenuElement = document.querySelector('.header__hamburger');
    const sliderElement = document.querySelector('.header__navigation');
    if (!isMenuClicked) {
      hamburgerMenuElement.classList.add('header__hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-out');
      sliderElement.classList.add('header__navigation_fade-in');
      isMenuClicked = true;
    } else {
      hamburgerMenuElement.classList.remove('header__hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-in');
      sliderElement.classList.add('header__navigation_fade-out');
      isMenuClicked = false;
    }
  };

  return (
    <div className={location === '/' ? 'header header_main' : 'header'}>
      <div className='header__container'>
        <Logo isHeader={true} />
        <div className='header__navigation'>
          <nav
            className={
              location === '/'
                ? 'header__content header__content_hidden'
                : 'header__content'
            }
          >
            <NavLink
              className='header__content-item'
              exact
              to='/'
              onClick={() => {
                isMenuClicked = true;
                handleMenuClick();
              }}
            >
              Главная
            </NavLink>
            <NavLink
              to='/movies'
              activeClassName='header__content-item_active'
              className='header__content-item'
              onClick={() => {
                isMenuClicked = true;
                handleMenuClick();
              }}
            >
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              activeClassName='header__content-item_active'
              className='header__content-item'
              onClick={() => {
                isMenuClicked = true;
                handleMenuClick();
              }}
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <div
            className={
              location === '/'
                ? 'header__profile header__profile_hidden'
                : 'header__profile'
            }
          >
            <p className='header__account-title'>Аккаунт</p>
            <button className='header__account-button header__account-icon' />
          </div>
        </div>
        <div
          className={
            location === '/'
              ? 'header__auth'
              : 'header__auth header__auth_hidden'
          }
        >
          <Link to='/signup' className='header__auth-item'>
            Регистрация
          </Link>
          <Link
            to='/signin'
            className='header__auth-item header__auth-item_active'
          >
            Войти
          </Link>
        </div>
        <button
          className={
            location === '/'
              ? 'header__hamburger header__hamburger_hidden'
              : 'header__hamburger'
          }
          onClick={handleMenuClick}
        />
      </div>
    </div>
  );
}

export default Header;

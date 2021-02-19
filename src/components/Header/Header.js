import React from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from '../../components/Logo/Logo';

function Header() {
  const history = useHistory();
  const location = history.location.pathname;

  // Этот код исполняется в демонстрационных целях и
  // не будет присутствовать в окончательном варианте приложения
  let isMenuClicked = 0;
  const handleMenuClick = () => {
    const hamburgerMenuElement = document.querySelector('.header__hamburger');
    const sliderElement = document.querySelector('.header__navigation');
    if (isMenuClicked === 0) {
      hamburgerMenuElement.classList.add('header__hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-out');
      sliderElement.classList.add('header__navigation_fade-in');
      isMenuClicked = 1;
    } else {
      hamburgerMenuElement.classList.remove('header__hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-in');
      sliderElement.classList.add('header__navigation_fade-out');
      isMenuClicked = 0;
    }
  };

  return (
    <div className={location === '/' ? 'header header_main' : 'header'}>
      <div className='header__container'>
        <Logo />
        <nav className='header__navigation'>
          <ul
            className={
              location === '/'
                ? 'header__content header__content_hidden'
                : 'header__content'
            }
          >
            <li className='header__content-item'>Главная</li>
            <li className='header__content-item header__content-item_active'>
              Фильмы
            </li>
            <li className='header__content-item'>Сохранённые фильмы</li>
          </ul>

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
        </nav>
        <div
          className={
            location === '/'
              ? 'header__auth'
              : 'header__auth header__auth_hidden'
          }
        >
          <button className='header__auth-item'>Регистрация</button>
          <button className='header__auth-item header__auth-item_active'>
            Войти
          </button>
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

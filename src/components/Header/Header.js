import React from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from '../../components/Logo/Logo';
import AuthMenu from '../AuthMenu/AuthMenu';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Navigation from '../Navigation/Navigation';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function Header() {
  // Данный JS код используется для демонстрации верстки
  // и не будет присутствовать в окончательном варианте проекта
  const history = useHistory();
  const location = history.location.pathname;
  let isRoot = false;
  let isMenuClicked = false;

  isRoot = location === '/';

  const handleMenuClick = () => {
    const hamburgerMenuElement = document.querySelector('.hamburger');
    const sliderElement = document.querySelector('.header__navigation');
    if (!isMenuClicked) {
      hamburgerMenuElement.classList.add('hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-out');
      sliderElement.classList.add('header__navigation_fade-in');
      isMenuClicked = true;
    } else {
      hamburgerMenuElement.classList.remove('hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-in');
      sliderElement.classList.add('header__navigation_fade-out');
      isMenuClicked = false;
    }
  };

  const handleNavClick = () => {
    isMenuClicked = true;
    handleMenuClick();
  };

  return (
    <div className={isRoot ? 'header header_main' : 'header'}>
      <div className='header__container'>
        <Logo isHeader={true} />
        <div className='header__navigation'>
          <Navigation isRoot={isRoot} handleNavClick={handleNavClick} />
          <ProfileMenu isRoot={isRoot} handleNavClick={handleNavClick} />
        </div>
        <AuthMenu isRoot={isRoot} />
        <HamburgerMenu isRoot={isRoot} handleMenuClick={handleMenuClick} />
      </div>
    </div>
  );
}

export default Header;

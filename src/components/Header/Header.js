import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from '../../components/Logo/Logo';
import AuthMenu from '../AuthMenu/AuthMenu';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Navigation from '../Navigation/Navigation';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function Header({ isLoggedIn }) {
  const history = useHistory();
  const location = history.location.pathname;
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // let isMenuClicked = false;
  const handleMenuClick = () => {
    const hamburgerMenuElement = document.querySelector('.hamburger');
    const sliderElement = document.querySelector('.header__navigation');
    if (!isMenuClicked) {
      hamburgerMenuElement.classList.add('hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-out');
      sliderElement.classList.add('header__navigation_fade-in');
      setIsMenuClicked(true);
    } else {
      hamburgerMenuElement.classList.remove('hamburger_open');
      sliderElement.classList.remove('header__navigation_fade-in');
      sliderElement.classList.add('header__navigation_fade-out');
      setIsMenuClicked(false);
    }
  };

  const handleNavClick = () => {
    setIsMenuClicked(true);
    handleMenuClick();
  };

  return (
    <div className={location === '/' ? 'header header_main' : 'header'}>
      <div className='header__container'>
        <Logo isHeader={true} />
        <div className='header__navigation'>
          <Navigation isLoggedIn={isLoggedIn} handleNavClick={handleNavClick} />
          <ProfileMenu
            isLoggedIn={isLoggedIn}
            handleNavClick={handleNavClick}
          />
        </div>
        <AuthMenu isLoggedIn={isLoggedIn} />
        <HamburgerMenu
          isLoggedIn={isLoggedIn}
          handleMenuClick={handleMenuClick}
        />
      </div>
    </div>
  );
}

export default Header;

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from '../../components/Logo/Logo';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AuthMenu from '../AuthMenu/AuthMenu';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Navigation from '../Navigation/Navigation';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function Header() {
  const user = useContext(CurrentUserContext);
  const history = useHistory();
  const location = history.location.pathname;
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    if (location === '/') {
      setIsRoot(true);
    }
  }, []);

  let isMenuClicked = false;
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
          <Navigation handleNavClick={handleNavClick} />
          <ProfileMenu handleNavClick={handleNavClick} />
        </div>
        <AuthMenu />
        <HamburgerMenu handleMenuClick={handleMenuClick} />
      </div>
    </div>
  );
}

export default Header;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from '../../components/Logo/Logo';
import AuthMenu from '../AuthMenu/AuthMenu';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Navigation from '../Navigation/Navigation';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function Header(props) {
  const { isLoggedIn, handleMovieMenuClick } = props;
  const history = useHistory();
  const location = history.location.pathname;
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    if (!isMenuClicked) {
      setIsMenuClicked(true);
      setIsMenuOpen(true);
    } else {
      setIsMenuClicked(false);
      setIsMenuOpen(false);
    }
  }

  function handleNavClick() {
    setIsMenuClicked(true);
    setIsMenuOpen(true);
    handleMenuClick();
    handleMovieMenuClick();
  }

  return (
    <div className={location === '/' ? 'header header_main' : 'header'}>
      <div className='header__container'>
        <Logo isHeader={true} handleMovieMenuClick={handleMovieMenuClick} />
        <div
          className={
            isMenuClicked
              ? 'header__navigation header__navigation_fade-in'
              : 'header__navigation header__navigation_fade-out'
          }
        >
          <Navigation isLoggedIn={isLoggedIn} handleNavClick={handleNavClick} />
          <ProfileMenu
            isLoggedIn={isLoggedIn}
            handleNavClick={handleNavClick}
          />
        </div>
        <AuthMenu isLoggedIn={isLoggedIn} />
        <HamburgerMenu
          isMenuOpen={isMenuOpen}
          isLoggedIn={isLoggedIn}
          handleMenuClick={handleMenuClick}
        />
      </div>
    </div>
  );
}

export default Header;

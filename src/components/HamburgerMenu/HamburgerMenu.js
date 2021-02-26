import React from 'react';
import './HamburgerMenu.css';

function HamburgerMenu({ isLoggedIn, handleMenuClick, isMenuOpen }) {
  return (
    <button
      className={
        !isLoggedIn
          ? 'hamburger hamburger_hidden'
          : isMenuOpen
          ? 'hamburger hamburger_position hamburger_open'
          : 'hamburger hamburger_position'
      }
      onClick={handleMenuClick}
    />
  );
}

export default HamburgerMenu;

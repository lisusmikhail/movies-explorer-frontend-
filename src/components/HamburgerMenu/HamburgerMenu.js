import React from 'react';
import './HamburgerMenu.css';

function HamburgerMenu({ isLoggedIn, handleMenuClick }) {
  return (
    <button
      className={
        isLoggedIn
          ? 'hamburger hamburger_position'
          : 'hamburger hamburger_hidden'
      }
      onClick={handleMenuClick}
    />
  );
}

export default HamburgerMenu;

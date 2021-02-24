import React from 'react';
import './HamburgerMenu.css';

function HamburgerMenu({ isRoot, handleMenuClick }) {
  return (
    <button
      className={
        isRoot ? 'hamburger hamburger_hidden' : 'hamburger hamburger_position'
      }
      onClick={handleMenuClick}
    />
  );
}

export default HamburgerMenu;

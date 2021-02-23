import React from 'react';
import './HamburgerMenu.css';

function HamburgerMenu({ isRoot, handleMenuClick }) {
  return (
    <button
      className={isRoot ? 'hamburger hamburger_hidden' : 'hamburger'}
      onClick={handleMenuClick}
    />
  );
}

export default HamburgerMenu;

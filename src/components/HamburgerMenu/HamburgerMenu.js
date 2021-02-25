import React, { useContext } from 'react';
import './HamburgerMenu.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function HamburgerMenu({ handleMenuClick }) {
  const user = useContext(CurrentUserContext);
  return (
    <button
      className={
        user._id ? 'hamburger hamburger_position' : 'hamburger hamburger_hidden'
      }
      onClick={handleMenuClick}
    />
  );
}

export default HamburgerMenu;
